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

  async getAllPurchases(user: UserEntity) {
    if (user.role === Role.USER) {
      return await this.purchaseRepository.find({ relations: { user: true, productor: true, event: true, invoice: true, rrpp: true }, where: { user: { id: user.id }}});
    }
    return await this.purchaseRepository.find();
  }
}