import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe, Patch, Request
} from "@nestjs/common";
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';
import { UpdateBookDto } from "../books/dto/update-book.dto";
import { UpdateRecipientDto } from "../recipient/dto/update-recipient.dto";

@Controller('/useractivity/recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async registerRecipient(@Body() createRecipientDto: CreateRecipientDto) {
    return await this.recipientService.registerRecipient(createRecipientDto);
  }

  // Update Recipient
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updRecipient(
    @Request() req: any,
    @Body() updateRecipientDto: UpdateRecipientDto,
  ) {
    return await this.recipientService.updRecipient(updateRecipientDto,req);
  }

  // Update Recipient Status
  @UseGuards(JwtAuthGuard)
  @Patch('updatestatus')
  async updRecipientStatus(
    @Request() req: any,
    @Body() updateRecipientDto: UpdateRecipientDto,
  ) {
    return await this.recipientService.updRecipientStatus(updateRecipientDto, req);
  }



  @UseGuards(JwtAuthGuard)
  @Get(':rec_cat_title')
  async listsRecipient(
    @Request() req: any,
    @Param('rec_cat_title') rec_cat_title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    console.log(req.user.userId);
    limit = limit > 100 ? 100 : limit;
    return await this.recipientService.listsRecipient(
      rec_cat_title,
      {
        page,
        limit,
        route: 'recipient/' + rec_cat_title,
      },
      search,
      req,
    );
  }
}
