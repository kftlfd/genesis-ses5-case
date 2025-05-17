import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createSubscriptionReqBodySchema } from 'src/api/subscriptions/dto/create-sub.dto';
import { SubscriptionsService } from 'src/api/subscriptions/subscriptions.service';

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

    let response = 'Subscribed successfully';

    if (!inp.success) {
      response = inp.error.flatten().formErrors.join('. ');
    } else {
      try {
        const sub = await this.subsService.getSub(inp.data.email);
        if (sub) {
          response = 'Email already subbed';
        } else {
          await this.subsService.createSub(inp.data);
        }
      } catch {
        response = 'Server error, please try again later';
      }
    }

    return res.render('subscriptions/response', {
      message: response,
      layout: false,
    });
  }

  @Get('confirm/:token')
  async confirmSub(@Param('token') token: string, @Res() res: Response) {
    const confirmed = await this.subsService.confirmSub(token);

    const response = confirmed ? 'Sub confirmed' : 'invalid token';

    return res.render('subscriptions/token-response', { message: response, layout: 'index' });
  }

  @Get('unsub/:token')
  async removeSub(@Param('token') token: string, @Res() res: Response) {
    const unsubed = await this.subsService.removeSub(token);

    const response = unsubed ? 'Unsubed' : 'invalid token';

    return res.render('subscriptions/token-response', { message: response, layout: 'index' });
  }
}
