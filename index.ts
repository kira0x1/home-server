import { type Socket, type TCPSocketListenOptions } from "bun";
import { randomUUID } from "crypto";

console.log(`Restarted at: `, Date.now());

console.log(`Host: ${Bun.env.HOST}`);

const config: TCPSocketListenOptions<SocketType> = {
  hostname: Bun.env.HOST as string,
  port: Number(Bun.env.PORT),
  socket: {
    data: onData, // Data recieved from client
    open: onSocketOpen, // Socket Opened
    close: onSocketClose, // Socket Closed
    error: onSocketError, // Socket Error
  },
};

type SocketType = {
  sessionId?: string;
};

async function onData(socket: Socket<SocketType>, data: Buffer) {
  console.log(`Socket Data`);
  socket.write(`${socket.data?.sessionId}: ack`);
}

async function onSocketOpen(socket: Socket<SocketType>) {
  console.log(`Socket Open`);
  const id = randomUUID();
  console.log(`created id: ${id}`);
  socket.data = { sessionId: id };
}

async function onSocketClose(socket: Socket<SocketType>) {
  console.log(`On Socket Close`);
}

async function onSocketError(socket: Socket<SocketType>, error: Error) {
  console.log(`On Socket Error`);
  console.error(error);
}

Bun.listen<SocketType>(config);
