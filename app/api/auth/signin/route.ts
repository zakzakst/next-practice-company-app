import { NextRequest, NextResponse } from "next/server";

import { dbAuths } from "@/dummy-db/auth";
import { dbUsers } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { signToken } from "@/lib/jwt";
import { AuthSignin200, AuthSigninBody } from "@/orval/auth";
import { AuthEntity } from "@/types/entities/auth";
import { UserEntity } from "@/types/entities/user";

export const POST = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<AuthSignin200>> => {
    await apiDelay();

    const { email, password }: AuthSigninBody = await request.json();

    // === 認証情報の確認 ===
    const auth = dbAuths.find((a) => a.email === email);
    if (auth) {
      throw new ApiError(
        401,
        "このメールアドレスは既に登録されています",
        "UNAUTHORIZED",
      );
    }

    // === 認証情報とユーザー情報の登録 ===
    const newAuth: AuthEntity = {
      id: dbAuths.length + 1,
      email,
      password,
      roles: ["user"],
      lastLoginAt: new Date().toISOString(),
    };

    const newUser: UserEntity = {
      id: dbUsers.length + 1,
      name: "",
      department: "",
      jobTitle: "",
      phone: "",
      email,
      joinedOn: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dbAuths.push(newAuth);
    dbUsers.push(newUser);

    // === レスポンス作成 ===
    const response = NextResponse.json({
      message: "サインイン成功",
    });

    const token = signToken({
      id: newAuth.id,
      roles: newAuth.roles,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  },
);
