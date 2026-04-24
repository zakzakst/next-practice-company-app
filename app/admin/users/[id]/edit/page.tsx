import type { Metadata } from "next";

import { PageContent } from "./PageContent";

export const metadata: Metadata = {
  title: "ユーザー情報更新",
  description: "フォームを入力してユーザー情報を更新してください",
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <PageContent id={Number(id)} />;
};

export default Page;
