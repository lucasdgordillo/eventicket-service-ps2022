import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasesModule } from "src/purchases/purchases.module";
import { RrppCommissionsService } from "src/purchases/services/rrppCommissions.service";
import { ReportsController } from "./controllers/reports.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    PurchasesModule
  ],
  controllers: [ ReportsController ]
})
export class ReportsModule {}