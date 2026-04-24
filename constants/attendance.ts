import { WithLabelItem } from "@/constants/utils";
import { AttendanceType } from "@/orval/attendances";

export const AttendanceTypes: AttendanceType[] = [
  "working",
  "onLeave",
  "leftEarly",
  "other",
];

type AttendanceTypeWithLabel = WithLabelItem<AttendanceType>;

export const AttendanceTypeWithLabels: AttendanceTypeWithLabel[] = [
  {
    id: "working",
    label: "稼働",
  },
  {
    id: "onLeave",
    label: "休暇",
  },
  {
    id: "leftEarly",
    label: "早退",
  },
  {
    id: "other",
    label: "その他",
  },
];
