import { GenericSeminarItem } from '../types';
import { Seminar } from '../models';

export interface ISeminarService {
  convertSeminar(seminar: Seminar): Promise<GenericSeminarItem>;
  convertAllSeminars(): Promise<GenericSeminarItem[]>;
}
