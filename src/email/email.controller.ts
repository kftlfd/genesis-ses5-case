import { Controller, Post, Query } from '@nestjs/common';

import { AdminRoute } from '@/core/decorators/admin-route.decorator';
import { WeatherReport } from '@/api/weather/weather.service';

import { EmailService } from './email.service';

@Controller('email')
@AdminRoute()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  async sendTestEmail(@Query('to') to: string) {
    return this.send(this.emailService.sendTestEmail(to));
  }

  @Post('test-confirm')
  async sendSubConfirmationEmail(@Query('to') to: string) {
    return this.send(
      this.emailService.sendConfirmSubEmail({
        to,
        city: 'City',
        frequency: 'daily',
        confirmToken: '1234-test-confirm-token',
      }),
    );
  }

  @Post('test-report')
  async sendWeatherReportEmail(@Query('to') to: string, @Query('city') city: string) {
    const now = new Date().toISOString();

    const report: WeatherReport | null =
      city && city !== 'Null'
        ? {
            temperature: 23.4,
            humidity: 56,
            description: "it's ok",
          }
        : null;

    return this.send(
      this.emailService.sendWeatherUpdateEmail({
        to,
        timestamp: now,
        city,
        frequency: 'hourly',
        report,
        unsubToken: '1234-test-unsub-token',
      }),
    );
  }

  private async send(emailSent: Promise<boolean>) {
    return { message: (await emailSent) ? 'Email sent' : 'Error' };
  }
}
