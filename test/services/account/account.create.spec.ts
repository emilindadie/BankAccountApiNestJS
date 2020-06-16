import { TestingModule, Test } from '@nestjs/testing';
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountService } from '../../../src/services/account/account';
import { UserService } from '../../../src/services/user/user.service';
import { AuthService } from '../../../src/services/auth/auth.service';
import { UserEntity, AccountEntity } from '../../../src/entities';
import { JwtStrategy } from '../../../src/Config/passport';
import { createAccountDto, accountMock } from '../../../test/test-files';

describe('Create account', () => {
    let module: TestingModule;
    let accountService: AccountService;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
          imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({
            secretOrPrivateKey: process.env.SECRETKEY || 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
            }),
          ],
        providers: [AccountService, UserService, AuthService,
            {
                provide: getRepositoryToken(UserEntity),
                useClass: Repository,
            },
            {
                provide: getRepositoryToken(AccountEntity),
                useClass: Repository,
            },
            JwtStrategy
        ],
      }).compile();
      accountService = module.get<AccountService>(AccountService);
    });
      
    it('Should return true when name of account is not empty', async () => {
        // Arrange
        const accountName = 'Compte A';
        // Act
        const output = await accountService.ifHaveName(accountName);
        // Assert
        expect(output).toEqual(true);
    });

    it('Should create user account when having a valid account', async () => {
        const myAccount = createAccountDto;
        spyOn(accountService, 'createAccount').and.returnValue(Promise.resolve(accountMock));
        const output: any = await accountService.createAccount(myAccount);
        expect(output.id).toBeDefined();
    });
});
