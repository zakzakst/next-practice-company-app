"use client";

import { useCallback, useState } from "react";

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
import {
  GetAdminUsersParams,
  User,
  useDeleteAdminUsers,
  useGetAdminUsers,
} from "@/orval/adminUsers";

const DefaultParams: GetAdminUsersParams = {};

const Page = () => {
  const [params, setParams] = useState<GetAdminUsersParams>(DefaultParams);
  const { data, isLoading, mutate } = useGetAdminUsers(params);
  const { trigger, isMutating } = useDeleteAdminUsers();

  const handleDeleteUser = useCallback(
    (user: User) => {
      trigger({ id: user.id });
      setParams(DefaultParams);
      mutate();
    },
    [trigger, setParams, mutate],
  );

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
            onDeleteUser={handleDeleteUser}
            loading={isLoading || isMutating}
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
