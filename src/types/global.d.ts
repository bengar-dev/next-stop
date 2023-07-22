export interface TamRes {
  course: string;
  stop_code: string;
  stop_id: string;
  stop_name: string;
  route_short_name: string;
  trip_headsign: string;
  direction_id: string;
  departure_time: string;
  is_theorical: string;
  delay_sec: string;
  dest_ar_code: string;
  course_sae: string;
}

export interface TamResFormatData extends TamRes {
  delay: NextDepartureInfo;
}

export interface NextDepartureInfo {
  departureTime: Date;
  timeRemainingInMinutes: number;
}
