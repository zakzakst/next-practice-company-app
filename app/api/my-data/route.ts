import { NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { MyData } from "@/orval/myData";

export const GET = withErrorHandler(async (): Promise<NextResponse<MyData>> => {
  await apiDelay();

  // === 認証状態の確認 ===
  const jwtPayload = await getJwtPayload();
  if (!jwtPayload) {
    throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
  }

  // === ユーザー情報の確認 ===
  const auth = dbAuths.find((a) => a.id === jwtPayload.id);
  const user = dbUsers.find((u) => u.email === auth?.email);
  if (!auth || !user) {
    throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    department: user.department,
    jobTitle: user.jobTitle,
    phone: user.phone,
    email: user.email,
    joinedOn: user.joinedOn,
    roles: auth.roles,
  });
});
