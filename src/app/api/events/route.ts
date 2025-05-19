import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    start(controller) {
      // This 'start' function runs when the client connects
      let counter = 0;
      const intervalId = setInterval(() => {
        counter++;
        // The data is encoded and enqueued into the stream.
        // The connection remains open as long as controller.close() is not called.
        const message = `data: ServerSideEvent: - Counter: ${counter}\n\n`;
        controller.enqueue(encoder.encode(message));
      }, 3000);

      // ✅ Encerrar automaticamente após 30 segundos
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        controller.enqueue(encoder.encode('event: close\ndata: Encerrado pelo servidor após 30s\n\n'));
        controller.close();
        console.log('Encerrado após 30s');
      }, 30000);

      // This listener ensures cleanup when the client disconnects,
      // preventing the interval from running indefinitely on the server.
      req.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        controller.close(); // This closes the stream and the connection gracefully
        console.log("Client disconnected");
      });
    },
    cancel() {
      // This is called if the stream is cancelled for other reasons
      console.log("Stream cancelled");
    },
  });

  // Returning the NextResponse with the stream keeps the connection open
  // and pipes the stream data to the client.
  return new NextResponse(readableStream, { headers });
}