import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  mailTransporter() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'), // Utilisez votre hôte SMTP
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // true pour 465, false pour d'autres ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'), // Votre email SMTP
        pass: this.configService.get<string>('MAIL_PASSWORD'), // Votre mot de passe SMTP
      },
    });

    return transporter;
  }

  async sendPasswordResetEmail(to:string,token:string) {
    const resetLink=`http://localhost:3000/reset-password?token=${token}`

  }
}
