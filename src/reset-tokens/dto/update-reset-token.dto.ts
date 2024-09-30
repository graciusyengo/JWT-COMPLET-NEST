import { PartialType } from '@nestjs/mapped-types';
import { CreateResetTokenDto } from './create-reset-token.dto';

export class UpdateResetTokenDto extends PartialType(CreateResetTokenDto) {}
