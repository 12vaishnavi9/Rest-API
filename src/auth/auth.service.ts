import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { PrismaService } from '../prisma/prisma.service';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
//import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService,
        private jwt:JwtService){}

    async signup(dto:AuthDto){
      //  console.log(dto.email);
        const hash=await argon.hash(dto.password);
        try{
            const user=await this.prisma.user.create({
                data:{
                    email:dto.email,
                    hash
                },
                // select:{
                //     id:true,
                //     email:true
                // } or delete user.hash
            })
            return user;
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code==='P2002'){
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error;
        }
    }
    async signin(dto:AuthDto){
       // console.log(dto.email);
        const user=await this.prisma.user.findUnique({
            where:{
                email: dto.email,
            }
        })
        if(!user){
            throw new ForbiddenException(
                'Credentials incorrect'
            )
        }

        //compare password
        const passMatch=await argon.verify(user.hash,dto.password);
        if(!passMatch){
            throw new ForbiddenException('Credentials incorrect')
        }
        delete user.hash  
        return this.signToken(user.id,user.email)
     //   return dto.email
    }

    async signToken(userId:number,email:string){
        // console.log(userId);
        // console.log(email)
        const payload={
            sub:userId,
            email
        }
        const secret='super-secret'
        const token= await this.jwt.signAsync(payload,{
            expiresIn:'15m',
            secret:secret
        })
    //    console.log(token)
        return {
            access_token:token
        }
    }
}