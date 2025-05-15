import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'nestjs-zod';
import { Response } from 'express';
import { CreateSubDto } from './dto/create-sub.dto';
import { SubscriptionsService } from './subscriptions.service';
import { EmailService } from 'src/core/email/email.service';
import { TokensService } from '../tokens/tokens.service';

@Controller('api')
export class SubscriptionsController {
  constructor(
    private readonly subsService: SubscriptionsService,
    private readonly tokensService: TokensService,
    private readonly emailService: EmailService,
  ) {}

  @Post('subscribe')
  @UseInterceptors(NoFilesInterceptor())
  @UsePipes(ZodValidationPipe)
  async createSubscription(@Body() body: CreateSubDto, @Res() res: Response) {
    const sub = await this.subsService.getSub(body.email);
    if (sub) {
      throw new ConflictException('Email already subscribed');
    }

    const newSub = await this.subsService.createSub(body);

    const { token: confirmToken } = await this.tokensService.createToken(newSub.id, 'confirm-sub');

    this.emailService.sendEmail(
      body.email,
      'Confirm subscription',
      `follow this link to confirm sub: http://localhost:8000/api/confirm/${confirmToken}`,
    );

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Subscription successful. Confirmation email sent.' });
  }

  @Get('confirm/:token')
  async confirmSub(@Param('token') token: string) {
    if (!token) {
      throw new BadRequestException('Invalid token');
    }

    const tokenData = await this.tokensService.getTokenData(token, 'confirm-sub');
    if (!tokenData) {
      throw new NotFoundException('Token not found');
    }

    await this.subsService.confirmSub(tokenData);

    await this.tokensService.createToken(tokenData.subscription, 'unsub');

    return { message: 'Subscription confirmed successfully' };
  }

  @Get('unsubscribe/:token')
  async removeSub(@Param('token') token: string) {
    if (!token) {
      throw new BadRequestException('Invalid token');
    }

    const tokenData = await this.tokensService.getTokenData(token, 'unsub');
    if (!tokenData) {
      throw new NotFoundException('Token not found');
    }

    await this.subsService.removeSub(tokenData);

    return { message: 'Unsubscribed successfully' };
  }

  @Get('subs')
  getAllSubs() {
    return this.subsService.getAllSubs();
  }
}
