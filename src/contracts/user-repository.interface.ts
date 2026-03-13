import { User } from '../database/entities/user.entity'
import { UserCreateDto } from "../dtos/user/create-user.dto.js";
import { UserUpdateDto } from '../dtos/user/update-user.dto';

export interface IUserRepository {
    getAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: UserCreateDto): Promise<User>;
    update(id: number, updateData: UserUpdateDto): Promise<User | null>
    delete(id: number): Promise<void>;
}