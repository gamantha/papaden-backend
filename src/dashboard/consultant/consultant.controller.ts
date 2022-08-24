import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe, UseGuards, Request
} from "@nestjs/common";
import { ConsultantService } from './consultant.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { JwtAuthGuard } from "../../auth/strategy/jwt-auth.guard";

@Controller('/dashboard/consultant')
export class ConsultantController {
  constructor(private readonly consultantService: ConsultantService) {}


  // Get Consultants list
  @Get('consultants')
  async getConsultants(
    @Query('search') search = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.consultantService.findConsultants(
      {
        page,
        limit,
        route: 'consultants',
      },
      search,
    );
  }




  // Get Consultant
  @Get('')
  async getConsultant(
    @Query('search') search = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.consultantService.getConsultant(
      {
        page,
        limit,
        route: 'consultant',
      },
      search,
    );
  }
  // Create Consultant
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createConsultant(@Request() req: any, @Body() createConsultantDto: CreateConsultantDto, ) {
    console.log(req.user.userId)
    return await this.consultantService.createConsultant(
      createConsultantDto,
      req,
    );
  }
  // Update Consultant
  @Patch(':consultant_id')
  async updateConsultant(
    @Param('consultant_id') consultant_id: string,
    @Body() updateConsultantDto: UpdateConsultantDto,
  ) {
    return await this.consultantService.updateConsultant(
      consultant_id,
      updateConsultantDto,
    );
  }
  // Delete Consultant
  @Delete(':consultant_id')
  async removeConsultant(@Param('consultant_id') consultant_id: string) {
    return await this.consultantService.removeConsultant(consultant_id);
  }
}
