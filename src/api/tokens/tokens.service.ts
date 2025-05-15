import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { TokenModel, tokensTable, TokenType } from 'src/core/db/db.schema';
import { DBService } from 'src/core/db/db.service';

@Injectable()
export class TokensService {
  constructor(private readonly dbService: DBService) {}

  async createToken(subscriptionId: number, tokenType: TokenType) {
    const [token] = await this.dbService.db
      .insert(tokensTable)
      .values({ subscription: subscriptionId, type: tokenType })
      .$returningId();
    return token;
  }

  async getTokenData(token: string, tokenType: TokenType): Promise<TokenModel | null> {
    const [t] = await this.dbService.db
      .select()
      .from(tokensTable)
      .where(and(eq(tokensTable.token, token), eq(tokensTable.type, tokenType)));

    if (!t) {
      return null;
    }

    return t;
  }

  async getOrCreateUnsubToken(subscriptionId: number) {
    const [token] = await this.dbService.db
      .select()
      .from(tokensTable)
      .where(and(eq(tokensTable.subscription, subscriptionId), eq(tokensTable.type, 'unsub')));

    if (token) {
      return { token: token.token };
    }

    console.log('unsub token not found, creating new one');

    const newToken = await this.createToken(subscriptionId, 'unsub');
    return { token: newToken.token };
  }
}
