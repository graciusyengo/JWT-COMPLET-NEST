import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from 'src/refresh-token/entities/refresh-token.entity';
import { ResetToken } from 'src/reset-tokens/entities/reset-token.entity';
import cuid from 'cuid';
import { randomBytes } from 'crypto';
import { MailService } from 'src/services/mail.service';

@Injectable()
export class AuthService {
  bcrypt: any;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository<ResetToken>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private mailService:MailService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;

    const searchEmail = await this.userRepository.findOne({ where: { email } });
    if (searchEmail) {
      throw new BadRequestException(`L'email deja utilisé`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.save({
      username,
      email,
      password: hashPassword,
    });

    delete user.password;
    return user;
  }

  async login(credentialsUser: LoginUserDto) {
    const { password, email } = credentialsUser;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.sign({ id: user.id });
    console.log('Secret JWT:', 'secret'); // Juste pour vérifier
    console.log(jwt);

    delete user.password;

    return await this.generateUserToken(user.id, user);
  }

  async refreshToken(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOne({
      where: {
        token: refreshToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });

    await this.refreshTokenRepository.remove(token);
    console.log(token.expiryDate);

    if (!token) {
      throw new UnauthorizedException(`Token invalide`);
    }

    console.log(token.userId);
    return this.generateUserToken(token.userId);
  }

  async generateUserToken(userId, user?: any) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      { expiresIn: '1h' },
    );
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
  async storeRefreshToken(token: string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.refreshTokenRepository.save({ token, userId, expiryDate });
  }

  async changePassword(userId, oldPassword: string, newPassword: string) {
    // TO DO: FIND USER

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        `L'utilisateur n'est pas trouver `,
        HttpStatus.NOT_FOUND,
      );
    }
    // TO DO: COMPARE THE OLD PASSWORD WITH PASSWORD IN DB
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(`Wrong credentials`);
    }

    // TO DO: CHANGE USER'S PASSWORD (DON'T FORGOT TO HASH IT)
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;

    const { password, ...result } = user;
    await this.userRepository.save(user);
    return {
      messages: {
        message: 'Mot de passe changer avec succes',
      },
      ...result,
    };
  }

  async forgotPassword(email:string){
    //TO DO: CHECK THAT USER EXIST
    const user= await this.userRepository.findOne({where:{email:email}})

    if(user){
           // TODO: IF USER EXIST GENERATE DE RESET PASSWORD
      const resetToken = this.generateCustomToken();
      const expiryDate= new Date()
      expiryDate.setHours(expiryDate.getHours()+ 1 )
      console.log(resetToken);

      try {
        // Attempt to save the reset token
        await this.resetTokenRepository.save({
          token: resetToken,
          userId: user.id,
          expiryDate,
        });

            // TODO: SEND THE LINK TO USER BY EMAIL (NODEMAILLER/SES:/ETC..)
this.mailService.sendPasswordResetEmail(email,resetToken)
        console.log('Token saved successfully');
      } catch (error) {
        console.error('Error saving reset token:', error);
      }
    }
    return {message:`Si l\'utilisateur existe, un email de réinitialisation a été envoyé.`} 
  }

  generateCustomToken() {
    const part1 = cuid(); // CUID pour la première partie
    const part2 = randomBytes(5).toString('hex'); // Chaîne aléatoire pour la deuxième partie
    const part3 = cuid(); // CUID pour la troisième partie
    return `${part1}-${part2}-${part3}`;
  }
}
