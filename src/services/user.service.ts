import { User } from "../database/entities/user.entity";
import { IUserRepository } from "../contracts/user-repository.interface";
import { UserCreateDto } from "../dtos/user/create-user.dto";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { UserUpdateDto } from "../dtos/user/update-user.dto";
import { setTimeout } from 'timers/promises';
import { ICacheProvider } from "../contracts/cache-provider.interface";

export class UserService {
    
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly cacheProvider: ICacheProvider
    ) {}
    
    async getAll(): Promise<User[]> {

        const cacheKey = 'users:all';
        const cachedUsers = await this.cacheProvider.get(cacheKey);

        if (cachedUsers) {
            return JSON.parse(cachedUsers);
        } 

        await setTimeout(2000);

        const users = await this.userRepository.getAll();

        if (!users || users.length === 0) {
            throw new NotFoundError({ message: "No users found" });
        }

        await this.cacheProvider.set(cacheKey, JSON.stringify(users), 120);

        return users;
    }

    async create(data: UserCreateDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        
        if (existingUser) {
            throw new ConflictError({message: "Email already in use"});
        }
        
        const user = await this.userRepository.create(data);

        await this.cacheProvider.del('users:all');

        return user;
    }

    async findById(id: number): Promise<User> {

        const cachedKey = `users:${id}`;
        const cachedUser = await this.cacheProvider.get(cachedKey);

        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        await this.cacheProvider.set(cachedKey, JSON.stringify(user), 120);

        return user;
    }

    async update(id: number, data: UserUpdateDto): Promise<User> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        if (!data.name && !data.phone) {
            throw new BadRequestError({message: "No data provided for update"});
        }

        const dataToUpdate: UserUpdateDto = {
            name: data.name,
            phone: data.phone
        };

        const updatedUser = await this.userRepository.update(id, dataToUpdate);

        if (!updatedUser) {
            throw new NotFoundError({ message: "Not found user to update"});
        }

        this.cacheProvider.del('users:all');
        this.cacheProvider.del(`users:${id}`);

        return updatedUser;
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        await this.userRepository.delete(id);
        await this.cacheProvider.del('users:all');
        await this.cacheProvider.del(`users:${id}`);
    }
}