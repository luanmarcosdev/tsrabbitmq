import { connectRabbitMQ } from '../infra/message-broker/rabbitmq';
import { consumeFromExchange } from '../infra/message-broker/exchange-consumer';

async function startWorker() {
    await connectRabbitMQ();

    consumeFromExchange(
        'events',                           // nome da exchange
        'order',                            // routing key que esse worker escuta
        'order-confirmation-whatsapp',      // nome da fila
        (msg) => {
            const data = JSON.parse(msg);
            console.log(`[events.order] Enviando whatsapp para: ${data.phone}`);
        }
    );
}

startWorker();