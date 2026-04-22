import { UserEntity } from "./user";

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
