// NOTE: AI利用を頭に置いたときに、ロジックを分離してテストしやすくすることが求められると感じる。
// そのうえで悩ましいのは、「そのロジック群をどこに置くのか？」かなとも感じる。一旦各features区切りで作成してみる
import {
  AttendanceTypeWithLabel,
  AttendanceTypeWithLabels,
} from "@/constants/attendance";
import { Attendance } from "@/orval/attendances";
import { addDays, endOfMonth, startOfMonth } from "date-fns";

export const getAttendanceTypeLabel = (
  id: AttendanceTypeWithLabel["id"] | undefined,
): AttendanceTypeWithLabel["label"] | undefined => {
  if (!id) return undefined;
  const attendance = AttendanceTypeWithLabels.find((a) => a.id === id);
  return attendance?.label;
};

export const generateCalendar = (currentMonth: Date): Date[] => {
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);

  const dates: Date[] = [];
  let date = startDate;
  while (date <= endDate) {
    dates.push(date);
    date = addDays(date, 1);
  }

  return dates;
};

export const getAttendancesSum = (attendances: Attendance[]): number => {
  // TODO: 合計時間算出実装
  return 142;
};

export const getAttendancesAverage = (attendances: Attendance[]): number => {
  // TODO: 平均時間算出実装
  return 7.9;
};

export const getAttendancesEmptyCount = (
  attendances: Attendance[],
  dates: Date[],
): number => {
  // TODO: 未入力日算出実装
  return 3;
};
