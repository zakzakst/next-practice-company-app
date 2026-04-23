"use client";

import { useState } from "react";

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
import { GetAdminUsersParams, useGetAdminUsers } from "@/orval/adminUsers";

const Page = () => {
  const [params, setParams] = useState<GetAdminUsersParams>({});
  const { data, isLoading } = useGetAdminUsers(params);

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
          <SearchInput
            value={params.q}
            onSubmit={(q) => setParams({ q, page: 1 })}
          />
        </CardHeader>
        <CardContent>
          <UsersList
            users={data?.data.users || []}
            onDeleteUser={() => {}}
            loading={isLoading}
          />
        </CardContent>
        {!!data?.data.total && (
          <CardFooter>
            <ButtonPagination
              total={data?.data.total}
              limit={data?.data.limit}
              current={data?.data.page}
              onMovePage={(page) =>
                setParams((current) => ({ ...current, page }))
              }
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Page;
