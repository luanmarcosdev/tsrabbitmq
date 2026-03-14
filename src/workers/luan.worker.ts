import { connectRabbitMQ } from "../infra/message-broker/rabbitmq";
import { consumeMessages } from "../infra/message-broker/consumer";

async function startWorker() {
    await connectRabbitMQ(); 

    consumeMessages('luan', (msg) => {
        console.log(`Mensagem recebida no luan.worker`)
        console.log(`Mensagem Recebida: ${msg}`);
        console.log(`Processando mensagem..`)
    });
}

startWorker();