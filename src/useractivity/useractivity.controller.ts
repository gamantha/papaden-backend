import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UseractivityService } from './useractivity.service';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import LocalFilesInterceptor from './local.interceptor';
import { UpdateUseractivityDto } from './dto/update-useractivity.dto';
import { PasswordUseractivityDto } from './dto/password-useractivity.dto';

@Controller('useractivity')
export class UseractivityController {
  constructor(private readonly useractivityService: UseractivityService) {}
  // Get Profil
  @UseGuards(JwtAuthGuard)
  @Get('profil')
  async getProfil(@Request() req: any) {
    const vals = Object.values(req.user);
    return await this.useractivityService.findProfil(vals);
  }
  // Update Profil
  @UseGuards(JwtAuthGuard)
  @Patch('profil')
  async updProfil(
    @Request() req: any,
    @Body() updateUseractivityDto: UpdateUseractivityDto,
  ) {
    const userData = Object.values(req.user);
    return await this.useractivityService.updProfil(
      userData,
      updateUseractivityDto,
    );
  }

  // Update volunteer
  @UseGuards(JwtAuthGuard)
  @Patch('requestvolunteer')
  async requestVolunteer(
    @Request() req: any,
    @Body() updateUseractivityDto: UpdateUseractivityDto,
  ) {
    const userData = Object.values(req.user);
    return await this.useractivityService.requestVolunteer(
      userData,
      updateUseractivityDto,
    );
  }

  // Update recipient
  @UseGuards(JwtAuthGuard)
  @Patch('requestRecipient')
  async requestrecipient(
    @Request() req: any,
    @Body() updateUseractivityDto: UpdateUseractivityDto,
  ) {
    const userData = Object.values(req.user);
    return await this.useractivityService.requestRecipient(
      userData,
      updateUseractivityDto,
    );
  }


  // Update Password
  @UseGuards(JwtAuthGuard)
  @Patch('profil/password')
  async recoveryPassword(
    @Request() req: any,
    @Body() passwordUseractivityDto: PasswordUseractivityDto,
  ) {
    const userData = Object.values(req.user);
    return await this.useractivityService.recoveryPassword(
      userData,
      passwordUseractivityDto,
    );
  }
  // Get Profil Image
  @UseGuards(JwtAuthGuard)
  @Get('profil/image-upload')
  async avatarGet(@Request() req: any) {
    const vals = Object.values(req.user);
    const id = vals.toString();
    return this.useractivityService.avatarGet(id);
  }
  // Upload  Profil Image
  @UseGuards(JwtAuthGuard)
  @Post('profil/image-upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/avatars',
    }),
  )
  async avatarUpload(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const vals = Object.values(req.user);
    const id = vals.toString();
    return this.useractivityService.avatarUpload(id, file);
  }
  // Get Born
  @UseGuards(JwtAuthGuard)
  @Get('born')
  async findBorn() {
    return await this.useractivityService.findBorn();
  }

  @UseGuards(JwtAuthGuard)
  @Get('tags')
  async findTag() {
    return await this.useractivityService.findTag();
  }
  // Get Recipient
  @UseGuards(JwtAuthGuard)
  @Get('recipientcats')
  async findRecipient() {
    return await this.useractivityService.findRecipient();
  }
  // Get Consultant
  @UseGuards(JwtAuthGuard)
  @Get('consultant')
  async getConsultant(
    @Query('search') search = '',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.useractivityService.findConsultant(
      {
        page,
        limit,
        route: 'consultant',
      },
      search,
    );
  }
}
