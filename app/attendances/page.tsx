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
import { useGetAttendances } from "@/orval/attendances";

const Page = () => {
  const [month, setMonth] = useState<Date>(new Date());
  const { data } = useGetAttendances();

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
      {data?.data && (
        <>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Card>
              <CardContent>
                <p>月合計時間</p>
                <p>
                  <span className="text-xl font-bold">
                    {getAttendancesTotal(data.data.attendances)}
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
                    {getAttendancesAverage(data.data.attendances)}
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
                    {getAttendancesEmptyCount(data.data.attendances, dates)}
                  </span>
                  日
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <AttendancesList
              attendances={data.data.attendances}
              dates={dates}
              onClickEdit={() => {}}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
