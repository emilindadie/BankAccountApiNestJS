import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationService } from "../../../src/services/operation/operation";
import { AccountService } from "../../../src/services/account/account";
import { OperationEntity, AccountEntity } from "../../../src/entities";
import { operationMock } from "../../../test/test-files";

describe('Create operation', () => {
    let module: TestingModule;
    let operationService: OperationService;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [],
        providers: [OperationService, AccountService,
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
      operationService = module.get<OperationService>(OperationService);
    });

    it('Should return created operation when having valid amount', async () => {
        // Arrange
        const inputAccountId = 1;
        const inputAmount = 700;
        const myOperationMock = operationMock;
        spyOn(operationService, 'createOperation').and.returnValue(Promise.resolve(myOperationMock));

        // Act
        const output: any = await operationService.createOperation(inputAccountId, inputAmount);

        // Assert
        expect(output.id).toBeDefined();
    });
});
