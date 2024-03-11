import { Controller, Post,Req,Body  } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";
import { validate } from "class-validator";

@Controller('auth')
 export class AuthController{
    constructor(private authService:AuthService){}

    //INSTEAD OF @Req DECORATORS SHOULD USE BODY, TO PROVIDE
    //INDEPENDENCE THING
    // @Post('signup')
    //     signup(@Req() req:Request){
    //         console.log(req)
    //         return this.authService.signup;
    //     }

    @Post('signup')
    signup(@Body() dto:AuthDto){
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto:AuthDto){
        return this.authService.signin(dto);
    } 
 }