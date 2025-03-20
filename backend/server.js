require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const http = require('http');
const socketIo = require('socket.io');
const SmtpConfig = require('./models/SmtpConfig');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Importar rotas
const smtpRoutes = require('./routes/smtp');
const emailRoutes = require('./routes/email');

// Usar rotas
app.use('/api/smtp', smtpRoutes);
app.use('/api/email', emailRoutes);

// Função para criar o transporter com as configurações SMTP
const createTransporter = async () => {
  const config = await SmtpConfig.getConfig();
  if (!config) {
    throw new Error('Configuração SMTP não encontrada');
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password
    }
  });
};

// Rota para enviar email
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email: ' + error.message });
  }
});

// Configuração do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });

  // Evento para notificar sobre novos emails
  socket.on('new-email', (data) => {
    io.emit('email-received', data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 