import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResetTokensService } from './reset-tokens.service';
import { CreateResetTokenDto } from './dto/create-reset-token.dto';
import { UpdateResetTokenDto } from './dto/update-reset-token.dto';

@Controller('reset-tokens')
export class ResetTokensController {
  constructor(private readonly resetTokensService: ResetTokensService) {}

  @Post()
  create(@Body() createResetTokenDto: CreateResetTokenDto) {
    return this.resetTokensService.create(createResetTokenDto);
  }

  @Get()
  findAll() {
    return this.resetTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resetTokensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResetTokenDto: UpdateResetTokenDto) {
    return this.resetTokensService.update(+id, updateResetTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetTokensService.remove(+id);
  }
}
