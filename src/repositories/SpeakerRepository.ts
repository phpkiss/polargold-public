import { IRepository } from './IRepository';
import { Speaker } from '../models';
import { DatabaseConnection } from '../utils/DatabaseConnection';

export class SpeakerRepository implements IRepository<Speaker> {
  constructor(private db: DatabaseConnection) {}

  async findById(id: number): Promise<Speaker | null> {
    const result = await this.db.query('SELECT * FROM speakers WHERE id = ?', [id]);
    if (result[0]) {
      result[0].topics = JSON.parse(result[0].topics);
    }
    return result[0] || null;
  }

  async findAll(): Promise<Speaker[]> {
    const speakers = await this.db.query('SELECT * FROM speakers');
    return speakers.map(speaker => ({ ...speaker, topics: JSON.parse(speaker.topics) }));
  }

  async create(speaker: Speaker): Promise<Speaker> {
    const result = await this.db.run(
      'INSERT INTO speakers (firstName, lastName, topics) VALUES (?, ?, ?)',
      [speaker.firstName, speaker.lastName, JSON.stringify(speaker.topics)]
    );
    return { ...speaker, id: result.lastID };
  }

  async update(id: number, speaker: Speaker): Promise<Speaker> {
    await this.db.run(
      'UPDATE speakers SET firstName = ?, lastName = ?, topics = ? WHERE id = ?',
      [speaker.firstName, speaker.lastName, JSON.stringify(speaker.topics), id]
    );
    return { ...speaker, id };
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.run('DELETE FROM speakers WHERE id = ?', [id]);
    return result.changes > 0;
  }
}
