"use client";

import { useMemo, useState } from "react";

import { AttendancesList } from "@/components/features/attendances/AttendancesList";
import {
  generateCalendar,
  getAttendancesAverage,
  getAttendancesEmptyCount,
  getAttendancesSum,
} from "@/components/features/attendances/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Attendance } from "@/orval/attendances";

const attendances: Attendance[] = [
  {
    date: "2026-04-01T09:30:00.000Z",
    clockIn: "09:00",
    clockOut: "09:00",
    break: "01:00",
    type: "working",
    note: "",
  },
  {
    date: "2026-04-02T09:30:00.000Z",
    clockIn: "",
    clockOut: "",
    break: "",
    type: "onLeave",
    note: "私用のため休暇",
  },
];

const Page = () => {
  const [month, setMonth] = useState<Date>(new Date());

  const months = useMemo<string[]>(() => {
    return ["202501", "202502", "202503"];
  }, []);

  const dates = useMemo<Date[]>(() => {
    return generateCalendar(month);
  }, [month]);

  return (
    <div>
      <h1 className="text-2xl font-bold">勤怠管理</h1>
      <div className="mt-4">
        <Select defaultValue={months[0]}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="確認する月を選択してください" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <p>月合計時間</p>
            <p>
              <span className="text-xl font-bold">
                {getAttendancesSum(attendances)}
              </span>
              h
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>平均勤務時間</p>
            <p>
              <span className="text-xl font-bold">
                {getAttendancesAverage(attendances)}
              </span>
              h/日
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>未入力日</p>
            <p>
              <span className="text-xl font-bold">
                {getAttendancesEmptyCount(attendances, dates)}
              </span>
              日
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <AttendancesList
          attendances={attendances}
          dates={dates}
          onClickEdit={() => {}}
        />
      </div>
    </div>
  );
};

export default Page;
