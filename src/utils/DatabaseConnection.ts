import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private db: Database | null = null;

  private constructor() {}

  public static async getInstance(): Promise<DatabaseConnection> {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      await DatabaseConnection.instance.initialize();
    }
    return DatabaseConnection.instance;
  }

  private async initialize(): Promise<void> {
    this.db = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    });
  }

  public async query(sql: string, params: any[] = []): Promise<any> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db.all(sql, params);
  }

  public async run(sql: string, params: any[] = []): Promise<any> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db.run(sql, params);
  }
}
