import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const SmtpConfigModal = ({ open, onClose, onConfigSuccess }) => {
  const [config, setConfig] = useState({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    user: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Primeiro, salva a configuração
      await axios.post('http://localhost:5000/api/smtp/config', config);

      // Envia email de teste
      await axios.post('http://localhost:5000/api/send-email', {
        to: 'lucasmvlog3@gmail.com',
        subject: 'Teste de Configuração SMTP',
        text: 'Este é um email de teste para validar a configuração SMTP.',
        html: '<p>Este é um email de teste para validar a configuração SMTP.</p>'
      });

      setSuccess('Configuração SMTP salva e email de teste enviado com sucesso!');
      setTimeout(() => {
        onConfigSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao configurar SMTP ou enviar email de teste');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configuração SMTP</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Host SMTP"
              name="host"
              value={config.host}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Porta"
              name="port"
              type="number"
              value={config.port}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="user"
              type="email"
              value={config.user}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              value={config.password}
              onChange={handleChange}
              required
              fullWidth
              helperText="Para Gmail, use uma senha de app em vez da senha normal da conta"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar e Testar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SmtpConfigModal; 