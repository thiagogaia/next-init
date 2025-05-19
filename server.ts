import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
 
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    if (parsedUrl.pathname === '/api/sse') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });
      
      const intervalId = setInterval(() => {
        const data = JSON.stringify({ message: 'Hello from server', timestamp: new Date() });
        res.write(`data: ${data}\n\n`);
      }, 3000);

      res.on('close', () => {
        clearInterval(intervalId);
      });
    } else {
      handle(req, res, parsedUrl)
    }
    
  }).listen(port, (err?: Error) => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log('> Ready on http://localhost:3000')
  });

  // Clean up on server shutdown
  process.on('SIGTERM', () => {
    process.exit(0);
  })
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
});