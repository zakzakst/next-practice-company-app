import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MyData } from "@/orval/myData";
import { format } from "date-fns";

type Props = {
  data: MyData;
};

export const MyInfo = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {data.department || "---"} / {data.jobTitle || "---"} /{" "}
          {data.joinedOn ? format(data.joinedOn, "yyyy-MM-dd") : "---"}入社
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[120px_1fr_120px_1fr] gap-2">
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <div className="bg-gray-100 p-2">電話番号</div>
            <div className="p-2">{data.phone || "---"}</div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid">
            <div className="bg-gray-100 p-2">メールアドレス</div>
            <div className="p-2">{data.email}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Button size="lg" asChild>
            <Link href="/mypage/edit-profile">プロフィール更新</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/mypage/edit-password">パスワード更新</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
