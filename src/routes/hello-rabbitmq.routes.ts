import express from 'express';
import { RabbitMQController } from '../controllers/rabbitmq.controller';

const router = express.Router();
const controller = new RabbitMQController();

router.post('/rabbitmq/hello', controller.hello.bind(controller));

export default router;