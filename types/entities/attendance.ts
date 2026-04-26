import { UserEntity } from "./user";

export type AttendanceEntityType =
  | "working"
  | "onLeave"
  | "leftEarly"
  | "other"
  | "holiday";

export type AttendanceEntity = {
  id: number;
  userId: UserEntity["id"];
  date: string;
  clockIn: string;
  clockOut: string;
  break: string;
  // TODO: 勤怠タイプに型の制限をかける（休暇、稼働、早退、その他）
  type: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

// TODO: 下記のデータに変更する
export type AttendanceEntity2 = {
  id: number;
  userId: UserEntity["id"];
  start: string; // "2026-04-01T09:00:00+09:00"
  end: string; // "2026-04-02T09:00:00+09:00"
  breakMinutes: number;
  type: AttendanceEntityType;
  note: string;
  createdAt: string;
  updatedAt: string;
};
