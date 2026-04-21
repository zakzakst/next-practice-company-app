import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Attendance = {
  date: number;
  clockIn: string;
  clockOut: string;
  break: string;
  type: string;
  note: string;
};

const months: string[] = ["202501", "202502", "202503"];

const attendances: Attendance[] = [
  {
    date: 1,
    clockIn: "09:00",
    clockOut: "09:00",
    break: "01:00",
    type: "稼働",
    note: "",
  },
  {
    date: 2,
    clockIn: "",
    clockOut: "",
    break: "",
    type: "休暇",
    note: "私用のため休暇",
  },
];

const Data = {
  months,
  attendances,
};

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">勤怠管理</h1>
      <div className="mt-4">
        <Select defaultValue={Data.months[0]}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="確認する月を選択してください" />
          </SelectTrigger>
          <SelectContent>
            {Data.months.map((month) => (
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
              <span className="text-xl font-bold">142</span>h
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>平均勤務時間</p>
            <p>
              <span className="text-xl font-bold">7.9</span>h/日
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>未入力日</p>
            <p>
              <span className="text-xl font-bold">3</span>日
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
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
              {Data.attendances.map((attendance) => (
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
            <Link href="/attendances/edit">この月の勤怠情報を入力</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
