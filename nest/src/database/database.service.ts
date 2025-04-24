import { Injectable, OnModuleDestroy } from '@nestjs/common';
import knex, { Knex } from 'knex';
import config from './knex-config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  public knex: Knex;

  constructor() {
    this.knex = knex(config.development);
  }

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}
