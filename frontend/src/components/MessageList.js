import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography, Avatar, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
        {messages.map((message) => {
          const isCurrentUser = message.from_email === currentUser;
          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  maxWidth: '70%',
                }}
              >
                <Avatar sx={{ mx: 1 }}>
                  {isCurrentUser ? <SendIcon /> : <EmailIcon />}
                </Avatar>
                <Box
                  sx={{
                    backgroundColor: isCurrentUser ? 'primary.main' : 'grey.100',
                    color: isCurrentUser ? 'white' : 'text.primary',
                    borderRadius: 2,
                    p: 2,
                    position: 'relative',
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 1,
                      color: isCurrentUser ? 'white' : 'text.secondary',
                    }}
                  >
                    {new Date(message.created_at).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Paper>
    </Box>
  );
};

export default MessageList; 