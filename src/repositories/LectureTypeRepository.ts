import { IRepository } from './IRepository';
import { LectureType } from '../models';
import { DatabaseConnection } from '../utils/DatabaseConnection';

export class LectureTypeRepository implements IRepository<LectureType> {
  constructor(private db: DatabaseConnection) {}

  async findById(id: number): Promise<LectureType | null> {
    const result = await this.db.query('SELECT * FROM lecture_types WHERE id = ?', [id]);
    return result[0] || null;
  }

  async findAll(): Promise<LectureType[]> {
    return this.db.query('SELECT * FROM lecture_types');
  }

  async create(lectureType: LectureType): Promise<LectureType> {
    const result = await this.db.run(
      'INSERT INTO lecture_types (name, displayName) VALUES (?, ?)',
      [lectureType.name, lectureType.displayName]
    );
    return { ...lectureType, id: result.lastID };
  }

  async update(id: number, lectureType: LectureType): Promise<LectureType> {
    await this.db.run(
      'UPDATE lecture_types SET name = ?, displayName = ? WHERE id = ?',
      [lectureType.name, lectureType.displayName, id]
    );
    return { ...lectureType, id };
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.run('DELETE FROM lecture_types WHERE id = ?', [id]);
    return result.changes > 0;
  }
}
