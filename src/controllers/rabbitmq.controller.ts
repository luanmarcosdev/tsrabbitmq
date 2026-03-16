import { Request, Response, NextFunction } from 'express';
import { sendMessage } from '../infra/message-broker/producer';
import { publishToExchange } from '../infra/message-broker/exchange-producer';
import { BadRequestError } from '../errors/bad-request.error';

export class RabbitMQController {

    async hello(req: Request, res: Response, next: NextFunction) {
        try {
            const { queue, message } = req.body;

            if (!queue || !message) {
                throw new BadRequestError({ message: "Os campos 'queue' e 'message' sao obrigatorios" });
            }

            sendMessage(queue, message);

            res.status(200).json({
                status: 200,
                message: "Message enviada para a fila",
                data: {
                    queue: queue,
                    message: message
                }
            });

        } catch (error) {
            next(error);
        }
    }

        async publishExchangeMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { message, exchange, routingKey } = req.body;

            if ( !message || !exchange || !routingKey) {
                throw new BadRequestError({ message: "Os campos 'message', 'routingKey' e 'exchange' sao obrigatorios" });
            }

            publishToExchange(exchange, routingKey, message);

            res.status(200).json({
                status: 200,
                message: "Message publicada na exchange",
                data: {
                    exchange: exchange,
                    routingKey: routingKey,
                    message: message
                }
            });

        } catch (error) {
            next(error);
        }
    }
}