import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  sendEmail(to: string, subject: string, content: string) {
    this.logger.log({ to, subject, content });
  }
}
