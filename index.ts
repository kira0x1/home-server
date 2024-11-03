import { randomUUIDv7, type Socket, type TCPSocketListenOptions } from "bun";

console.log(`Restarted at: `, Date.now());

const config: TCPSocketListenOptions = {
  hostname: Bun.env.HOST as string,
  port: Number(Bun.env.PORT),
  socket: {
    data: (socket: any, data) => onData(socket, data), // Data recieved from client
    open: (socket: any) => onSocketOpen(socket), // Socket Opened
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
  socket.data = { sessionId: randomUUIDv7() };
}

async function onSocketClose(socket: Socket<undefined>) {
  console.log(`On Socket Close`);
}

async function onSocketError(socket: Socket<undefined>, error: Error) {
  console.log(`On Socket Error`);
  console.error(error);
}

Bun.listen(config);
