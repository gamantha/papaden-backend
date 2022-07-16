import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

@Controller('/useractivity/recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async registerRecipient(@Body() createRecipientDto: CreateRecipientDto) {
    return await this.recipientService.registerRecipient(createRecipientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':rec_cat_title')
  async listsRecipient(
    @Param('rec_cat_title') rec_cat_title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.recipientService.listsRecipient(
      rec_cat_title,
      {
        page,
        limit,
        route: 'recipient/' + rec_cat_title,
      },
      search,
    );
  }
}
