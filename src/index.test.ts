import { SeminarService } from "./services/SeminarService";
import { CONVERTED_SEMINAR_ITEMS, RAW_SEMINAR_ITEMS } from "./testData/index";
import { AddressRepository, LectureTypeRepository, SpeakerRepository, SeminarRepository } from "./repositories";
import { DatabaseConnection } from "./utils/DatabaseConnection";
import { DatabaseSeeder } from "./seeders/DatabaseSeeder";

describe("Conversion tests", () => {
  let seminarService: SeminarService;
  let db: DatabaseConnection;

  beforeAll(async () => {
    db = await DatabaseConnection.getInstance();
    
    const seeder = new DatabaseSeeder(db);
    await seeder.seed();

    const addressRepository = new AddressRepository(db);
    const lectureTypeRepository = new LectureTypeRepository(db);
    const speakerRepository = new SpeakerRepository(db);
    const seminarRepository = new SeminarRepository(db);

    seminarService = new SeminarService(
      seminarRepository,
      addressRepository,
      lectureTypeRepository,
      speakerRepository
    );
  });

  test("Correct seminar item conversion (single)", async () => {
    const convertedSeminar = await seminarService.convertSeminar(RAW_SEMINAR_ITEMS[0]);
    expect(convertedSeminar).toStrictEqual(CONVERTED_SEMINAR_ITEMS[0]);
  });

  test("Correct seminar item conversion (multiple)", async () => {
    const convertedSeminars = await seminarService.convertAllSeminars();
    expect(convertedSeminars).toStrictEqual(CONVERTED_SEMINAR_ITEMS);
  });
});
