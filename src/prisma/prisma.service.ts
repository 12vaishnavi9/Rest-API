import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                    url:"mysql://root:vaishnavi2003@127.0.0.1:3307/nestjs-prisma"
                }
            }
        })
    }
}
