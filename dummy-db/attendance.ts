import { AttendanceEntity } from "@/types/entities/attendance";

export const attendances: AttendanceEntity[] = [
  {
    id: 1,
    userId: 1,
    date: "2026-04-01T09:30:00.000Z",
    clockIn: "09:00",
    clockOut: "09:00",
    break: "01:00",
    type: "稼働",
    note: "",
    createdAt: "2026-04-01T09:30:00.000Z",
    updatedAt: "2026-04-01T09:30:00.000Z",
  },
  {
    id: 2,
    userId: 1,
    date: "2026-04-02T09:30:00.000Z",
    clockIn: "",
    clockOut: "",
    break: "",
    type: "休暇",
    note: "",
    createdAt: "2026-04-02T09:30:00.000Z",
    updatedAt: "2026-04-02T09:30:00.000Z",
  },
];
