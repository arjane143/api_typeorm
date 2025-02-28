import { Repository } from 'typeorm';
import { AppDataSource } from '../_helpers/db';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

export class UserService {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    async getAll() {
        return this.userRepository.find({ 
            select: ['id', 'email', 'title', 'firstName', 'lastName', 'role', 'created_at', 'updated_at'],
            withDeleted: false
        });
    }

    async getById(id: number) {
        return this.userRepository.findOne({ 
            where: { id },
            withDeleted: false
        });
    }

    async create(data: Partial<User>) {
        if (await this.userRepository.findOneBy({ email: data.email })) {
            throw new Error(`Email ${data.email} is already registered`);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async update(id: number, data: Partial<User>) {
        const user = await this.getById(id);
        if (!user) throw new Error('User not found');

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        Object.assign(user, data);
        return this.userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.getById(id);
        if (!user) throw new Error('User not found');

        // This will perform a soft delete (sets deleted_at)
        return this.userRepository.softRemove(user);
    }
}