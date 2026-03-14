import { getChannel } from './rabbitmq';

export const sendMessage = (queue: string, msg: string) => {
    // obtem o canal do RabbitMQ para enviar a mensagem
    const channel = getChannel();
    // garante que a fila existe antes de enviar a mensagem
    channel.assertQueue(queue, { durable: true });
    // envia a mensagem para a fila especificada, convertendo a string em um buffer (bytes)
    channel.sendToQueue(queue, Buffer.from(msg), { persistent : true });
    console.log(`[INFO]: Sent message: ${msg}`);
};