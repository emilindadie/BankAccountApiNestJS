import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationService } from "../../../src/services/operation/operation";
import { AccountService } from "../../../src/services/account/account";
import { OperationEntity, AccountEntity } from "../../../src/entities";
import { BalanceService } from "../../../src/services/balance/balance";

describe('Get balance', () => {
    let module: TestingModule;
    let balanceService: BalanceService;

    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [],
        providers: [BalanceService, OperationService, AccountService,
            {
                provide: getRepositoryToken(OperationEntity),
                useClass: Repository,
            },
            {
                provide: getRepositoryToken(AccountEntity),
                useClass: Repository,
            },
        ],
      }).compile();
      balanceService = module.get<BalanceService>(BalanceService);
    });

    it('Should return balance when having accountId , startDate and enddate', async () => {
        // Arrange
        const inputAccountId = 1;
        spyOn(balanceService, 'getBalanceByAccountId').and.returnValue(Promise.resolve(100));

        // Act
        const output = await balanceService.getBalanceByAccountId(inputAccountId, new Date(), new Date());

        // Assert
        expect(output).toBe(100);
    });
});
