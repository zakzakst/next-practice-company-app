import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { PutMyDataPassword200, PutMyDataPasswordBody } from "@/orval/myData";

export const PUT = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<PutMyDataPassword200>> => {
    await apiDelay();

    // === 認証状態の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === 認証データの確認 ===
    const auth = dbAuths.find((da) => da.id === jwtPayload.id);
    if (!auth) {
      throw new ApiError(404, "対応するデータが見つかりません", "NOT_FOUND");
    }
    const { password, newPassword }: PutMyDataPasswordBody =
      await request.json();
    if (auth.password !== password) {
      throw new ApiError(401, "パスワードが違います", "UNAUTHORIZED");
    }

    // === データ更新処理 ===
    const authIndex = dbAuths.findIndex((da) => da === auth);
    dbAuths[authIndex] = {
      ...auth,
      password: newPassword,
    };

    return NextResponse.json({
      message: "パスワード更新成功",
    });
  },
);
