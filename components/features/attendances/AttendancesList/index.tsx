"use client";

import { getAttendanceTypeLabel } from "../utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Attendance } from "@/orval/attendances";
import { format, isSameDay } from "date-fns";
import { ja } from "date-fns/locale";

type Props = {
  attendances: Attendance[];
  dates: Date[];
  onClickEdit: () => void;
};

export const AttendancesList = ({ attendances, dates, onClickEdit }: Props) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">日付</TableHead>
              <TableHead className="w-10">曜日</TableHead>
              <TableHead className="w-25">出勤時間</TableHead>
              <TableHead className="w-25">退勤時間</TableHead>
              <TableHead className="w-25">休憩時間</TableHead>
              <TableHead className="w-25">稼働状況</TableHead>
              <TableHead>備考</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dates.map((date) => {
              const dayOfWeek = date.getDay();
              const attendance = attendances.find((a) => {
                return isSameDay(new Date(a.date), date);
              });

              return (
                <TableRow
                  key={date.toString()}
                  className={cn(
                    dayOfWeek === 0 && "bg-red-50",
                    dayOfWeek === 6 && "bg-blue-50",
                  )}
                >
                  <TableCell>{format(date, "d")}</TableCell>
                  <TableCell>{format(date, "EE", { locale: ja })}</TableCell>
                  <TableCell>{attendance?.clockIn || "---"}</TableCell>
                  <TableCell>{attendance?.clockOut || "---"}</TableCell>
                  <TableCell>{attendance?.break || "---"}</TableCell>
                  <TableCell>
                    {getAttendanceTypeLabel(attendance?.type) || "---"}
                  </TableCell>
                  <TableCell>{attendance?.note}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button onClick={onClickEdit}>この月の勤怠情報を入力</Button>
      </CardFooter>
    </Card>
  );
};
