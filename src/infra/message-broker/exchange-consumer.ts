import { getChannel } from './rabbitmq';

export const consumeFromExchange = async (
    exchange: string,
    routingKey: string,
    queue: string,
    handler: (msg: string) => void
) => {
    const channel = getChannel();

    // Declara a exchange (idempotente — não cria duplicata se já existir)
    await channel.assertExchange(exchange, 'direct', { durable: true });

    // Declara a fila normalmente
    await channel.assertQueue(queue, { durable: true });

    // O binding é o "elo" fila <-> exchange com a routing key
    // Só mensagens com routingKey iguais chegam nessa fila
    await channel.bindQueue(queue, exchange, routingKey);

    console.log(`[*] Waiting on exchange "${exchange}" | key "${routingKey}" | queue "${queue}"`);

    await channel.consume(queue, async (msg) => {
        if (msg) {
            try {
                await handler(msg.content.toString());
                channel.ack(msg);
            } catch (err) {
                // channel.nack(msg, allUpTo, requeue);
                // msg - mensagem a ser rejeitada
                // allUpTo - true rejeita todas as mensagens ate essa / false rejeita so essa
                // requeue - true volta para a fila / false descarta ou manda para DLQ
                channel.nack(msg, false, true);
            }
        }
    }, { noAck: false });
};