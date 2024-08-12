import { SeminarService } from "./SeminarService";

export class SeminarSerializer {

  constructor(public seminarItems: any) {
  }

  get convertedSeminarItems(): any {
    return this.seminarItems.map(
      (seminarItem: any) => new SeminarService(seminarItem).createSeminar()
    );
  }
}
