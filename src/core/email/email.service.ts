import { Injectable, Logger } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { AppConfig } from '../config/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly mg;
  private readonly from;

  constructor(private readonly appConfig: AppConfig) {
    this.mg = new MailerSend({ apiKey: appConfig.env.MAILERSEND_API_KEY });
    this.from = new Sender(`updates@${appConfig.env.MAILERSEND_DOMAIN}`, 'Weather API');
  }

  async sendEmail(to: string, subject: string, content: string) {
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
