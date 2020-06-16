import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
