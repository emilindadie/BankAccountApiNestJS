import { TestingModule, Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AccountService } from '../../../src/services/account/account';
import { UserService } from '../../../src/services/user/user.service';
import { AuthService } from '../../../src/services/auth/auth.service';
import { UserEntity, AccountEntity } from '../../../src/entities';
import { JwtStrategy } from '../../../src/Config/passport';
import { accountMock, account } from "../../../test/test-files";

describe('Update money', () => {
    let module: TestingModule;
    let accountService: AccountService;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
          imports: [],
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

    it('Should save positif money in account', async () => {
        // Arrange
        const inputId = 1;
        const inputMoney = Number(200);
        spyOn(accountService, 'updateSolde').and.returnValue(Promise.resolve(accountMock));

        // Act
        const output: any = await accountService.updateSolde(account, inputMoney);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('Should get money in account (status OK)', async () => {
        // Arrange
        const inputId = 1;
        const inputMoney = Number(200);
        spyOn(accountService, 'updateSolde').and.returnValue(Promise.resolve(accountMock));

        // Act
        const output: any = await accountService.updateSolde(account, inputMoney);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('Should get money in account (Exeption)', async () => {
        // Arrange
        const inputId = 1;
        const inputMoney = Number(-500);
        spyOn(accountService, 'updateSolde').and.returnValue(Promise.resolve(accountMock));

        try {
            // Act
            const output: any = await accountService.updateSolde(account, inputMoney);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
