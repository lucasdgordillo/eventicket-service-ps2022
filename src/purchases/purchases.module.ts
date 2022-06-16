import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RrppService } from "src/user/services/rrpp.service";
import { UserModule } from "src/user/user.module";
import { PurchasesController } from "./controllers/purchases.controller";
import { InvoiceEntity } from "./entities/invoice.entity";
import { InvoiceDetailEntity } from "./entities/invoiceDetail.entity";
import { PaymentInfoEntity } from "./entities/paymentInformation.entity";
import { PurchaseEntity } from "./entities/purchase.entity";
import { RrppCommissionEntity } from "./entities/rrppCommission.entity";
import { ScannedPurchaseEntity } from "./entities/scannedPurchase.entity";
import { PurchasesService } from "./services/purchases.service";
import { RrppCommissionsService } from "./services/rrppCommissions.service";
import { ScannedPurchasesService } from "./services/scannedPurchases.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ InvoiceEntity, InvoiceDetailEntity, PurchaseEntity, RrppCommissionEntity, PaymentInfoEntity, ScannedPurchaseEntity ]),
    UserModule
  ],
  providers: [ PurchasesService, RrppCommissionsService, ScannedPurchasesService ],
  controllers: [ PurchasesController ],
  exports: [ RrppCommissionsService, PurchasesService ]
})
export class PurchasesModule {}