import { API_MOCK_DEFAULT_DELAY } from "@/lib/api";
import { HttpResponse, delay, http } from "msw";

// TODO: MSWに型指定する
export const authMeHandler = http.get("*/auth/me", async () => {
  await delay(API_MOCK_DEFAULT_DELAY);
  return new HttpResponse(
    JSON.stringify({
      id: 1,
      name: "Yamada Taro",
      roles: ["user"],
      lastLoginAt: "2026-04-01T08:00:00.000Z",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
});

export const authHandlers = [authMeHandler];
