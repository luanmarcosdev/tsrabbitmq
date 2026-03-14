import { Request, Response, NextFunction } from 'express';
import { sendMessage } from '../infra/message-broker/producer';
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
}