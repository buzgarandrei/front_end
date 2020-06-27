import {FacilityResponse} from './FacilityResponse';

export class SearchResponse {

  idRoom: number;
  total: number;
  roomDescription: string;
  roomFacilities: FacilityResponse[];
  hotelFacilities: FacilityResponse[];
  startDate: string;
  endDate: string;
  hotelName: string;
  hotelDescription: string;
  roomAvailability: string;
}
