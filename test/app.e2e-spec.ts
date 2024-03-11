import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import {Test} from "@nestjs/testing";

// 1--------------------------------
//will run a test inside describe block to see if script is running
describe('App e2e',()=>{
  //2---
  let app:INestApplication
  //----------

  beforeAll(async()=>{
    const moduleRef=await Test.createTestingModule({
      imports:[AppModule],
    }).compile();

    //2------------------------------
    app=moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(
      {whitelist:true}
    ));
    await app.init();
  })
  afterAll(()=>{
    app.close();
  })
  it.todo('should pass');
});