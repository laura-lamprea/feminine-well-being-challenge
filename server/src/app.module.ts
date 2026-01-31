import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { WellnessModule } from "./wellness/wellness.module";

@Module({
  imports: [PrismaModule, WellnessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
