export const SQL = [
  'CREATE TABLE IF NOT EXISTS users(id INT, username VARCHAR(64), tel_no VARCHAR(11), email VARCHAR(64), avatar VARCHAR(64), address VARCHAR(255))',
  'INSERT INTO users(id,username,tel_no,email,avatar,address) values(1,"张三","12345678910","12345678910@163.com","https://api.dicebear.com/7.x/miniavs/svg?seed=8","中国北京");',
];
