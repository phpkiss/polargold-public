export interface Seminar {
  id?: number;
  title: string;
  lectureTypeId: number;
  dateFrom: string;
  dateTo: string;
  locationId: number;
  description: string;
  metaDescription: string | null;
  speakerId: number;
}
