import { SeminarSerializer } from "./classes/SeminarSerializer";
import { RAW_SEMINAR_ITEMS } from "./testData";
import util from "util";

const convertedSeminars: SeminarSerializer = new SeminarSerializer(RAW_SEMINAR_ITEMS);

console.log(util.inspect(convertedSeminars.convertedSeminarItems, {
  showHidden: false,
  depth: 4,
  colors: true
}));
