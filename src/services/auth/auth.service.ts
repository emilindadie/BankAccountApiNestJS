import { UserService } from "../user/user.service";
import { Injectable } from "@nestjs/common";
import { sign, verify } from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(id: number): Promise<any> {
    return await this.usersService.getUserById(id);
  }

  async createToken(data : any){
    const payload = { id: data.id };
    const accessToken  =  sign(payload, process.env.JWTACCESSTOKENSECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIREIN });
    const refreshToken =  sign(payload, process.env.JWTREFRESHTOKENSECRET, { expiresIn : process.env.REFRESH_TOKEN_EXPIREIN });
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: data,
    };
  }

  async createNewToken(refreshToken: string){
    const data = verify(refreshToken, process.env.JWTREFRESHTOKENSECRET);
    return this.createToken(data);
  }

  async getCurrentUserWithToken(refreshToken: string){
    const data : any = verify(refreshToken, process.env.JWTREFRESHTOKENSECRET);
    return await this.validateUser(data.id);
  }
}