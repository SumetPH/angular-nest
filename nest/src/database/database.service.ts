import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnModuleInit {
  public knex: Knex;

  constructor() {
    this.knex = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
    });
  }

  async onModuleInit() {
    const tableName = 'user';

    const checkTableExists = await this.knex.schema.hasTable(tableName);
    if (!checkTableExists) {
      await this.knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(this.knex.fn.now());
        table.timestamp('updated_at').defaultTo(this.knex.fn.now());
      });
    }
  }

  async onModuleDestroy() {
    await this.knex.destroy();
  }
}
