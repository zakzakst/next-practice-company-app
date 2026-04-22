import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">新規ユーザー登録</h1>
      <Card className="mt-4">
        <CardContent>
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4">
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="name">氏名</Label>
              <div>
                <Input id="name" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="department">部署</Label>
              <div>
                <Input id="department" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="jobTitle">役職</Label>
              <div>
                <Input id="jobTitle" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="phone">電話番号</Label>
              <div>
                <Input id="phone" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="email">メールアドレス</Label>
              <div>
                <Input id="email" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="joinedOn">入社日</Label>
              <div>
                <Input id="joinedOn" />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid items-center">
              <Label htmlFor="roles">権限</Label>
              <div>
                <Input id="roles" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <Button size="lg">新規ユーザー登録</Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/admin/users">戻る</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
