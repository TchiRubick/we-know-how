import { db } from "@/packages/db";

export type Connection = typeof db;

export class Core {
  protected db: Connection;

  constructor(ctx?: Connection) {
    if (ctx) {
      this.db = ctx;
      return;
    }

    this.db = db;
  }
}
