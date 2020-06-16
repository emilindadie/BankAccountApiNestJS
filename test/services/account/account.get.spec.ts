import { TestingModule, Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AccountService } from '../../../src/services/account/account';
import { UserService } from '../../../src/services/user/user.service';
import { AuthService } from '../../../src/services/auth/auth.service';
import { UserEntity, AccountEntity } from '../../../src/entities';
import { allAccountMock } from "../../../test/test-files";

describe('Get account', () => {
    let module: TestingModule;
    let accountService: AccountService;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
          imports: [
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
