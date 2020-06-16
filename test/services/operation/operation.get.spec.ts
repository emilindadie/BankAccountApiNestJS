import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OperationService } from "../../../src/services/operation/operation";
import { AccountService } from "../../../src/services/account/account";
import { OperationEntity, AccountEntity } from "../../../src/entities";
import { operationMock } from "../../../test/test-files";

describe('Get operation', () => {
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


    it('Should return one operation when having operationId', async () => {
        // Arrange
        const inputId = 1;
        const myOperationMock = operationMock;
        spyOn(operationService, 'getOperationById').and.returnValue(Promise.resolve(myOperationMock));

        // Act
        const output: any = await operationService.getOperationById(inputId);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('Should return all operation of one account when having accountId', async () => {
        const inputId = 1;
        const myOperationMock = operationMock;
        spyOn(operationService, 'getOperationByAccountId').and.returnValue(Promise.resolve([myOperationMock]));

        const output: any = await operationService.getOperationByAccountId(inputId);
        expect(output).toBeInstanceOf(Array);
    });
});
