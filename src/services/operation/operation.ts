import { Repository } from 'typeorm';
import { AccountService } from '../account/account';
import { CreateOperationDto, IOperation } from '../../models/operation';
import { OperationEntity } from '../../entities';
import { operationType } from '../../type/operation';
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OperationService {

    constructor(
        @InjectRepository(OperationEntity) private readonly operationRepository: Repository<OperationEntity>, private accountService: AccountService)  {
    }

    async createOperation(accountId: number, amount: number) {
        const account = await this.accountService.getAccountById(accountId);
        const updateSolde = await this.accountService.updateSolde(account, amount);

        if (updateSolde) {
            const operation = new CreateOperationDto();
            operation.account = account;
            operation.amount = amount;
            operation.type = amount > 0 ? operationType.deposit : operationType.withdraw;
            operation.date = new Date();
            const createOperation = await this.operationRepository.save(operation);
            return createOperation;
        }
    }

    async getOperationById(id: number): Promise<IOperation>  {
        return await this.operationRepository.findOne({ id });
    }

    async getOperationByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date) : Promise<IOperation[]>{
        if (startDate && endDate) {
            const start = new Date(startDate).toISOString();
            const end = new Date(endDate).toISOString();
            return await this.operationRepository
                .createQueryBuilder('operation_entity')
                .where('operation_entity.accountId= :id And operation_entity.date>= :startDate And operation_entity.date<= :endDate',
                { id: accountId, startDate: start, endDate : end }).getMany();
        }
        const myLocalDate = new Date(localDate);

        const firstDay = new Date(myLocalDate.getFullYear(), myLocalDate.getMonth(), 1);
        const lastDay = new Date(myLocalDate.getFullYear(), myLocalDate.getMonth() + 1, 0);

        return await this.operationRepository
            .createQueryBuilder('operation_entity')
            .where('operation_entity.accountId= :id And operation_entity.date>= :startDate And operation_entity.date<= :endDate',
            { id: accountId, startDate: firstDay.toISOString(), endDate : lastDay.toISOString() }).getMany();
    }

    async getLastOperationByAccountId(accountId: number){
        const res =  await this.operationRepository
        .createQueryBuilder('operation_entity')
        .orderBy({date : 'DESC'})
        .where('operation_entity.accountId= :id',
        { id: accountId}).getMany();
        return res[0];
    }
}
