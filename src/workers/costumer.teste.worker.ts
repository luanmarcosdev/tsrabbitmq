import { connectRabbitMQ } from '../infra/message-broker/rabbitmq';
import { consumeFromExchange } from '../infra/message-broker/exchange-consumer';

async function startWorker() {
    await connectRabbitMQ();

    consumeFromExchange(
        'events',                           // nome da exchange
        'costumer',                         // routing key que esse worker escuta
        'new-costumer',                     // nome da fila
        (msg) => {
            const data = JSON.parse(msg);
            console.log(`[events.costumer] Novo cliente: ${data.name}`);
        }
    );
}

startWorker();