import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'
import { CreateReportDto } from './dto/create-report.dto'
import { GetEstimateDto } from './dto/get-estimate.dto'
import { Report } from './report.entity'

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  create(currentUser: User, createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto)
    report.user = currentUser
    return this.reportRepository.save(report)
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepository.findOne(id)

    if (!report) {
      throw new NotFoundException('report not found')
    }
    report.approved = approved
    return this.reportRepository.save(report)
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne()
  }
}
