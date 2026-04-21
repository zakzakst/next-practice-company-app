import Link from "next/link";

import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <Button asChild>
        <Link href="/mypage">マイページ</Link>
      </Button>
      <Button asChild>
        <Link href="/attendances">勤怠管理</Link>
      </Button>
      <Button asChild>
        <Link href="/admin/users">ユーザー管理</Link>
      </Button>
    </div>
  );
};

export default Page;
