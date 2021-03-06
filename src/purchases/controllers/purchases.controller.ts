import { Body, Controller, Get, HttpException, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RrppService } from "src/user/services/rrpp.service";
import { PurchaseDto } from "../dtos/purchase.dto";
import { ScannedPurchaseDto } from "../dtos/scannedPurchase.dto";
import { PurchaseStatus } from "../entities/purchase.entity";
import { ScannedPurchaseStatus } from "../entities/scannedPurchase.entity";
import { GenerateCodeHelper } from "../helpers/generateCodes.helper";
import { PurchasesService } from "../services/purchases.service";
import { RrppCommissionsService } from "../services/rrppCommissions.service";
import { ScannedPurchasesService } from "../services/scannedPurchases.service";

@Controller('purchases')
export class PurchasesController {
  constructor(
    private purchasesService: PurchasesService,
    private rrppService: RrppService,
    private rrppCommissionsService: RrppCommissionsService,
    private scannedPurchasesService: ScannedPurchasesService
  ) {}

  @UseGuards(JwtGuard)
  @Get('/scanned-purchases')
  async getScannedPurchases(@Request() req) {
    return this.scannedPurchasesService.getAllScannedPurchases(req.user).then(async (scannedPurchases) => {
      return { data: scannedPurchases };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async registerNewPurchase(@Body() purchaseData: PurchaseDto, @Request() req) {
    const purchaseCode = GenerateCodeHelper.generateRandomAlfanumericCode();

    if (purchaseData.rrpp) {
      const rrppId = Number(purchaseData.rrpp);
      this.rrppService.getById(rrppId).then(async (rrppData) => {
        if (!rrppData) { return; }
        this.rrppCommissionsService.create(rrppData, purchaseData);
      });
    }

    return this.purchasesService.createNewPurchase(purchaseData, req.user, purchaseCode).then(async () => {
      return { message: 'Create Success', purchaseCode: purchaseCode };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Get()
  async getPurchases(@Request() req) {
    return this.purchasesService.getAllPurchases(req.user).then(async (purchases) => {
      return { data: purchases };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Get(':purchase_code')
  async getPurchaseById(@Param('purchase_code') purchaseCode: string) {
    return this.purchasesService.getPurchaseByCodeByStatus(purchaseCode, PurchaseStatus.NOT_VERIFIED).then(async (purchase) => {
      return { data: purchase };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Post('validate-purchase')
  async validatePurchase(@Body() purchaseData: any, @Request() req) {
    if (!purchaseData.purchase_code) { throw new HttpException('PURCHASE_CODE_REQUIRED', 400);}
    if (!purchaseData.scanned_date) { throw new HttpException('PURCHASE_SCANNED_DATE_REQUIRED', 400);}

    return this.purchasesService.getPurchaseByCode(purchaseData.purchase_code).then(async (purchase) => {
      if (!purchase) { throw new HttpException('PURCHASE_CODE_INVALID', 404); }
      if (purchase.status !== PurchaseStatus.NOT_VERIFIED) { 
        const scannedData: ScannedPurchaseDto = {
          purchase: purchase,
          scanned_date: purchaseData.scanned_date,
          event: purchase.event,
          purchase_code: purchaseData.purchase_code,
          status: ScannedPurchaseStatus.REJECTED
        };
        return this.scannedPurchasesService.createNewScannedPurchase(scannedData, req.user).then((response) => {
          throw new HttpException('PURCHASE_CODE_INVALID', 404);
        }).catch(e => {
          throw new HttpException(e.response, e.status);
        });
      } else {
        return this.purchasesService.updatePurchaseStatus(purchase.id, PurchaseStatus.VERIFIED).then(async () => {
          const scannedData: ScannedPurchaseDto = {
            purchase: purchase,
            scanned_date: purchaseData.scanned_date,
            event: purchase.event,
            purchase_code: purchaseData.purchase_code,
            status: ScannedPurchaseStatus.APPROVED
          };
          return this.scannedPurchasesService.createNewScannedPurchase(scannedData, req.user).then((response) => {
            return { message: 'Validate Success' };
          }).catch(e => {
            throw new HttpException(e.response, e.status);
          });
        })
      }
    });
  }
}
