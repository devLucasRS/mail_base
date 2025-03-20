const db = require('../config/database');

class EmailThread {
    static async getAllThreads() {
        const [rows] = await db.query(`
            SELECT t.*, 
                   COUNT(m.id) as message_count,
                   MAX(m.created_at) as last_message_at
            FROM email_threads t
            LEFT JOIN email_messages m ON t.id = m.thread_id
            GROUP BY t.id
            ORDER BY last_message_at DESC
        `);
        return rows;
    }

    static async getThreadById(threadId) {
        const [thread] = await db.query('SELECT * FROM email_threads WHERE id = ?', [threadId]);
        if (!thread[0]) return null;

        const [messages] = await db.query(
            'SELECT * FROM email_messages WHERE thread_id = ? ORDER BY created_at ASC',
            [threadId]
        );

        return {
            ...thread[0],
            messages
        };
    }

    static async createThread(subject) {
        const [result] = await db.query(
            'INSERT INTO email_threads (subject) VALUES (?)',
            [subject]
        );
        return result.insertId;
    }

    static async addMessage(threadId, messageData) {
        const {
            message_id,
            from_email,
            to_email,
            subject,
            content,
            is_sent = false,
            sent_at = null,
            received_at = null
        } = messageData;

        const [result] = await db.query(
            `INSERT INTO email_messages 
            (thread_id, message_id, from_email, to_email, subject, content, is_sent, sent_at, received_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [thread_id, message_id, from_email, to_email, subject, content, is_sent, sent_at, received_at]
        );

        await db.query(
            'UPDATE email_threads SET last_message_at = NOW() WHERE id = ?',
            [thread_id]
        );

        return result.insertId;
    }

    static async markAsRead(messageId) {
        await db.query(
            'UPDATE email_messages SET is_read = true WHERE id = ?',
            [messageId]
        );
    }
}

module.exports = EmailThread; 