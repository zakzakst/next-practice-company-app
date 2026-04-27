import { NextRequest, NextResponse } from "next/server";

import { dbAttendances } from "@/dummy-db/attendance";
import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import {
  Attendance,
  GetAttendances200,
  GetAttendancesParams,
} from "@/orval/attendances";

export const GET = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<GetAttendances200>> => {
    await apiDelay();

    // === 権限の確認 ===
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

    // === レスポンスデータの作成 ===
    const searchParams = request.nextUrl.searchParams;
    // TODO: 対象の月で絞り込み
    const month: GetAttendancesParams["month"] =
      searchParams.get("month") || undefined;
    const filteredAttendances = dbAttendances.filter(
      (da) => da.userId === user.id,
    );
    const attendances: Attendance[] = filteredAttendances.map((fa) => {
      const { id, date, start, end, breakMinutes, type, note } = fa;
      return {
        id,
        date,
        start,
        end,
        breakMinutes,
        type,
        note,
      };
    });

    return NextResponse.json({
      attendances,
    });
  },
);
