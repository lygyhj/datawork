const express = require('express');
const router = express.Router();
const pool = require('../app').pool;

// 获取所有失物信息
router.get('/', async (req, res) => {
  try {
    const [messages] = await pool.execute(
      `SELECT m.*, u.user_name, u.user_photo, c.category_name 
       FROM lf_message m 
       JOIN lf_user u ON m.message_userId = u.user_id
       JOIN lf_category c ON m.message_categotyId = c.category_id`
    );
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('获取失物信息失败:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// 添加新失物信息
router.post('/', async (req, res) => {
  try {
    const { message_description, message_categotyId, message_photo, userId } = req.body;
    const message_date = new Date().toISOString().split('T')[0];
    
    const [result] = await pool.execute(
      'INSERT INTO lf_message (message_description, message_userId, message_categotyId, message_date, message_photo) VALUES (?, ?, ?, ?, ?)',
      [message_description, userId, message_categotyId, message_date, message_photo]
    );
    
    res.json({ success: true, messageId: result.insertId });
  } catch (error) {
    console.error('添加失物信息失败:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

module.exports = router;