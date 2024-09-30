import { Injectable } from '@nestjs/common';
import { CreateResetTokenDto } from './dto/create-reset-token.dto';
import { UpdateResetTokenDto } from './dto/update-reset-token.dto';

@Injectable()
export class ResetTokensService {
  create(createResetTokenDto: CreateResetTokenDto) {
    return 'This action adds a new resetToken';
  }

  findAll() {
    return `This action returns all resetTokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resetToken`;
  }

  update(id: number, updateResetTokenDto: UpdateResetTokenDto) {
    return `This action updates a #${id} resetToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} resetToken`;
  }
}
