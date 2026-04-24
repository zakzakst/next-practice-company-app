import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { DeleteAdminUser204, PutAdminUserBody, User } from "@/orval/adminUsers";

export const GET = withErrorHandler(
  async (
    _request: NextRequest,
    context: RouteContext<"/api/admin/users/[id]">,
  ): Promise<NextResponse<User>> => {
    await apiDelay();

    // === 権限の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload?.roles.includes("admin")) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === 対象ユーザーが存在するか確認 ===
    const { id } = await context.params;
    const user = dbUsers.find((du) => du.id === Number(id));
    const auth = dbAuths.find((da) => da.email === user?.email);
    if (!user || !auth) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    // === レスポンスデータ作成 ===
    const userData: User = {
      id: user.id,
      name: user.name,
      department: user.department,
      jobTitle: user.jobTitle,
      phone: user.phone,
      email: user.email,
      joinedOn: user.joinedOn,
      roles: auth.roles,
    };

    return NextResponse.json(userData);
  },
);

export const PUT = withErrorHandler(
  async (
    request: NextRequest,
    context: RouteContext<"/api/admin/users/[id]">,
  ): Promise<NextResponse<User>> => {
    await apiDelay();

    // === 権限の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload?.roles.includes("admin")) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === 対象ユーザーが存在するか確認 ===
    const { id } = await context.params;
    const user = dbUsers.find((du) => du.id === Number(id));
    const auth = dbAuths.find((da) => da.email === user?.email);
    if (!user || !auth) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    // === 更新後のメールアドレスが存在するか確認 ===
    const params: PutAdminUserBody = await request.json();
    const isExistingEmail = dbAuths.some(
      (da) => auth.email !== params.email && da.email === params.email,
    );
    if (isExistingEmail) {
      throw new ApiError(
        401,
        "このメールアドレスは既に登録されています",
        "UNAUTHORIZED",
      );
    }

    // === 更新実行 ===
    const newUser: User = {
      id: user.id,
      name: params.name,
      department: params.department || "",
      jobTitle: params.jobTitle || "",
      phone: params.phone || "",
      email: params.email,
      joinedOn: params.joinedOn || "",
      roles: params.roles,
    };
    const authIndex = dbAuths.findIndex((da) => da === auth);
    dbAuths[authIndex] = {
      ...auth,
      email: newUser.email,
      roles: newUser.roles,
    };
    const userIndex = dbUsers.findIndex((du) => du === user);
    dbUsers[userIndex] = {
      ...user,
      name: newUser.name,
      department: newUser.department || "",
      jobTitle: newUser.jobTitle || "",
      phone: newUser.phone || "",
      email: newUser.email,
      joinedOn: newUser.joinedOn || "",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newUser);
  },
);

// NOTE: orvalとの連携の兼ね合いで、こちらのDELETEは利用しない
export const DELETE = withErrorHandler(
  async (
    _request: NextRequest,
    context: RouteContext<"/api/admin/users/[id]">,
  ): Promise<NextResponse<DeleteAdminUser204>> => {
    await apiDelay();

    // === 権限の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload?.roles.includes("admin")) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === 対象データが存在するか確認 ===
    const { id } = await context.params;
    const user = dbUsers.find((du) => du.id === Number(id));
    const auth = dbAuths.find((da) => da.email === user?.email);
    if (!user || !auth) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    // === 削除実行 ===
    const userIndex = dbUsers.findIndex((du) => du === user);
    dbUsers.splice(userIndex, 1);
    const authIndex = dbAuths.findIndex((da) => da === auth);
    dbAuths.splice(authIndex, 1);

    return NextResponse.json({
      message: "ユーザー削除成功",
    });
  },
);
