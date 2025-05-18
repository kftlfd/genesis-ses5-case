import { Controller, Post, Query } from '@nestjs/common';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  async sendTestEmail(@Query('to') to: string) {
    const sent = await this.emailService.sendEmail(
      to,
      'Test email',
      `
        <h1>Hello</h1>
        <p>this is a test email</p>
      `,
    );

    return { message: sent ? 'Email sent' : 'Error' };
  }
}
