import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: number;
  name: string;
  department: string;
  jobTitle: string;
  phone: string;
  email: string;
  joinedOn: string;
  roles: string[];
};

const users: User[] = [
  {
    id: 1,
    name: "Yamada",
    department: "○○部",
    jobTitle: "メンバー",
    phone: "08000000000",
    email: "taro@example.com",
    joinedOn: "2026-04-01",
    roles: ["user"],
  },
];

const Data = {
  users,
};

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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>氏名</TableHead>
                <TableHead>部署</TableHead>
                <TableHead>役職</TableHead>
                <TableHead>電話番号</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>権限</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.jobTitle}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles[0]}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild>
                      <Link href={`/admin/users/${user.id}/edit`}>更新</Link>
                    </Button>
                    <Button>削除</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
