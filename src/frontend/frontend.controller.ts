import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { createSubscriptionReqBodySchema } from '@/api/subscriptions/dto/create-sub.dto';
import { SubscriptionsService } from '@/api/subscriptions/subscriptions.service';

@Controller()
export class FrontendController {
  constructor(private readonly subsService: SubscriptionsService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.render('subscriptions/form', { layout: 'index' });
  }

  @Post('sub')
  async createSub(@Res() res: Response, @Req() req: Request) {
    const inp = createSubscriptionReqBodySchema.safeParse(req.body);

    let response = 'Unknown error';
    let status: 'ok' | 'err' = 'err';

    if (!inp.success) {
      response = inp.error.errors.map((err) => err.message).join(', ');
    } else {
      try {
        const sub = await this.subsService.getSub(inp.data.email);
        if (sub) {
          response = 'Email already subbed';
        } else {
          await this.subsService.createSub(inp.data);
          response = 'Subscribed successfully! Check your email to confirm subscription';
          status = 'ok';
        }
      } catch {
        response = 'Server error, please try again later';
      }
    }

    return res.render('subscriptions/form-response', {
      layout: false,
      message: response,
      status,
    });
  }

  @Get('confirm/:token')
  async confirmSub(@Param('token') token: string, @Res() res: Response) {
    const confirmed = await this.subsService.confirmSub(token);

    const response = confirmed ? 'Subscription confirmed!' : 'Invalid token';

    return res.render('subscriptions/token-response', { message: response, layout: 'index' });
  }

  @Get('unsub/:token')
  async removeSub(@Param('token') token: string, @Res() res: Response) {
    const unsubed = await this.subsService.removeSub(token);

    const response = unsubed ? 'Unsubscribed successfully.' : 'Invalid token';

    return res.render('subscriptions/token-response', { message: response, layout: 'index' });
  }
}
