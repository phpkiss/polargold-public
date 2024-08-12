import { SeminarService } from "./classes/SeminarService";
import { CONVERTED_SEMINAR_ITEMS, RAW_SEMINAR_ITEMS } from "./testData";
import { SeminarSerializer } from "./classes/SeminarSerializer";

// If you mess with this, you will fail the challenge
describe("Conversion tests", () => {
  test("Correct seminar item conversion (single)", () => {
    const convertedSeminar = new SeminarService(RAW_SEMINAR_ITEMS[0]);

    expect(convertedSeminar.createSeminar()).toStrictEqual(CONVERTED_SEMINAR_ITEMS[0]);
  });


  test("Correct seminar item conversion (multiple)", () => {
    const convertedSeminars = new SeminarSerializer(RAW_SEMINAR_ITEMS);

    expect(convertedSeminars.convertedSeminarItems).toStrictEqual(CONVERTED_SEMINAR_ITEMS);
  });

});

