import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    address: string;
    @Column()
    password: string;
}
