"use client";

import { MyPasswordForm } from "@/components/features/my/MyPasswordForm";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">パスワード更新</h1>
      <div className="mt-4">
        <MyPasswordForm />
      </div>
    </div>
  );
};

export default Page;
