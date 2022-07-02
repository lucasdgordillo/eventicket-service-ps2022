import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Role } from "src/user/models/role.enum";
import { Repository } from "typeorm";
import { PurchaseDto } from "../dtos/purchase.dto";
import { PurchaseEntity, PurchaseStatus } from "../entities/purchase.entity";

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>
  ) {}

  async createNewPurchase(purchaseData: PurchaseDto, user: UserEntity, purchaseCode) {
    const purchase = this.purchaseRepository.create({ ...purchaseData, user: user, purchase_code: purchaseCode });
    return await this.purchaseRepository.save(purchase);
  }

  async updatePurchaseStatus(purchaseId: number, purchaseStatus: PurchaseStatus) {
    return await this.purchaseRepository.update(purchaseId, { status: purchaseStatus });
  }

  async getAllPurchases(user: UserEntity) {
    if (user.role === Role.USER) {
      return await this.purchaseRepository.find({ relations: { user: true, productor: true, event: { place: true }, invoice: { invoice_details: true }, rrpp: true }, where: { user: { id: user.id }}});
    }
    return await this.purchaseRepository.find();
  }

  async getPurchaseByCodeByStatus(purchaseCode, status: PurchaseStatus) {
    return await this.purchaseRepository.findOne({ relations: { event: true, productor: { province: true }, user: { province: true }, invoice: { invoice_details: true, payment_info: true } }, where: { purchase_code: purchaseCode, status: status }});
  }

  async getPurchaseByCode(purchaseCode) {
    return await this.purchaseRepository.findOne({ relations: { event: true, productor: { province: true }, user: { province: true }, invoice: { invoice_details: true, payment_info: true } }, where: { purchase_code: purchaseCode }});
  }

  async getReportBySales(user: UserEntity, params: any) {
    const query = this.purchaseRepository.createQueryBuilder("purchases")
                  .select("ev.title", "eventName")
                  .addSelect("to_char(i.payment_date ,'Mon')", "month")
                  .addSelect("SUM(i.total_without_fee)", "total")
                  .leftJoin("purchases.invoice", "i")
                  .leftJoin("purchases.event", "ev")
                  .leftJoin("purchases.productor", "pr")
                  .where("pr.id = :productorId", { productorId: user.id })
                  .andWhere("ev.id = :eventId", { eventId: params.eventId })
                  .groupBy("ev.title")
                  .addGroupBy("to_char(i.payment_date ,'Mon')");

    if (params.year) {
      query.andWhere("to_char(i.payment_date, 'YYYY') = :year", { year: params.year });
    }

    return await query.getRawMany();
  }

  async getReportByProvince(user: UserEntity, params: any) {
    const query = this.purchaseRepository.createQueryBuilder("purchases")
                  .select("pro.name", "province")
                  .addSelect("COUNT(*)", "total")
                  .leftJoin("purchases.user", "u")
                  .leftJoin("u.province", "pro")
                  .leftJoin("purchases.event", "ev")
                  .leftJoin("purchases.productor", "pr")
                  .where("pr.id = :productorId", { productorId: user.id })
                  .groupBy("pro.name");
    
    if (params.eventId) {
      query.andWhere("ev.id = :eventId", { eventId: params.eventId });
    }                  

    return await query.getRawMany();
  }
}