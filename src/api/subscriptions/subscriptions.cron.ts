import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/core/email/email.service';
import { UpdateFrequency } from 'src/core/db/db.schema';
import { SubscriptionsService } from './subscriptions.service';
import { WeatherReport, WeatherService } from '../weather/weather.service';

@Injectable()
export class SubscriptionsCronService {
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

        const email = {
          content,
          unsubToken,
        };

        this.emailService.sendEmail(
          sub.email,
          `${sub.city} weather ${freq} update: ${now}`,
          JSON.stringify(email),
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
}
