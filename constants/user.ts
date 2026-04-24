import { WithLabelItem } from "@/constants/utils";
import { UserRolesItem } from "@/orval/adminUsers";

export const UserRolesItems: UserRolesItem[] = ["user", "admin"];

type UserRolesWithLabelItem = WithLabelItem<UserRolesItem>;

export const UserRolesWithLabelItems: UserRolesWithLabelItem[] = [
  {
    id: "admin",
    label: "管理者",
  },
  {
    id: "user",
    label: "利用者",
  },
];
