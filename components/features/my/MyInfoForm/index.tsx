"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Data = {
  id: 1,
  name: "Yamada",
  department: "○○部",
  jobTitle: "メンバー",
  phone: "08000000000",
  email: "taro@example.com",
  joinedOn: "2026-04-01",
};

export const MyInfoForm = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4">
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="name">氏名</Label>
            <div>
              <Input id="name" defaultValue={Data.name} />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="phone">電話番号</Label>
            <div>
              <Input id="phone" defaultValue={Data.phone} />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="email">メールアドレス</Label>
            <div>
              <Input id="email" defaultValue={Data.email} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Button size="lg">更新</Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/mypage">戻る</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
