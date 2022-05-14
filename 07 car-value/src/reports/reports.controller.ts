import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Serialize } from '../common/interceptors/serialize.interceptor'
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { AdminGuard } from '../users/guards/admin.guard'
import { AuthGuard } from '../users/guards/auth.guard'
import { User } from '../users/user.entity'
import { ApproveReportDto } from './dto/approve-report.dto'
import { CreateReportDto } from './dto/create-report.dto'
import { GetEstimateDto } from './dto/get-estimate.dto'
import { ResponseReportDto } from './dto/response-report.dto'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query)
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ResponseReportDto)
  create(
    @CurrentUser() currentUser: User,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportsService.create(currentUser, createReportDto)
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id') id: string,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.reportsService.changeApproval(
      parseInt(id),
      approveReportDto.approved,
    )
  }
}
