const express = require('express');
const router = express.Router();
const pool = require('../app').pool;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

// 用户注册/登录
router.post('/', async (req, res) => {
  try {
    const { wxNickname, avatarUrl, gender, province, city } = req.body;
    
    // 检查用户是否已存在
    const [users] = await pool.execute(
      'SELECT user_id FROM lf_user WHERE user_name = ?', 
      [wxNickname]
    );
    
    let userId;
    if (users.length > 0) {
      userId = users[0].user_id;
    } else {
      // 创建新用户
      const [result] = await pool.execute(
        'INSERT INTO lf_user (user_name, user_photo, user_gender, user_province, user_city) VALUES (?, ?, ?, ?, ?)',
        [wxNickname, avatarUrl, gender, province, city]
      );
      userId = result.insertId;
    }
    
    // 生成 JWT token
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
    
    res.json({ success: true, userId, token });
  } catch (error) {
    console.error('用户注册/登录失败:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

module.exports = router;