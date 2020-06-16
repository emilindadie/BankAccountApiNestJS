import { Repository } from 'typeorm';
import { CreateAccountDto, IAccount } from '../../models/account';
import { AccountEntity } from '../../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>)  {
    }
    
    ifHaveName(name: string) {
        if (name && name.length > 0) {
            return true;
        }
        return false;
    }

    async createAccount(createAccountDto: CreateAccountDto): Promise<IAccount> {
        const haveName = await this.ifHaveName(createAccountDto.name);
        if (!haveName) {
            throw new Error('Account should have a name!');
        }
        return await this.accountRepository.save(createAccountDto);
    }

    async getAllAccount(): Promise<IAccount[]> {
        return await this.accountRepository.find();
    }

    async updateSolde(account: AccountEntity, amount: number): Promise<IAccount> {
        account.solde += amount;
        if (account.solde < 0) {
            throw new Error('insufficient balance!');
        }
        return await account.save();
    }

    async getAccountById(id: number): Promise<any> {
        return await this.accountRepository.findOne({ id });
    }

    async updateAccount(account: AccountEntity): Promise<IAccount> {
        return await this.accountRepository.save(account);
    }

    async getAccountByUserId(userId: number): Promise<IAccount[]> {
        return await this.accountRepository.find({where : {user : {id : userId}}})
    }
}
