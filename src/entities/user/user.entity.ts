import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity()
export class UserEntity  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    address: string;
    @Column()
    password: string;
    @OneToMany(type => AccountEntity, account => account.user)
    accounts: AccountEntity[];
}
