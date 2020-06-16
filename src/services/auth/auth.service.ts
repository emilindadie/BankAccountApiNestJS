import { UserService } from "../user/user.service";
import { Injectable } from "@nestjs/common";
import { sign } from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(id: number): Promise<any> {
    return await this.usersService.getUserById(id);
  }

  async createToken(data : any){
    const payload = { id: data.id };
    const accessToken  =  sign(payload, process.env.JWTSECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIREIN });
    const refreshToken =  sign(payload, process.env.JWTSECRET, { expiresIn : process.env.REFRESH_TOKEN_EXPIREIN });
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: data,
    };
  }
}