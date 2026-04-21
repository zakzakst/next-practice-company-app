import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">ユーザー管理</h1>
      <div className="mt-4">
        <Button asChild>
          <Link href="/admin/users/register">ユーザーを新規登録</Link>
        </Button>
      </div>
      <Card className="mt-4">
        <CardHeader className="grid grid-cols-[1fr_max-content] gap-2">
          <Input />
          <Button>絞り込み</Button>
        </CardHeader>
        <CardContent>表</CardContent>
      </Card>
    </div>
  );
};

export default Page;
