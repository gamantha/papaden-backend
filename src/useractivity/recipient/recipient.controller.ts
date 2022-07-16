import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { JwtAuthGuard } from '../../auth/strategy/jwt-auth.guard';

@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async registerRecipient(@Body() createRecipientDto: CreateRecipientDto) {
    return await this.recipientService.registerRecipient(createRecipientDto);
  }
}
