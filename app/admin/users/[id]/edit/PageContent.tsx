"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { FormValues, UserForm } from "@/components/features/users/UserForm";
import { PutAdminUserBody, User, useGetAdminUser } from "@/orval/adminUsers";
import { usePutAdminUser } from "@/orval/adminUsers";
import { toast } from "sonner";

// TODO: 関数名きちんと考える
const converter = (user?: User): FormValues | undefined => {
  if (!user) return undefined;
  return {
    name: user.name,
    department: user.department,
    jobTitle: user.jobTitle,
    phone: user.phone,
    email: user.email,
    joinedOn: user.joinedOn ? new Date(user.joinedOn) : undefined,
    roles: user.roles.length ? user.roles[0] : undefined,
  };
};

const converter2 = (values: FormValues): PutAdminUserBody => {
  return {
    ...values,
    joinedOn: values.joinedOn ? values.joinedOn.toISOString() : "",
    roles: values.roles ? [values.roles] : [],
  };
};

type Props = {
  id: number;
};

export const PageContent = ({ id }: Props) => {
  const router = useRouter();
  const { data } = useGetAdminUser(id);
  const { trigger } = usePutAdminUser(id);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      await trigger(converter2(values));
      toast("更新しました");
      router.push("/admin/users");
    },
    [trigger, router],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">ユーザー更新</h1>
      <div className="mt-4">
        {data?.data && (
          <UserForm
            values={converter(data.data)}
            onSubmit={handleSubmit}
            onReturn={() => {
              router.push("/admin/users");
            }}
          />
        )}
      </div>
    </div>
  );
};
