import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class AccountEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ default: 0 })
    solde: number;
    @ManyToOne(type => UserEntity, user => user.accounts)
    user: UserEntity;
}