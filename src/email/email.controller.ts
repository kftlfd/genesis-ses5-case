import { Controller, Post, Query } from '@nestjs/common';

import { AdminRoute } from '@/core/decorators/admin-route.decorator';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  @AdminRoute()
  async sendTestEmail(@Query('to') to: string) {
    const sent = await this.emailService.sendTestEmail(to);

    return { message: sent ? 'Email sent' : 'Error' };
  }
}
