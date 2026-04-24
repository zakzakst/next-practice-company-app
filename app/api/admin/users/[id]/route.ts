import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { DeleteAdminUser204 } from "@/orval/adminUsers";

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
