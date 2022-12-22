import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from "@nestjs/common";
import { DeleterequestService } from './deleterequest.service';
import { CreateDeleterequestDto } from './dto/create-deleterequest.dto';
import { UpdateDeleterequestDto } from './dto/update-deleterequest.dto';
import { CreateBookDto } from "../useractivity/books/dto/create-book.dto";

@Controller('deleterequest')
export class DeleterequestController {
  constructor(private readonly deleterequestService: DeleterequestService) {}

  @Post()
  async create(@Body() createDeleterequestDto: CreateDeleterequestDto, @Request() req: any) {
    // const delReq = await this.deleterequestService.getRequest(
    //   createDeleterequestDto,
    //   req, RENO
    // );
    const ifExist = this.deleterequestService.findByEmail(
req.email
    );
    console.log('comparing');
    console.log(ifExist);
if (ifExist) {
  console.log('exist');
return 'EXIST';
} else {
      console.log('create DELETE REQUEST');
      this.deleterequestService.create(createDeleterequestDto, req);
      return 'created';
}

  }

  @Get('confirm')
  async confirm(
    @Query() query: { email: string, token: string },
    @Request() req: any,
  ) {
    const delUser = this.deleterequestService.find(
      `${query.email}`,
      `${query.token}`,
    );

    console.log('confirm deletion');
    // console.log(`${query.token}`);
    // console.log(delUser);
    return delUser;
    // return `${query.email}`;
  }

  @Get()
  findAll() {
    console.log('GET findall deleterequest' );
    return this.deleterequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deleterequestService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeleterequestDto: UpdateDeleterequestDto) {
    return this.deleterequestService.update(+id, updateDeleterequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleterequestService.remove(+id);
  }
}
