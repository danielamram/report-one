import {EventColor} from "./interfaces/calendar/calendar";
export interface ReportOption {
  name: string,
  icon: string,
  id: number,
  color:EventColor
}

export enum ReportEnum {
  ARRIVING,
  ABROAD,
  OUT_OF_OFFICE,
  COURSE,
  VACATION,
  SICKNESS,
}

export const ReportConfig: ReportOption[] = [
  {
    name: 'בדרך',
    icon: 'walk',
    id: ReportEnum.ARRIVING,
    color:{
      primary: '#ad2121',
      secondary: '#FAE3E3'
    }
  },
  {
    name: 'חו"ל',
    icon: 'cafe',
    id: ReportEnum.ABROAD,
    color:{
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    }
  },
  {
    name: 'מחוץ ליחידה',
    icon: 'happy',
    id: ReportEnum.OUT_OF_OFFICE,
    color:{
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  },
  {
    name: 'קורס',
    icon: 'book',
    id: ReportEnum.COURSE,
    color:{
      primary: '#31B027',
      secondary: '#FAE3E3'
    }
  },
  {
    name: 'חופש',
    icon: 'card',
    id: ReportEnum.VACATION,
    color:{
      primary: '#BD39A8',
      secondary: '#D1E8FF'
    }
  },
  {
    name: 'מחלה',
    icon: 'medkit',
    id: ReportEnum.SICKNESS,
    color:{
      primary: '#13D6A7',
      secondary: '#FDF1BA'
    }
  },
];
