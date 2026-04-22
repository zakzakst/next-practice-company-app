"use client";

import Link from "next/link";

import { ButtonPagination } from "@/components/common/ButtonPagination";
import { SearchInput } from "@/components/common/SearchInput";
import { UsersList } from "@/components/features/users/UsersList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { User } from "@/orval/adminUsers";

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
        <CardHeader>
          <SearchInput value="" onSubmit={() => {}} />
        </CardHeader>
        <CardContent>
          <UsersList users={users} onDeleteUser={() => {}} />
        </CardContent>
        <CardFooter>
          <ButtonPagination
            total={100}
            limit={10}
            current={1}
            onMovePage={() => {}}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
