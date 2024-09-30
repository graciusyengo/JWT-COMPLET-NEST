import { Module } from '@nestjs/common';
import { ResetTokensService } from './reset-tokens.service';
import { ResetTokensController } from './reset-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetToken } from './entities/reset-token.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([ResetToken])],
  controllers: [ResetTokensController],
  providers: [ResetTokensService],
  exports: [ResetTokensService], 
})
export class ResetTokensModule {}
