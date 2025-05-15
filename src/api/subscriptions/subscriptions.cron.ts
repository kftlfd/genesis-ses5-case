import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SubscriptionsCronService {
  constructor(private readonly subsService: SubscriptionsService) {}

  @Cron('*/10 * * * * *')
  async sendHourlyUpdates() {
    const subs = await this.subsService.getSubsWithFrequency('hourly');
    console.log(
      'hourly updates:',
      subs.map((s) => [s.email, s.city, s.frequency]),
    );
  }

  @Cron('*/15 * * * * *')
  async sendDailyUpdates() {
    const subs = await this.subsService.getSubsWithFrequency('daily');
    console.log(
      'daily updates:',
      subs.map((s) => [s.email, s.city, s.frequency]),
    );
  }
}
