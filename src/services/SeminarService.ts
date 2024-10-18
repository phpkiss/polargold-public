import dayjs from 'dayjs';
import { ISeminarService } from './ISeminarService';
import { Seminar, Address, LectureType, Speaker } from '../models';
import { AddressRepository, LectureTypeRepository, SpeakerRepository, SeminarRepository } from '../repositories';
import { GenericSeminarItem, SeminarLectureType, SeminarLocation, SeminarSpeaker } from '../types';

export class SeminarService implements ISeminarService {
  constructor(
    private seminarRepository: SeminarRepository,
    private addressRepository: AddressRepository,
    private lectureTypeRepository: LectureTypeRepository,
    private speakerRepository: SpeakerRepository
  ) {}

  async convertSeminar(seminar: Seminar): Promise<GenericSeminarItem> {
    const [address, lectureType, speaker] = await Promise.all([
      this.addressRepository.findById(seminar.locationId),
      this.lectureTypeRepository.findById(seminar.lectureTypeId),
      this.speakerRepository.findById(seminar.speakerId)
    ]);

    if (!lectureType || !speaker) {
      throw new Error('Invalid seminar data');
    }

    return {
      title: seminar.title,
      dateFrom: dayjs(seminar.dateFrom).format('DD.MM.YYYY'),
      dateTo: dayjs(seminar.dateTo).format('DD.MM.YYYY'),
      location: this.getLocation(lectureType, address),
      description: seminar.description,
      metaDescription: seminar.metaDescription,
      speaker: this.getSpeaker(speaker),
      lectureType: this.getLectureType(lectureType)
    };
  }

  private getLocation(lectureType: LectureType, address: Address | null): SeminarLocation {
    if (lectureType.id === 1) {
      return {
        address: null,
        label: 'Online-Seminar'
      };
    }
    return {
      address: address ? {
        id: address.id,
        name: address.name,
        street: address.street,
        houseNumber: address.houseNumber,
        zipCode: address.zipCode,
        city: address.city
      } : null,
      label: address?.name || ''
    };
  }

  private getSpeaker(speaker: Speaker): SeminarSpeaker {
    return {
      person: {
        id: speaker.id,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        topics: speaker.topics
      },
      status: 'requested'
    };
  }

  private getLectureType(lectureType: LectureType): SeminarLectureType {
    return {
      id: lectureType.id,
      name: lectureType.name as SeminarLectureType['name'],
      displayName: lectureType.displayName as SeminarLectureType['displayName']
    };
  }

  async convertAllSeminars(): Promise<GenericSeminarItem[]> {
    const seminars = await this.seminarRepository.findAll();
    return Promise.all(seminars.map(seminar => this.convertSeminar(seminar)));
  }
}
