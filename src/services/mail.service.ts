import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = this.mailTransporter();
    console.log("Transporter initialized:", this.transporter);
  }
  private mailTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'), // Utilisez l'hôte SMTP de Mailtrap
      port: this.configService.get<number>('MAIL_PORT'), // Utilisez le port de Mailtrap
      secure: false, // true pour 465, false pour d'autres ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'), // Votre username Mailtrap
        pass: this.configService.get<string>('MAIL_PASSWORD'), // Votre mot de passe Mailtrap
      },
      tls: {
        rejectUnauthorized: false // Ignorer les erreurs de certificat
    }
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
      from:"Auth-Backend server", // Adresse d'expédition fictive
      to: to, // Adresse du destinataire
      subject: 'Réinitialisation de mot de passe',
      html: `<p>La requête pour réinitialiser ton mot de passe. Clique sur ce lien pour réinitialiser ton mot de passe : <a href="${resetLink}">Réinitialiser le mot de passe</a></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé avec succès à:', to);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
    }
  }
}
