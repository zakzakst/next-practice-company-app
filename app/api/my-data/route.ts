import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { MyData, PutMyDataBody } from "@/orval/myData";

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

export const PUT = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<MyData>> => {
    await apiDelay();

    // === 認証状態の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === ユーザー情報の確認 ===
    const auth = dbAuths.find((da) => da.id === jwtPayload.id);
    const user = dbUsers.find((du) => du.email === auth?.email);
    if (!auth || !user) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    // === データ更新処理 ===
    const params: PutMyDataBody = await request.json();
    const newMyData: MyData = {
      id: user.id,
      name: params.name,
      department: user.department,
      jobTitle: user.jobTitle,
      phone: params.phone || "",
      email: params.email,
      joinedOn: user.joinedOn,
      roles: auth.roles,
    };
    const authIndex = dbAuths.findIndex((da) => da === auth);
    dbAuths[authIndex] = {
      ...auth,
      email: newMyData.email,
    };
    const userIndex = dbUsers.findIndex((du) => du === user);
    dbUsers[userIndex] = {
      ...user,
      name: newMyData.name,
      phone: newMyData.phone,
    };

    return NextResponse.json(newMyData);
  },
);
