import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RrppEntity } from "src/user/entities/rrpp.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { PurchaseDto } from "../dtos/purchase.dto";
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

  async getReport(user: UserEntity, params: any) {
    const query = this.rrppCommissionsRepository.createQueryBuilder("rrppComm")
                  .select("rp.fullName", "fullName")
                  .addSelect("SUM(rrppComm.commission_total)", "total")
                  .leftJoin("rrppComm.rrpp", "rp")
                  .leftJoin("rrppComm.event", "ev")
                  .leftJoin("ev.productor", "pr")
                  .where("pr.id = :productorId", { productorId: user.id })
                  .groupBy("rp.fullName");

    if (params.eventId) {
      query.andWhere("ev.id = :eventId", { eventId: params.eventId });
    }
    if (params.dateFrom) {
      query.andWhere("to_char(rrppComm.createdAt, 'YYYY-MM-DD') >= :dateFrom", { dateFrom: params.dateFrom });
    }
    if (params.dateTo) {
      query.andWhere("to_char(rrppComm.createdAt, 'YYYY-MM-DD') <= :dateTo", { dateTo: params.dateTo });
    }

    return await query.getRawMany();
  }
}