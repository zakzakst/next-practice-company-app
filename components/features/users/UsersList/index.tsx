"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/orval/adminUsers";

type Props = {
  users: User[];
  className?: string;
  disabled?: boolean;
  onDeleteUser: (user: User) => void;
};

export const UsersList = ({
  users,
  className,
  disabled,
  onDeleteUser,
}: Props) => {
  if (!users.length) return <div>ユーザーが見つかりません</div>;

  return (
    <div className={className}>
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.jobTitle}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* TODO: 権限の複数表示と名称表示（userといったid文字列でなく、labelを設定する） */}
              <TableCell>{user.roles[0]}</TableCell>
              <TableCell className="text-right">
                <Button asChild>
                  <Link href={`/admin/users/${user.id}/edit`}>更新</Link>
                </Button>
                <Button onClick={() => onDeleteUser(user)} disabled={disabled}>
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
