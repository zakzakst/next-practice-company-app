import { AttendancesList } from "@/components/features/attendances/AttendancesList";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Attendance } from "@/orval/attendances";

const months: string[] = ["202501", "202502", "202503"];

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
      <div className="mt-4">
        <AttendancesList attendances={attendances} onClickEdit={() => {}} />
      </div>
    </div>
  );
};

export default Page;
