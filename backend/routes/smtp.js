const express = require('express');
const router = express.Router();
const SmtpConfig = require('../models/SmtpConfig');

// Obter configuração SMTP atual
router.get('/config', async (req, res) => {
    try {
        const config = await SmtpConfig.getConfig();
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter configuração SMTP' });
    }
});

// Salvar nova configuração SMTP
router.post('/config', async (req, res) => {
    try {
        const config = req.body;
        const id = await SmtpConfig.saveConfig(config);
        res.json({ id, message: 'Configuração SMTP salva com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar configuração SMTP' });
    }
});

// Atualizar configuração SMTP existente
router.put('/config/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const config = req.body;
        await SmtpConfig.updateConfig(id, config);
        res.json({ message: 'Configuração SMTP atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar configuração SMTP' });
    }
});

module.exports = router; 