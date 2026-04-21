// "use client";
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

const Data = {
  id: 1,
  name: "Yamada",
  department: "○○部",
  jobTitle: "メンバー",
  phone: "08000000000",
  email: "taro@example.com",
  joinedOn: "2026-04-01",
};

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">マイページ</h1>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{Data.name}</CardTitle>
          <CardDescription>
            {Data.department} / {Data.jobTitle} / {Data.joinedOn}入社
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[120px_1fr_120px_1fr] gap-2">
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <div className="bg-gray-100 p-2">電話番号</div>
              <div className="p-2">{Data.phone}</div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid">
              <div className="bg-gray-100 p-2">メールアドレス</div>
              <div className="p-2">{Data.email}</div>
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
    </div>
  );
};

export default Page;
