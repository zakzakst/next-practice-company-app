"use client";

import { useMemo, useState } from "react";

import { AttendancesList } from "@/components/features/attendances/AttendancesList";
import {
  generateCalendar,
  getAttendancesAverage,
  getAttendancesEmptyCount,
  getAttendancesTotal,
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
    id: 1,
    date: "2026-04-01",
    start: "2026-04-01T09:00:00+09:00",
    end: "2026-04-01T18:00:00+09:00",
    breakMinutes: 90,
    type: "working",
    note: "",
  },
  {
    id: 2,
    date: "2026-04-02",
    start: "2026-04-02T09:00:00+09:00",
    end: "2026-04-02T14:30:00+09:00",
    breakMinutes: 60,
    type: "leftEarly",
    note: "",
  },
  {
    id: 3,
    date: "2026-04-03",
    type: "onLeave",
    note: "私用のため休暇",
  },
  {
    id: 4,
    date: "2026-04-04",
    type: "holiday",
    note: "",
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
                {getAttendancesTotal(attendances)}
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
