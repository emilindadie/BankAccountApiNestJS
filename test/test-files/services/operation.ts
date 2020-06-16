import { CreateOperationDto, IOperation } from "../../../src/models/operation";
import { operationType } from "../../../src/type/operation";

export const createOperationDto = new CreateOperationDto();
createOperationDto.type = operationType.withdraw;
createOperationDto.account = {
    id: 1,
    name: 'Compte A',
    solde: 0,
    user: {
        id: 1,
        name: 'toto',
        email: 'dadie.emilin@gmail.com',
        address: '14 rue de Mulhouse',
        accounts: [],
    },
},
    createOperationDto.amount = 600;
createOperationDto.date = new Date();

export const operationMock: IOperation = {
    id: 1,
    type: operationType.withdraw,
    amount: 7888,
    date: new Date(),
    account: {
        id: 1,
        name: 'Compte A',
        solde: 0,
        user: {
            id: 1,
            name: 'toto',
            email: 'dadie.emilin@gmail.com',
            address: '14 rue de Mulhouse',
            accounts: [],
        },
    },
};
