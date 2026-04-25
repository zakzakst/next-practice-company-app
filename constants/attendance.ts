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
    id: "holiday",
    label: "休日",
  },
  {
    id: "other",
    label: "その他",
  },
];

export const getAttendanceTypeLabel = (
  id: AttendanceTypeWithLabel["id"] | undefined,
): AttendanceTypeWithLabel["label"] | undefined => {
  if (!id) return undefined;
  const attendance = AttendanceTypeWithLabels.find((a) => a.id === id);
  return attendance?.label;
};
