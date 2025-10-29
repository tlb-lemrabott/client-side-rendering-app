import { createServer } from 'http';
import app from './src/app.js';
import { log } from './src/logger/index.js';

const PORT = process.env.PORT || 3000;

const server = createServer(app);

server.listen(PORT, () => {
  log.info('Server started', { url: `http://localhost:${PORT}` });
});

process.on('SIGINT', () => {
  log.info('Server stopping (SIGINT)');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  log.info('Server stopping (SIGTERM)');
  server.close(() => process.exit(0));
});
