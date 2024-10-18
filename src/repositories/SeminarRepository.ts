import { IRepository } from './IRepository';
import { Seminar } from '../models';
import { DatabaseConnection } from '../utils/DatabaseConnection';

export class SeminarRepository implements IRepository<Seminar> {
  constructor(private db: DatabaseConnection) {}

  async findById(id: number): Promise<Seminar | null> {
    const result = await this.db.query('SELECT * FROM seminars WHERE id = ?', [id]);
    return result[0] || null;
  }

  async findAll(): Promise<Seminar[]> {
    return this.db.query('SELECT * FROM seminars');
  }

  async create(seminar: Seminar): Promise<Seminar> {
    const result = await this.db.run(
      'INSERT INTO seminars (title, lectureTypeId, dateFrom, dateTo, locationId, description, metaDescription, speakerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [seminar.title, seminar.lectureTypeId, seminar.dateFrom, seminar.dateTo, seminar.locationId, seminar.description, seminar.metaDescription, seminar.speakerId]
    );
    return { ...seminar, id: result.lastID };
  }

  async update(id: number, seminar: Seminar): Promise<Seminar> {
    await this.db.run(
      'UPDATE seminars SET title = ?, lectureTypeId = ?, dateFrom = ?, dateTo = ?, locationId = ?, description = ?, metaDescription = ?, speakerId = ? WHERE id = ?',
      [seminar.title, seminar.lectureTypeId, seminar.dateFrom, seminar.dateTo, seminar.locationId, seminar.description, seminar.metaDescription, seminar.speakerId, id]
    );
    return { ...seminar, id };
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.run('DELETE FROM seminars WHERE id = ?', [id]);
    return result.changes > 0;
  }
}
