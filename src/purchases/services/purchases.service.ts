import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable } from "rxjs";
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
      return await this.purchaseRepository.find({ relations: { user: true, productor: true, event: { place: true }, invoice: true, rrpp: true }, where: { user: { id: user.id }}});
    }
    return await this.purchaseRepository.find();
  }

  async getPurchaseByCode(purchaseCode, status: PurchaseStatus) {
    return await this.purchaseRepository.findOne({ relations: { event: true, productor: { province: true }, user: { province: true }, invoice: { invoice_details: true, payment_info: true } }, where: { purchase_code: purchaseCode, status: status }});
  }
}