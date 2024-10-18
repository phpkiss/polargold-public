import { DatabaseConnection } from './utils/DatabaseConnection';
import { DatabaseSeeder } from './seeders/DatabaseSeeder';
import { AddressRepository, LectureTypeRepository, SpeakerRepository, SeminarRepository } from './repositories';
import { SeminarService } from './services/SeminarService';

async function main() {
  const db = await DatabaseConnection.getInstance();
  
  const seeder = new DatabaseSeeder(db);
  await seeder.seed();

  const addressRepository = new AddressRepository(db);
  const lectureTypeRepository = new LectureTypeRepository(db);
  const speakerRepository = new SpeakerRepository(db);
  const seminarRepository = new SeminarRepository(db);

  const seminarService = new SeminarService(
    seminarRepository,
    addressRepository,
    lectureTypeRepository,
    speakerRepository
  );

  const convertedSeminars = await seminarService.convertAllSeminars();

  console.log(JSON.stringify(convertedSeminars, null, 2));
}

main().catch(console.error);
