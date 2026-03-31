const mc = require('minecraft-protocol');
const http = require('http');

http.createServer((req, res) => {
  res.end('Bot running');
}).listen(process.env.PORT || 8080);

let delay = 5000;

function createBot() {
  const client = mc.createClient({
    host: 'aechat.aternos.me',
    port: 37480,
    username: 'Technoblade',
    version: false,
    auth: 'offline'
  });

  client.on('login', () => {
    console.log('✅ Đã vào server');

    // đăng ký + login nhanh (QUAN TRỌNG)
    setTimeout(() => {
      client.write('chat', { message: '/register 123456 123456' });
    }, 500);

    setTimeout(() => {
      client.write('chat', { message: '/login 123456' });
    }, 1500);
  });

  client.on('kicked', (reason) => {
    console.log('🚫 Bị kick:', reason);
    reconnect();
  });

  client.on('error', (err) => {
    console.log('❌ Lỗi:', err.message);
    reconnect();
  });

  client.on('end', () => {
    console.log('🔌 Mất kết nối');
    reconnect();
  });
}

function reconnect() {
