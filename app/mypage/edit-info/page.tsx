"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { FormValues, MyInfoForm } from "@/components/features/my/MyInfoForm";
import { MyData, useGetMyData, usePutMyData } from "@/orval/myData";
import { toast } from "sonner";

const converter = (data: MyData): FormValues | undefined => {
  if (!data) return undefined;
  const { name, phone, email } = data;
  return {
    name,
    phone,
    email,
  };
};

const Page = () => {
  const router = useRouter();
  const { data } = useGetMyData();
  const { trigger } = usePutMyData();

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
      <h1 className="text-2xl font-bold">情報更新</h1>
      <div className="mt-4">
        {data?.data && (
          <MyInfoForm
            values={converter(data.data)}
            onSubmit={handleSubmit}
            onReturn={() => router.push("/mypage")}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
