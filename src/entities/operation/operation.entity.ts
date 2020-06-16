import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
@Entity()
export class OperationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    amount: number;
    @Column()
    date: Date;
    @ManyToOne(type => AccountEntity)
    @JoinColumn()
    account: AccountEntity;
}
