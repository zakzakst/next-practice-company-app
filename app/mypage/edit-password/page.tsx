"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import {
  FormValues,
  MyPasswordForm,
} from "@/components/features/my/MyPasswordForm";
import { usePutMyDataPassword } from "@/orval/myData";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const { trigger } = usePutMyDataPassword();

  const handleSubmit = useCallback(
    async (values: Omit<FormValues, "confirmPassword">) => {
      await trigger(values);
      toast("更新しました");
      router.push("/mypage");
    },
    [trigger, router],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">パスワード更新</h1>
      <div className="mt-4">
        <MyPasswordForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Page;
