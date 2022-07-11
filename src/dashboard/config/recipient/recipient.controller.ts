import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';

@Controller('/dashboard/config/recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}
  // Get Recipient
  @Get('')
  async getRecipient() {
    return await this.recipientService.getRecipients();
  }
  // Create Recipient
  @Post('')
  async createRecipient(@Body() createRecipientDto: CreateRecipientDto) {
    return await this.recipientService.createRecipient(createRecipientDto);
  }
  // Update Recipient
  @Patch(':recipient_category_id')
  async updateRecipient(
    @Param('recipient_category_id') recipient_category_id: number,
    @Body() createRecipientDto: CreateRecipientDto,
  ) {
    return await this.recipientService.updateRecipient(
      recipient_category_id,
      createRecipientDto,
    );
  }
  // Delete Recipient
  @Delete(':recipient_category_id')
  async removeRecipient(
    @Param('recipient_category_id') recipient_category_id: number,
  ) {
    return await this.recipientService.removeRecipient(recipient_category_id);
  }
}
