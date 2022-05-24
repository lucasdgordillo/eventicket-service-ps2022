import { Body, Controller, HttpException, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RrppService } from "src/user/services/rrpp.service";
import { PurchaseDto } from "../dtos/purchase.dto";
import { GenerateCodeHelper } from "../helpers/generateCodes.helper";
import { PurchasesService } from "../services/purchases.service";
import { RrppCommissionsService } from "../services/rrppCommissions.service";

@Controller('purchases')
export class PurchasesController {
  constructor(
    private purchasesService: PurchasesService,
    private rrppService: RrppService,
    private rrppCommissionsService: RrppCommissionsService
  ) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async registerNewPurchase(@Body() purchaseData: PurchaseDto, @Request() req) {
    const purchaseCode = GenerateCodeHelper.generateRandomCode();
    
    if (purchaseData.rrpp) {
      const rrppId = Number(purchaseData.rrpp);
      this.rrppService.getById(rrppId).then(async (rrppData) => {
        if (!rrppData) { return; }
        this.rrppCommissionsService.create(rrppData, purchaseData);
      });
    }

    return this.purchasesService.createNewPurchase(purchaseData, req.user, purchaseCode).then(async () => {
      return { message: 'Create Success' };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }
}
