import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(to: string, subject: string, content: string) {
    console.log({ to, subject, content });
  }
}
