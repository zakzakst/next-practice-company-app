import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import {
  DeleteAdminUsers200,
  DeleteAdminUsersBody,
  GetAdminUsers200,
  PostAdminUserBody,
  User,
} from "@/orval/adminUsers";
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

export const POST = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<User>> => {
    await apiDelay();

    // === 権限の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload?.roles.includes("admin")) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === 認証情報の確認 ===
    const params: PostAdminUserBody = await request.json();
    const auth = dbAuths.find((a) => a.email === params.email);
    if (auth) {
      throw new ApiError(
        401,
        "このメールアドレスは既に登録されています",
        "UNAUTHORIZED",
      );
    }

    // === 作成実行 ===
    const user: User = {
      id: dbUsers.length + 1,
      name: params.name,
      department: params.department || "",
      jobTitle: params.jobTitle || "",
      phone: params.phone || "",
      email: params.email,
      joinedOn: params.joinedOn || "",
      roles: params.roles,
    };
    dbAuths.push({
      id: dbAuths.length + 1,
      email: user.email,
      // TODO: 初期パスワードとしてランダムな文字列を生成する
      password: "password",
      roles: user.roles,
      lastLoginAt: "",
    });
    dbUsers.push({
      id: user.id,
      name: user.name,
      department: user.department,
      jobTitle: user.jobTitle,
      phone: user.phone,
      email: user.email,
      joinedOn: user.joinedOn,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(user);
  },
);

export const DELETE = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<DeleteAdminUsers200>> => {
    await apiDelay();

    // === 権限の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload?.roles.includes("admin")) {
      throw new ApiError(401, "実行権限がありません", "UNAUTHORIZED");
    }

    // === 対象データが存在するか確認 ===
    const params: DeleteAdminUsersBody = await request.json();
    const { id } = params;
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
