import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import EmailList from './EmailList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SmtpConfigModal from './SmtpConfigModal';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatInterface = ({ currentUser }) => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSmtpConfig, setShowSmtpConfig] = useState(false);
  const [smtpConfigured, setSmtpConfigured] = useState(false);

  useEffect(() => {
    checkSmtpConfig();
    fetchThreads();

    socket.on('email-received', (data) => {
      if (selectedThread && data.thread_id === selectedThread.id) {
        setMessages(prev => [...prev, data]);
      }
      fetchThreads();
    });

    return () => {
      socket.off('email-received');
    };
  }, [selectedThread]);

  const checkSmtpConfig = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/smtp/config');
      setSmtpConfigured(!!response.data);
      if (!response.data) {
        setShowSmtpConfig(true);
      }
    } catch (error) {
      setSmtpConfigured(false);
      setShowSmtpConfig(true);
    }
  };

  const fetchThreads = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/email/threads');
      setThreads(response.data);
    } catch (error) {
      console.error('Erro ao buscar threads:', error);
    }
  };

  const handleThreadSelect = async (threadId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/email/threads/${threadId}`);
      setSelectedThread(response.data);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
    setLoading(false);
  };

  const handleSendMessage = async (content) => {
    if (!selectedThread || !smtpConfigured) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/email/threads/${selectedThread.id}/messages`, {
        message_id: Date.now().toString(),
        from_email: currentUser,
        to_email: selectedThread.messages[0].from_email === currentUser 
          ? selectedThread.messages[0].to_email 
          : selectedThread.messages[0].from_email,
        subject: selectedThread.subject,
        content,
        is_sent: true,
        sent_at: new Date()
      });

      const newMessage = {
        id: response.data.id,
        content,
        from_email: currentUser,
        created_at: new Date(),
        is_sent: true
      };

      setMessages(prev => [...prev, newMessage]);
      fetchThreads();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleSmtpConfigSuccess = () => {
    setSmtpConfigured(true);
  };

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <EmailList
            threads={threads}
            onThreadSelect={handleThreadSelect}
            selectedThreadId={selectedThread?.id}
          />
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {selectedThread ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedThread.subject}
              </Typography>
              <MessageList
                messages={messages}
                currentUser={currentUser}
              />
              <MessageInput
                onSend={handleSendMessage}
                disabled={loading || !smtpConfigured}
              />
              {!smtpConfigured && (
                <Typography color="error" sx={{ mt: 1 }}>
                  Configure o SMTP para enviar mensagens
                </Typography>
              )}
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" color="text.secondary">
                Selecione uma conversa para começar
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <SmtpConfigModal
        open={showSmtpConfig}
        onClose={() => setShowSmtpConfig(false)}
        onConfigSuccess={handleSmtpConfigSuccess}
      />
    </Box>
  );
};

export default ChatInterface; 