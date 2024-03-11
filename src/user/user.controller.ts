import { Controller, Get, Req, UseGuards,Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get('me')
   // getMe(@Req() req:Request){
        //user:req.user
        getMe(@GetUser() user: User) {
            return user;
     //   return req.user;//from validate function in jwtStrategy.ts
    }

    //edit user request------------------------------------
    @Patch()
    editUser(@GetUser('id') userId:number,@Body() dto:EditUserDto){
        return this.userService.editUser(userId,dto);
    }
}
