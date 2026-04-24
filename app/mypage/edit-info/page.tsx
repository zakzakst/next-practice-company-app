"use client";

import { MyInfoForm } from "@/components/features/my/MyInfoForm";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">情報更新</h1>
      <div className="mt-4">
        <MyInfoForm />
      </div>
    </div>
  );
};

export default Page;
