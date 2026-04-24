"use client";

import Link from "next/link";

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
import { Attendance } from "@/orval/attendances";

type Props = {
  attendances: Attendance[];
};

export const AttendancesList = ({ attendances }: Props) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">日付</TableHead>
              <TableHead>出勤</TableHead>
              <TableHead>退勤</TableHead>
              <TableHead>休憩</TableHead>
              <TableHead>稼働状況</TableHead>
              <TableHead>備考</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendances.map((attendance) => (
              <TableRow key={attendance.date}>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>{attendance.clockIn || "---"}</TableCell>
                <TableCell>{attendance.clockOut || "---"}</TableCell>
                <TableCell>{attendance.break || "---"}</TableCell>
                <TableCell>{attendance.type}</TableCell>
                <TableCell>{attendance.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button asChild>
          {/* TODO: URLにqueryで対象の月を付与する */}
          <Link href="/attendances/edit">この月の勤怠情報を入力</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
