import type { GenericSeminarItem, SeminarItemPayload } from "../types";
import { LectureTypeId } from "../constants";

export const RAW_SEMINAR_ITEMS: SeminarItemPayload[] = [
  {
    title: "Mein erstes Seminar",
    lectureTypeId: LectureTypeId.PRESENCE_SEMINAR,
    dateFrom: "2024-02-13",
    dateTo: "2024-02-19",
    locationId: 1,
    description: "Hier steht eine Beschreibung des Seminars",
    metaDescription: null,
    speakerId: 1
  },
  {
    title: "Mein zweites Seminar",
    lectureTypeId: LectureTypeId.ONLINE_SEMINAR,
    dateFrom: "2024-03-13",
    dateTo: "2024-03-19",
    locationId: 2,
    description: "Hier steht eine Beschreibung des Seminars",
    metaDescription: "Sogar eine Meta-Beschreibung",
    speakerId: 2
  },
  {
    title: "Mein drittes Seminar",
    lectureTypeId: LectureTypeId.PRESENCE_SEMINAR,
    dateFrom: "2024-04-13",
    dateTo: "2024-04-19",
    locationId: 2,
    description: "Hier steht eine Beschreibung des Seminars",
    metaDescription: "Sogar eine Meta-Beschreibung",
    speakerId: 2
  }
];

export const CONVERTED_SEMINAR_ITEMS: GenericSeminarItem[] = [
  {
    "title": "Mein erstes Seminar",
    "dateFrom": "13.02.2024",
    "dateTo": "19.02.2024",
    "location": {
      "address": {
        "id": 1,
        "name": "Musterort am Musterfluss",
        "street": "Musterstraße",
        "houseNumber": "55",
        "zipCode": "99999",
        "city": "Musterstadt"
      },
      "label": "Musterort am Musterfluss"
    },
    "description": "Hier steht eine Beschreibung des Seminars",
    "metaDescription": null,
    "speaker": {
      "person": {
        "id": 1,
        "firstName": "Max",
        "lastName": "Mustermann",
        "topics": [
          "BR"
        ]
      },
      "status": "requested"
    },
    "lectureType": {
      "id": 2,
      "name": "presence-seminar",
      "displayName": "Präsenz-Seminar"
    }
  },
  {
    "title": "Mein zweites Seminar",
    "dateFrom": "13.03.2024",
    "dateTo": "19.03.2024",
    "location": {
      "address": null,
      "label": "Online-Seminar"
    },
    "description": "Hier steht eine Beschreibung des Seminars",
    "metaDescription": "Sogar eine Meta-Beschreibung",
    "speaker": {
      "person": {
        "id": 2,
        "firstName": "Erika",
        "lastName": "Mustermann",
        "topics": [
          "Web"
        ]
      },
      "status": "requested"
    },
    "lectureType": {
      "id": 1,
      "name": "online-seminar",
      "displayName": "Online-Seminar"
    }
  },
  {
    "title": "Mein drittes Seminar",
    "dateFrom": "13.04.2024",
    "dateTo": "19.04.2024",
    "location": {
      "address": {
        "id": 2,
        "name": "Hotel Brutalismus",
        "street": "Betonstraße",
        "houseNumber": "44",
        "zipCode": "88888",
        "city": "Betonstadt"
      },
      "label": "Hotel Brutalismus"
    },
    "description": "Hier steht eine Beschreibung des Seminars",
    "metaDescription": "Sogar eine Meta-Beschreibung",
    "speaker": {
      "person": {
        "id": 2,
        "firstName": "Erika",
        "lastName": "Mustermann",
        "topics": [
          "Web"
        ]
      },
      "status": "requested"
    },
    "lectureType": {
      "id": 2,
      "name": "presence-seminar",
      "displayName": "Präsenz-Seminar"
    }
  }
];
