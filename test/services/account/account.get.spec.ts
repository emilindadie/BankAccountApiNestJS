import { TestingModule, Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountService } from '../../../src/services/account/account';
import { UserService } from '../../../src/services/user/user.service';
import { AuthService } from '../../../src/services/auth/auth.service';
import { UserEntity, AccountEntity } from '../../../src/entities';
import { JwtStrategy } from '../../../src/Config/passport';
import { allAccountMock } from "../../../test/test-files";

describe('Get account', () => {
    let module: TestingModule;
    let accountService: AccountService;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
          imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({
            secretOrPrivateKey: process.env .SECRETKEY ||'secretKey',
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

    it('Should return all account when calling methode get all account ', async () => {
        // Arrange
        spyOn(accountService, 'getAllAccount').and.returnValue(Promise.resolve(allAccountMock));

        // Act
        const output: any = await accountService.getAllAccount();

        // Assert
        expect(output).toBeInstanceOf(Array);
    });
});
