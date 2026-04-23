import { AuthEntity } from "@/types/entities/auth";

// TODO: テンプレートにも反映
export const dbAuths: AuthEntity[] = [
  {
    id: 1,
    email: "taro@example.com",
    password: "password123",
    roles: ["user"],
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 2,
    email: "hanako@example.com",
    password: "securepass456",
    roles: ["user"],
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 3,
    email: "admin@example.com",
    password: "adminpass789",
    roles: ["admin"],
    lastLoginAt: "2026-04-01T08:00:00.000Z",
  },
];
