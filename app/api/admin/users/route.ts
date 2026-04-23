import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { GetAdminUsers200, User } from "@/orval/adminUsers";
import lodash from "lodash";

const getUsers = (): User[] => {
  const users = dbUsers.reduce<User[]>((acc, dbUser) => {
    const auth = dbAuths.find((da) => da.email === dbUser.email);
    const { id, name, department, jobTitle, phone, email, joinedOn } = dbUser;
    if (auth) {
      acc.push({
        id,
        name,
        department,
        jobTitle,
        phone,
        email,
        joinedOn,
        roles: auth.roles,
      });
    }
    return acc;
  }, []);
  return users;
};

const getFilteredUsers = (q?: string): User[] => {
  const users = getUsers();
  if (!q) return users;
  const filteredUsers = users.filter((u) => u.name.includes(q));
  return filteredUsers;
};

const getPageNum = (page?: string): number => {
  const pageNum = Number(page);
  return lodash.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;
};

const LIMIT = 10;

export const GET = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<GetAdminUsers200>> => {
    await apiDelay();

    // === 権限の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload?.roles.includes("admin")) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === レスポンス作成 ===
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || undefined;
    const page = searchParams.get("page") || undefined;
    const filteredUsers = getFilteredUsers(q);
    const pageNum = getPageNum(page);
    const startNum = (pageNum - 1) * LIMIT;
    const limitedData = filteredUsers.slice(startNum, startNum + 10);

    return NextResponse.json({
      total: filteredUsers.length,
      limit: LIMIT,
      page: pageNum,
      users: limitedData,
    });
  },
);
