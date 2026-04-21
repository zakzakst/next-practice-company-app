import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const attendances: Attendance[] = [
  {
    date: 1,
    clockIn: "09:00",
    clockOut: "19:00",
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
  attendances,
};

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">勤怠入力</h1>
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
                  <TableCell>
                    <Input type="time" defaultValue={attendance.clockIn} />
                  </TableCell>
                  <TableCell>
                    <Input type="time" defaultValue={attendance.clockOut} />
                  </TableCell>
                  <TableCell>
                    <Input type="time" defaultValue={attendance.break} />
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={attendance.type}>
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {["稼働", "休暇", "その他"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input defaultValue={attendance.note} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <Button>入力内容を登録</Button>
            <Button variant="outline" asChild>
              <Link href="/attendances">戻る</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
