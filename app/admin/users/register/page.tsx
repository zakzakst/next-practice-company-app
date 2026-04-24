"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { FormValues, UserForm } from "@/components/features/users/UserForm";
import { PostAdminUserBody, usePostAdminUser } from "@/orval/adminUsers";
import { toast } from "sonner";

const converter = (values: FormValues): PostAdminUserBody => {
  return {
    ...values,
    joinedOn: values.joinedOn ? values.joinedOn.toISOString() : "",
    roles: values.roles ? [values.roles] : [],
  };
};

const Page = () => {
  const router = useRouter();
  const { trigger } = usePostAdminUser();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      await trigger(converter(values));
      toast("登録しました");
      router.push("/admin/users");
    },
    [trigger, router],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">新規ユーザー登録</h1>
      <div className="mt-4">
        <UserForm
          onSubmit={handleSubmit}
          onReturn={() => {
            router.push("/admin/users");
          }}
        />
      </div>
    </div>
  );
};

export default Page;
