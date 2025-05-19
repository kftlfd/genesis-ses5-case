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

import { AdminRoute } from '@/core/decorators/admin-route.decorator';
import { EmailService } from '@/core/email/email.service';

import { CreateSubDto } from './dto/create-sub.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('api')
export class SubscriptionsController {
  constructor(
    private readonly subsService: SubscriptionsService,
    private readonly emailService: EmailService,
  ) {}

  @Get('subs')
  @AdminRoute()
  getAllSubs() {
    return this.subsService.getAllSubs();
  }

  @Post('subscribe')
  @UseInterceptors(NoFilesInterceptor())
  @UsePipes(ZodValidationPipe)
  async createSubscription(@Body() body: CreateSubDto, @Res() res: Response) {
    const sub = await this.subsService.getSub(body.email);
    if (sub) {
      throw new ConflictException('Email already subscribed');
    }

    const newSub = await this.subsService.createSub(body);

    await this.emailService.sendConfirmSubEmail({
      to: body.email,
      city: body.city,
      frequency: body.frequency,
      confirmToken: newSub.confirmToken,
    });

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Subscription successful. Confirmation email sent.' });
  }

  @Get('confirm/:token')
  async confirmSub(@Param('token') token: string) {
    if (token.length < 10) {
      throw new BadRequestException('Invalid token');
    }

    const confirmed = await this.subsService.confirmSub(token);
    if (!confirmed) {
      throw new NotFoundException('Token not found');
    }

    return { message: 'Subscription confirmed successfully' };
  }

  @Get('unsubscribe/:token')
  async removeSub(@Param('token') token: string) {
    if (token.length < 10) {
      throw new BadRequestException('Invalid token');
    }

    const unsubed = await this.subsService.removeSub(token);
    if (!unsubed) {
      throw new NotFoundException('Token not found');
    }

    return { message: 'Unsubscribed successfully' };
  }
}
