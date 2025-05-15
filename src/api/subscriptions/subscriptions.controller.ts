import {
  Body,
  Controller,
  Get,
  HttpStatus,
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

@Controller('api')
export class SubscriptionsController {
  constructor(private readonly subsService: SubscriptionsService) {}

  @Post('subscribe')
  @UseInterceptors(NoFilesInterceptor())
  @UsePipes(ZodValidationPipe)
  async createSubscription(@Body() body: CreateSubDto, @Res() res: Response) {
    const sub = await this.subsService.getSub(body.email);

    if (sub) {
      return res.status(HttpStatus.CONFLICT).send({ message: 'Email already subscribed' });
    }

    await this.subsService.createSub(body);

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Subscription successful. Confirmation email sent.' });
  }

  @Get('subs')
  getAllSubs() {
    return this.subsService.getAllSubs();
  }
}
