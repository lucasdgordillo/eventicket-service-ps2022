import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { ScannedPurchaseDto } from "../dtos/scannedPurchase.dto";
import { ScannedPurchaseEntity } from "../entities/scannedPurchase.entity";

@Injectable()
export class ScannedPurchasesService {
  constructor(
    @InjectRepository(ScannedPurchaseEntity)
    private readonly scannedPurchaseRepository: Repository<ScannedPurchaseEntity>
  ) {}

  async createNewScannedPurchase(purchaseData: ScannedPurchaseDto, user: UserEntity) {
    const scannedPurchase = this.scannedPurchaseRepository.create({ ...purchaseData, checker: user });
    return await this.scannedPurchaseRepository.save(scannedPurchase);
  }

  async getAllScannedPurchases(user: UserEntity) {
    return await this.scannedPurchaseRepository.find({ relations: { checker: true, event: true, purchase: true }});
  }
}