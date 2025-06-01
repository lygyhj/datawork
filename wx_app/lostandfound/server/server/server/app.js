// server/app.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');

// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();
const port = process.env.PORT || 3000;

// 配置文件上传目录
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 中间件
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件服务

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
pool.getConnection()
  .then(connection => {
    console.log('数据库连接成功');
    connection.release();
  })
  .catch(err => {
    console.error('数据库连接失败:', err);
  });

// 路由
app.get('/api/ping', (req, res) => {
  res.send('服务器正常运行');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 用户路由
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// 失物招领信息路由（需要认证）
const messageRoutes = require('./routes/message');
app.use('/api/messages', verifyToken, messageRoutes);

// 文件上传路由
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// 评论路由
const commentRoutes = require('./routes/comment');
app.use('/api/comments', verifyToken, commentRoutes);

// 分类路由
const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);

// 错误处理中间件
app.use(errorHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

// 导出数据库连接池供其他模块使用
module.exports = { pool };