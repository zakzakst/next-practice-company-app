"use client";

import { UserForm } from "@/components/features/users/UserForm";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">新規ユーザー登録</h1>
      <div className="mt-4">
        <UserForm
          onSubmit={(values) => {
            console.log(values);
          }}
          onReturn={() => {}}
        />
      </div>
    </div>
  );
};

export default Page;
