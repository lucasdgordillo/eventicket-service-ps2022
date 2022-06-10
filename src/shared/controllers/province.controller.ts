import { Controller, Get } from "@nestjs/common";
import { ProvinceService } from "../services/province.service";

@Controller('provinces')
export class ProvinceController {
  constructor(
    private provinceService: ProvinceService
  ) {}

  @Get()
  async getAllProvinces() {
    const data = await this.provinceService.getAll();
    return { data };
  }
}