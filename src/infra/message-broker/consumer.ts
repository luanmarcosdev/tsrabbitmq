import { getChannel } from './rabbitmq';

export const consumeMessages = async (queue: string, handler: (msg: string) => void) => {
    const channel = getChannel();
    // Garante que a fila existe antes de consumir as mensagen
    // define true para durabilidade (fila persiste quando o RabbitMQ for reiniciado)
    await channel.assertQueue(queue, { durable: true });

    console.log(`[*] Waiting for messages in ${queue}`);

    // fica ouvindo a fila e processando as mensagens recebidas
    await channel.consume(queue, (msg) => {
        if (msg) {
            // mensagem recebida, processa usando o handler fornecido 
            // (converte os bytes de volta para string)
            handler(msg.content.toString());
            // avisa o RabbitMQ que a mensagem foi processada e pode ser removida da fila
            channel.ack(msg);
        }
    }, { noAck: false });
};