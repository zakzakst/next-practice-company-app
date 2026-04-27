// NOTE: AI利用を頭に置いたときに、ロジックを分離してテストしやすくすることが求められると感じる。
// そのうえで悩ましいのは、「そのロジック群をどこに置くのか？」かなとも感じる。一旦各features区切りで作成してみる
import {
  AttendanceTypeWithLabel,
  AttendanceTypeWithLabels,
} from "@/constants/attendance";
import { Attendance } from "@/orval/attendances";
import {
  addDays,
  differenceInMinutes,
  endOfMonth,
  startOfMonth,
} from "date-fns";

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

const getWorkingMinutes = (attendance: Attendance): number => {
  if (!attendance.start || !attendance.end) return 0;
  return differenceInMinutes(attendance.end, attendance.start);
};

export const getAttendancesTotal = (attendances: Attendance[]): number => {
  const workingAttendances = attendances.filter((a) => a.start && a.end);
  const total = workingAttendances.reduce<number>(
    (acc, attendance) => acc + getWorkingMinutes(attendance),
    0,
  );
  return total / 60;
};

export const getAttendancesAverage = (attendances: Attendance[]): number => {
  const workingAttendances = attendances.filter((a) => a.start && a.end);
  if (!workingAttendances.length) return 0;
  const total = workingAttendances.reduce<number>(
    (acc, attendance) => acc + getWorkingMinutes(attendance),
    0,
  );
  return total / 60 / workingAttendances.length;
};

export const getAttendancesEmptyCount = (
  attendances: Attendance[],
  dates: Date[],
): number => {
  return dates.length - attendances.length;
};

export const getTimeStrFromMinutes = (minutes?: number): string | undefined => {
  if (!minutes) return undefined;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};
