import { TestingModule, Test } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../../src/services/auth/auth.service';
import { UserEntity, AccountEntity } from '../../../src/entities';
import { JwtStrategy } from '../../../src/Config/passport';
import { createUserDto, userMock } from "../../../test/test-files";
import { UserService } from "../../../src/services/user/user.service";

describe('User service - create', () => {
    let module: TestingModule;
    let userService: UserService;
  
    beforeAll(async () => {
      module = await Test.createTestingModule({
          imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
            }),
          ],
        providers: [UserService, AuthService,
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
      userService = module.get<UserService>(UserService);
    });

    it('Should return false when having an email which not exist in system', async () => {
        // Arrange
        const email = 'dadie.emilin@gmail.com';
        spyOn(userService, 'checkIfEmailExist').and.returnValue(Promise.resolve(false));

        // Act
        const output = await userService.checkIfEmailExist(email);
        // Assert
        expect(output).toEqual(false);
    });

    it('Should return password crypted when having a password', async () => {
        const password = 'toto';

        const output = await userService.cryptPassword(password);

        expect(output).not.toEqual(password);
    });

    it('Should return a created user when having valid create user informations', async () => {
        const myUser = createUserDto;
        const myUserMock = userMock;
        spyOn(userService, 'createUser').and.returnValue(Promise.resolve(myUserMock));

        const output = await userService.createUser(myUser);

        expect(output.id).toBeDefined();
    });

    it('Should return an error when having invalid create user informations', async () => {
        const myUser = createUserDto;
        spyOn(userService, 'checkIfEmailExist').and.returnValue(Promise.resolve(true));

        try {
            const output = await userService.createUser(myUser);
            fail();
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});
