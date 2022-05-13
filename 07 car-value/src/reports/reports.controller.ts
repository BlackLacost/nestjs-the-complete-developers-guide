import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { Serialize } from '../common/interceptors/serialize.interceptor'
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { AuthGuard } from '../users/guards/auth.guard'
import { User } from '../users/user.entity'
import { CreateReportDto } from './dto/create-report.dto'
import { ReportDto } from './dto/report.dto'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  create(
    @CurrentUser() currentUser: User,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportsService.create(currentUser, createReportDto)
  }
}
