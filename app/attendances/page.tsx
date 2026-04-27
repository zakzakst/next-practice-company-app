"use client";

import { useCallback, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AttendancesList } from "@/components/features/attendances/AttendancesList";
import {
  generateCalendar,
  getAttendancesAverage,
  getAttendancesEmptyCount,
  getAttendancesTotal,
} from "@/components/features/attendances/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAttendances } from "@/orval/attendances";
import { addMonths, format, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [month, setMonth] = useState<Date>(new Date());

  const monthParam = useMemo<string>(() => {
    return format(month, "yyyy-MM");
  }, [month]);

  const { data } = useGetAttendances({
    month: monthParam,
  });

  const dates = useMemo<Date[]>(() => {
    return generateCalendar(month);
  }, [month]);

  const isCurrentMonth = useMemo<boolean>(() => {
    return isSameMonth(month, new Date());
  }, [month]);

  const changeMonth = useCallback(
    (type: "prev" | "next") => {
      if (type === "prev") {
        const newMonth = addMonths(month, -1);
        setMonth(newMonth);
      }
      if (type === "next") {
        const newMonth = addMonths(month, 1);
        setMonth(newMonth);
      }
    },
    [month, setMonth],
  );

  const goToEditPage = useCallback(() => {
    router.push(`/attendances/edit?month=${format(month, "yyyy-MM")}`);
  }, [month, router]);

  return (
    <div>
      <h1 className="text-2xl font-bold">勤怠管理</h1>
      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon-sm"
          variant="outline"
          onClick={() => changeMonth("prev")}
        >
          <ChevronLeft />
        </Button>
        {format(month, "yyyy年MM月")}
        <Button
          size="icon-sm"
          variant="outline"
          onClick={() => changeMonth("next")}
          disabled={isCurrentMonth}
        >
          <ChevronRight />
        </Button>
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
              onClickEdit={goToEditPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
