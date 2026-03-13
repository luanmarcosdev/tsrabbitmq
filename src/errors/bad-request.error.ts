import { ValidationError } from "class-validator";
import { ErrorBase } from "./error-base.error";

export class BadRequestError extends ErrorBase {
    constructor({ message, status = 400, errors}: { message: string; status?: number; errors?: ValidationError[];}) {
        super(message, status, errors);
    }
}