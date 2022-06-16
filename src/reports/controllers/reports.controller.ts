import { Body, Controller, Get, HttpException, Post, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { PurchasesService } from "src/purchases/services/purchases.service";
import { RrppCommissionsService } from "src/purchases/services/rrppCommissions.service";

@Controller('reports')
export class ReportsController {
  constructor(
    private rrppCommissionsService: RrppCommissionsService,
    private purchasesService: PurchasesService
  ) {}

  @UseGuards(JwtGuard)
  @Post('rrpps-report')
  async getRrppsReport(@Body() params: any, @Request() req) {
    return this.rrppCommissionsService.getReport(req.user, params).then(async (response) => {
      return { data: response };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Post('ticket-sales-report')
  async getSalesReport(@Body() params: any, @Request() req) {
    return this.purchasesService.getReportBySales(req.user, params).then(async (response) => {
      return { data: response };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Post('purchases-by-province-report')
  async getQuantityTicketsReport(@Body() params: any, @Request() req) {
    return this.purchasesService.getReportByProvince(req.user, params).then(async (response) => {
      return { data: response };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }
}
