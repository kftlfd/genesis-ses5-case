import { Injectable, Logger } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

import { AppConfig } from '@/core/config/config';
import { UpdateFrequency } from '@/core/db/db.schema';
import { WeatherReport } from '@/api/weather/weather.service';

function renderLink(link: string) {
  return `<a href="${link}">${link}</a>`;
}

function renderEmailFooter() {
  return `<br><hr>
<p>Weather API (c) 2025</p>`;
}

function renderConfirmEmail(freq: string, city: string, feLink: string, apiLink: string) {
  return `<h1>Confirm subscription to Weather API</h1>
<br>
<p>To confirm subscription and start receiving ${freq} updates for weather in "${city}" please follow this link:</p>
<p>${renderLink(feLink)}</p>
<br>
<p>Or use API link: ${renderLink(apiLink)}</p>
${renderEmailFooter()}`;
}

function renderWeatherReport(report: WeatherReport) {
  return `<p><b>Temperature:</b> ${report.temperature}</p>
<p><b>Humidity:</b> ${report.humidity}</p>
<p><b>Description</b> ${report.description}</p>`;
}

function renderWeatherReportEmail(
  city: string,
  timestamp: string,
  report: WeatherReport | null,
  unsubFELink: string,
  unsubAPILink: string,
) {
  return `<h1>Weather in "${city}": ${timestamp}</h1>
<br>
${report ? renderWeatherReport(report) : `<p><b>Unavailable</b></p>`}
<br>
<p>Unsubscribe: ${renderLink(unsubFELink)}</p>
<p>or using API: ${renderLink(unsubAPILink)}</p>
${renderEmailFooter()}`;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly mg;
  private readonly from;

  constructor(private readonly appConfig: AppConfig) {
    this.mg = new MailerSend({ apiKey: appConfig.env.MAILERSEND_API_KEY });
    this.from = new Sender(`updates@${appConfig.env.MAILERSEND_DOMAIN}`, 'Weather API');
  }

  sendConfirmSubEmail(arg: {
    to: string;
    city: string;
    frequency: UpdateFrequency;
    confirmToken: string;
  }) {
    const confirmFELink = `${this.appConfig.appBaseUrl}/confirm/${arg.confirmToken}`;
    const confirmAPILink = `${this.appConfig.appBaseUrl}/api/confirm/${arg.confirmToken}`;

    return this.sendEmail(
      arg.to,
      'Weather API: Confirm subscription',
      renderConfirmEmail(arg.frequency, arg.city, confirmFELink, confirmAPILink),
    );
  }

  sendWeatherUpdateEmail(arg: {
    to: string;
    timestamp: string;
    city: string;
    frequency: UpdateFrequency;
    report: WeatherReport | null;
    unsubToken: string;
  }) {
    const unsubFELink = `${this.appConfig.appBaseUrl}/unsub/${arg.unsubToken}`;
    const unsubAPILink = `${this.appConfig.appBaseUrl}/api/unsubscribe/${arg.unsubToken}`;

    return this.sendEmail(
      arg.to,
      `${arg.city} weather ${arg.frequency} update: ${arg.timestamp}`,
      renderWeatherReportEmail(arg.city, arg.timestamp, arg.report, unsubFELink, unsubAPILink),
    );
  }

  sendTestEmail(to: string) {
    return this.sendEmail(to, 'Test email', `<h1>Hello</h1><p>this is a test email</p>`);
  }

  private async sendEmail(to: string, subject: string, content: string) {
    try {
      const params = new EmailParams()
        .setFrom(this.from)
        .setTo([new Recipient(to)])
        .setSubject(subject)
        .setHtml(content);
      await this.mg.email.send(params);
      return true;
    } catch (err) {
      this.logger.error({ inp: { to, subject, content }, err });
      return false;
    }
  }
}
