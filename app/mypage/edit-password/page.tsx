// "use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">パスワード更新</h1>
      <Card className="mt-4">
        <CardContent>
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4">
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="current-password">現在のパスワード</Label>
              <div>
                <Input id="current-password" type="password" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="new-password">新しいパスワード</Label>
              <div>
                <Input id="current-password" type="password" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="new-password-confirm">
                新しいパスワード（確認）
              </Label>
              <div>
                <Input id="current-password" type="password" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <Button size="lg">パスワード更新</Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/mypage">戻る</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
