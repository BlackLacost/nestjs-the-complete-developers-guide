import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'
import { CreateReportDto } from './dto/create-report.dto'
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
}
