import { IRepository } from './IRepository';
import { Address } from '../models';
import { DatabaseConnection } from '../utils/DatabaseConnection';

export class AddressRepository implements IRepository<Address> {
  constructor(private db: DatabaseConnection) {}

  async findById(id: number): Promise<Address | null> {
    const result = await this.db.query('SELECT * FROM addresses WHERE id = ?', [id]);
    return result[0] || null;
  }

  async findAll(): Promise<Address[]> {
    return this.db.query('SELECT * FROM addresses');
  }

  async create(address: Address): Promise<Address> {
    const result = await this.db.run(
      'INSERT INTO addresses (name, street, houseNumber, zipCode, city) VALUES (?, ?, ?, ?, ?)',
      [address.name, address.street, address.houseNumber, address.zipCode, address.city]
    );
    return { ...address, id: result.lastID };
  }

  async update(id: number, address: Address): Promise<Address> {
    await this.db.run(
      'UPDATE addresses SET name = ?, street = ?, houseNumber = ?, zipCode = ?, city = ? WHERE id = ?',
      [address.name, address.street, address.houseNumber, address.zipCode, address.city, id]
    );
    return { ...address, id };
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.run('DELETE FROM addresses WHERE id = ?', [id]);
    return result.changes > 0;
  }
}
