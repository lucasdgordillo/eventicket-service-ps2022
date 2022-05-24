import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RrppEntity } from "src/user/entities/rrpp.entity";
import { Repository } from "typeorm";
import { PurchaseDto } from "../dtos/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { RrppCommissionEntity } from "../entities/rrppCommission.entity";

@Injectable()
export class RrppCommissionsService {
  constructor(
    @InjectRepository(RrppCommissionEntity)
    private readonly rrppCommissionsRepository: Repository<RrppCommissionEntity>
  ) {}

  async create(rrppData: RrppEntity, purchaseData: PurchaseDto) {
    const commission_total = (purchaseData.invoice.total_without_fee * rrppData.salePercentage) / 100;
    const commission = this.rrppCommissionsRepository.create({ rrpp: rrppData, event: purchaseData.event, commission_percentage: rrppData.salePercentage, commission_total: commission_total });
    return await this.rrppCommissionsRepository.save(commission);
  }
}