import { DatabaseConnection } from '../utils/DatabaseConnection';
import { Address, LectureType, Speaker, Seminar } from '../models';

export class DatabaseSeeder {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async seed(): Promise<void> {
    await this.createTables();
    await this.seedAddresses();
    await this.seedLectureTypes();
    await this.seedSpeakers();
    await this.seedSeminars();
  }

  private async createTables(): Promise<void> {
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        street TEXT,
        houseNumber TEXT,
        zipCode TEXT,
        city TEXT
      )
    `);

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS lecture_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        displayName TEXT
      )
    `);

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS speakers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        topics TEXT
      )
    `);

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS seminars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        lectureTypeId INTEGER,
        dateFrom TEXT,
        dateTo TEXT,
        locationId INTEGER,
        description TEXT,
        metaDescription TEXT,
        speakerId INTEGER,
        FOREIGN KEY (lectureTypeId) REFERENCES lecture_types(id),
        FOREIGN KEY (locationId) REFERENCES addresses(id),
        FOREIGN KEY (speakerId) REFERENCES speakers(id)
      )
    `);
  }

  private async seedAddresses(): Promise<void> {
    const addresses: Address[] = [
      {
        id: 1,
        name: "Musterort am Musterfluss",
        street: "Musterstraße",
        houseNumber: "55",
        zipCode: "99999",
        city: "Musterstadt",
      },
      {
        id: 2,
        name: "Hotel Brutalismus",
        street: "Betonstraße",
        houseNumber: "44",
        zipCode: "88888",
        city: "Betonstadt",
      }
    ];

    for (const address of addresses) {
      await this.db.run(
        `INSERT INTO addresses (id, name, street, houseNumber, zipCode, city) VALUES (?, ?, ?, ?, ?, ?)`,
        [address.id, address.name, address.street, address.houseNumber, address.zipCode, address.city]
      );
    }
  }

  private async seedLectureTypes(): Promise<void> {
    const lectureTypes: LectureType[] = [
      {
        id: 1,
        name: "online-seminar",
        displayName: "Online-Seminar"
      },
      {
        id: 2,
        name: "presence-seminar",
        displayName: "Präsenz-Seminar"
      }
    ];

    for (const lectureType of lectureTypes) {
      await this.db.run(
        `INSERT INTO lecture_types (id, name, displayName) VALUES (?, ?, ?)`,
        [lectureType.id, lectureType.name, lectureType.displayName]
      );
    }
  }

  private async seedSpeakers(): Promise<void> {
    const speakers: Speaker[] = [
      {
        id: 1,
        firstName: "Max",
        lastName: "Mustermann",
        topics: ["BR"]
      },
      {
        id: 2,
        firstName: "Erika",
        lastName: "Mustermann",
        topics: ["Web"]
      }
    ];

    for (const speaker of speakers) {
      await this.db.run(
        `INSERT INTO speakers (id, firstName, lastName, topics) VALUES (?, ?, ?, ?)`,
        [speaker.id, speaker.firstName, speaker.lastName, JSON.stringify(speaker.topics)]
      );
    }
  }

  private async seedSeminars(): Promise<void> {
    const seminars: Seminar[] = [
      {
        title: "Mein erstes Seminar",
        lectureTypeId: 2,
        dateFrom: "2024-02-13",
        dateTo: "2024-02-19",
        locationId: 1,
        description: "Hier steht eine Beschreibung des Seminars",
        metaDescription: null,
        speakerId: 1
      },
      {
        title: "Mein zweites Seminar",
        lectureTypeId: 1,
        dateFrom: "2024-03-13",
        dateTo: "2024-03-19",
        locationId: 2,
        description: "Hier steht eine Beschreibung des Seminars",
        metaDescription: "Sogar eine Meta-Beschreibung",
        speakerId: 2
      },
      {
        title: "Mein drittes Seminar",
        lectureTypeId: 2,
        dateFrom: "2024-04-13",
        dateTo: "2024-04-19",
        locationId: 2,
        description: "Hier steht eine Beschreibung des Seminars",
        metaDescription: "Sogar eine Meta-Beschreibung",
        speakerId: 2
      }
    ];

    for (const seminar of seminars) {
      await this.db.run(
        `INSERT INTO seminars (title, lectureTypeId, dateFrom, dateTo, locationId, description, metaDescription, speakerId) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [seminar.title, seminar.lectureTypeId, seminar.dateFrom, seminar.dateTo, seminar.locationId, seminar.description, seminar.metaDescription, seminar.speakerId]
      );
    }
  }
}
