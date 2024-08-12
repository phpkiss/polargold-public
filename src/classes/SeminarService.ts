import dayjs from "dayjs";
// eslint-disable-next-line camelcase
export const adrs: any = [
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
// eslint-disable-next-line camelcase
export const ss_p: any = [
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
// eslint-disable-next-line camelcase
export const l_t: any = [
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

export class SeminarService {
  constructor(public pl: any) {
  }

  loc(): any {
    const addr: any =
      adrs.filter((l: any): any =>
        l.id === this.pl.locationId);

    return this.pl.lectureTypeId == 1 ? {
      address: null,
      label: "Online-Seminar"
    } : {
      address: addr[0],
      label: addr[0].name
    };
  }

  spk(): any {
    return {
      // eslint-disable-next-line camelcase
      person: ss_p.filter((speaker: any): any => speaker.id == this.pl.speakerId)[0],
      status: "requested"
    };
  }

  createSeminar(): any {
    return {
      title: this.pl.title,
      dateFrom: dayjs(this.pl.dateFrom).format("DD.MM.YYYY"),
      dateTo: dayjs(this.pl.dateTo).format("DD.MM.YYYY"),
      location: this.loc(),
      description: this.pl.description,
      metaDescription: this.pl.metaDescription,
      speaker: this.spk(),
      // eslint-disable-next-line camelcase
      lectureType: l_t.filter((l): any => l.id == this.pl.lectureTypeId)[0]
    };
  }
}
