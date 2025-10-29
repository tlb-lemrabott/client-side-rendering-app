import { log } from '../logger/index.js';

function genReqId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function requestLogger(req, res, next) {
  const reqId = genReqId();
  const start = process.hrtime.bigint();
  const receivedAt = new Date();

  req.id = reqId;
  const userAgent = req.headers['user-agent'] || null;
  const referer = req.headers['referer'] || req.headers['referrer'] || null;
  const ip = (req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.connection?.remoteAddress || null);

  log.info('Request received', {
    reqId,
    method: req.method,
    path: req.originalUrl || req.url,
    receivedAt: receivedAt.toISOString(),
    userAgent,
    referer,
    ip,
  });

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;
    const respondedAt = new Date();
    log.info('Response sent', {
      reqId,
      method: req.method,
      path: req.originalUrl || req.url,
      status: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      respondedAt: respondedAt.toISOString(),
      userAgent,
      referer,
      ip,
    });
  });

  next();
}
