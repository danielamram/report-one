export interface ReportOption {
  name: string,
  icon: string,
  id: number
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
    id: ReportEnum.ARRIVING
  },
  {
    name: 'חו"ל',
    icon: 'ios-plane',
    id: ReportEnum.ABROAD
  },
  {
    name: 'מחוץ ליחידה',
    icon: 'happy',
    id: ReportEnum.OUT_OF_OFFICE
  },
  {
    name: 'קורס',
    icon: 'book',
    id: ReportEnum.COURSE
  },
  {
    name: 'חופש',
    icon: 'card',
    id: ReportEnum.VACATION
  },
  {
    name: 'מחלה',
    icon: 'medkit',
    id: ReportEnum.SICKNESS
  },
];
