const mysql = require('mysql2/promise');
const db = require('../config/database');

class SmtpConfig {
    static async getConfig() {
        const [rows] = await db.query('SELECT * FROM smtp_configurations ORDER BY id DESC LIMIT 1');
        return rows[0];
    }

    static async saveConfig(config) {
        const { host, port, secure, user, password } = config;
        const [result] = await db.query(
            'INSERT INTO smtp_configurations (host, port, secure, user, password) VALUES (?, ?, ?, ?, ?)',
            [host, port, secure, user, password]
        );
        return result.insertId;
    }

    static async updateConfig(id, config) {
        const { host, port, secure, user, password } = config;
        await db.query(
            'UPDATE smtp_configurations SET host = ?, port = ?, secure = ?, user = ?, password = ? WHERE id = ?',
            [host, port, secure, user, password, id]
        );
    }
}

module.exports = SmtpConfig; 