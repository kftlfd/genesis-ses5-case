import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { EmailService } from '@/email/email.service';
import { UpdateFrequency } from '@/core/db/db.schema';
import { WeatherReport, WeatherService } from '@/api/weather/weather.service';

import { SubscriptionsService } from './subscriptions.service';

@Injectable()
export class SubscriptionsCronService {
  private readonly logger = new Logger(SubscriptionsCronService.name);

  constructor(
    private readonly subsService: SubscriptionsService,
    private readonly weatherService: WeatherService,
    private readonly emailService: EmailService,
  ) {}

  @Cron('0 0 * * * *')
  async sendHourlyUpdates() {
    return this.sendUpdates('hourly');
  }

  @Cron('0 30 12 * * *')
  async sendDailyUpdates() {
    return this.sendUpdates('daily');
  }

  private async sendUpdates(freq: UpdateFrequency) {
    const subs = await this.subsService.getSubsWithFrequency(freq);
    const reports = new Map<string, WeatherReport | null>();
    const now = new Date().toISOString();

    for (const sub of subs) {
      try {
        if (!reports.has(sub.city)) {
          const report = await this.weatherService.getWeather(sub.city);
          reports.set(sub.city, report);
        }
        const content = reports.get(sub.city) ?? null;

        const unsubToken = sub.unsubToken;

        await this.emailService.sendWeatherUpdateEmail({
          to: sub.email,
          timestamp: now,
          city: sub.city,
          frequency: freq,
          report: content,
          unsubToken: unsubToken,
        });
      } catch (err) {
        this.logger.log('sendUpdates', sub, err);
      }
    }
  }
}
