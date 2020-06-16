import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { IUser } from '../../models/user/user.model.i';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../models/user/user-create.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>)  {
    }

    async create(userDto: CreateUserDto): Promise<IUser> {
        return await this.userRepository.save(userDto);
    }

    async checkIfEmailExist(email: string): Promise<boolean> {
        const users = await this.getUserByEmail(email);
        if (users) {
            return true;
        }
        return false;
    }
    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const emailExist = await this.checkIfEmailExist(createUserDto.email);
        if (emailExist) {
            throw new Error('Email already exist!');
        }
        createUserDto.password = await this.cryptPassword(createUserDto.password);
        const createUserResponse = await this.userRepository.save(createUserDto);
        delete createUserResponse.password;
        return createUserResponse;
    }
    async cryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Number(process.env.SALT)).then((hash) => hash);
    }
    async comparePassword(password: string, hashpassword: string): Promise<boolean> {
        const match = await bcrypt.compare(password, hashpassword);
        if (match) {
            return true;
        }
        return false;
    }
    async logUser(email: string, password: string): Promise<any> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error('Email or password is wrong!');
        }
        const canLogin = await this.comparePassword(password, user.password);
        if (canLogin) {
            delete user.password;
            return user;
        }
        throw new Error('Email or password is wrong!');
    }

    async getUserByEmail(email: string): Promise<any> {
        return await this.userRepository.findOne({ email });
    }

    async getUserById(id: number): Promise<any> {
        return await this.userRepository.findOne({ id });
    }
}