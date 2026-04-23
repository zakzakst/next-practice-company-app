import { UserEntity } from "@/types/entities/user";

export const dbUsers: UserEntity[] = [
  {
    id: 1,
    name: "Taro Yamada",
    department: "○○部",
    jobTitle: "メンバー",
    phone: "08000000000",
    email: "taro@example.com",
    joinedOn: "2026-04-01T08:00:00.000Z",
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-01T08:00:00.000Z",
  },
  {
    id: 2,
    name: "Hanako Suzuki",
    department: "××部",
    jobTitle: "リーダー",
    phone: "08000000001",
    email: "hanako@example.com",
    joinedOn: "2026-04-02T09:30:00.000Z",
    createdAt: "2026-04-02T09:30:00.000Z",
    updatedAt: "2026-04-02T09:30:00.000Z",
  },
  {
    id: 3,
    name: "Admin Ken",
    department: "□□部",
    jobTitle: "部長",
    phone: "08000000002",
    email: "admin@example.com",
    joinedOn: "2026-04-03T10:45:00.000Z",
    createdAt: "2026-04-03T10:45:00.000Z",
    updatedAt: "2026-04-03T10:45:00.000Z",
  },
];
