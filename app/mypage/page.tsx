"use client";

import { MyInfo } from "@/components/features/my/MyInfo";
import { useGetMyData } from "@/orval/myData";

const Page = () => {
  const { data } = useGetMyData();

  return (
    <div>
      <h1 className="text-2xl font-bold">マイページ</h1>
      <div className="mt-4">{data?.data && <MyInfo data={data.data} />}</div>
    </div>
  );
};

export default Page;
