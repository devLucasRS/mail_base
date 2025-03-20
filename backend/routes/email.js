const express = require('express');
const router = express.Router();
const EmailThread = require('../models/EmailThread');

// Listar todas as threads
router.get('/threads', async (req, res) => {
    try {
        const threads = await EmailThread.getAllThreads();
        res.json(threads);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter threads de email' });
    }
});

// Obter thread específica com suas mensagens
router.get('/threads/:id', async (req, res) => {
    try {
        const thread = await EmailThread.getThreadById(req.params.id);
        if (!thread) {
            return res.status(404).json({ error: 'Thread não encontrada' });
        }
        res.json(thread);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter thread de email' });
    }
});

// Criar nova thread
router.post('/threads', async (req, res) => {
    try {
        const { subject } = req.body;
        const threadId = await EmailThread.createThread(subject);
        res.json({ id: threadId, message: 'Thread criada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar thread de email' });
    }
});

// Adicionar mensagem a uma thread
router.post('/threads/:id/messages', async (req, res) => {
    try {
        const threadId = req.params.id;
        const messageId = await EmailThread.addMessage(threadId, req.body);
        res.json({ id: messageId, message: 'Mensagem adicionada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar mensagem' });
    }
});

// Marcar mensagem como lida
router.put('/messages/:id/read', async (req, res) => {
    try {
        await EmailThread.markAsRead(req.params.id);
        res.json({ message: 'Mensagem marcada como lida' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao marcar mensagem como lida' });
    }
});

module.exports = router; 