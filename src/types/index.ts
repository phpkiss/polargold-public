export interface SeminarSpeakerPerson {
  id: number;
  firstName: string;
  lastName: string;
  topics: string[];
}

export interface SeminarSpeaker {
  status: SeminarSpeakerStatus,
  person: SeminarSpeakerPerson
}

export interface SeminarLocationAddress {
  id: number
  name: string
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
}

export interface SeminarLocation {
  address: SeminarLocationAddress | null
  label: string
}

export type SeminarSpeakerStatus = "requested" | "booked" | "cancelled"
export type SeminarLectureTypeName = "online-seminar" | "presence-seminar"
export type SeminarLectureTypeDisplayName = "Online-Seminar" | "Präsenz-Seminar"

export interface SeminarLectureType {
  id: number
  name: SeminarLectureTypeName
  displayName: SeminarLectureTypeDisplayName
}


export interface GenericSeminarItem {
  title: string;
  lectureType: SeminarLectureType;
  dateFrom: string;
  dateTo: string;
  location: SeminarLocation;
  description: string;
  metaDescription: null | string;
  speaker: SeminarSpeaker
}

export interface SeminarItemPayload {
  title: string;
  lectureTypeId: number;
  dateFrom: string;
  dateTo: string;
  locationId: number;
  description: string;
  metaDescription: null | string;
  speakerId: number
}
