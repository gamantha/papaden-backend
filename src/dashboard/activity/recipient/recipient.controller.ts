import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RecipientService } from './recipient.service';

@Controller('/dashboard/activity/recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Get('')
  async getAdminRecipientLists(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.recipientService.getAdminRecipientLists(
      {
        page,
        limit,
        route: 'books',
      },
      search,
    );
  }
}
