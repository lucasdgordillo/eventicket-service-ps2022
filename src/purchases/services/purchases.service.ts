import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { PurchaseDto } from "../dtos/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

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
}