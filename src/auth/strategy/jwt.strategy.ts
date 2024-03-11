import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private prisma:PrismaService){
        super({
            jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'super-secret'
        })
    }
    // validate(payload:any){
    //     return payload
    // }
    //need user info as well:-
    async validate(payload:{sub:number,email:string}){
        const user=await this.prisma.user.findUnique({
            where:{
                id:payload.sub,
            }
        });
        delete user.hash;
        return user;
    }
}