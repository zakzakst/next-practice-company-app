export type UserEntity = {
  id: number;
  name: string;
  // TODO: 部署に型の制限をかける（○○部、××部）
  department: string;
  // TODO: 役職に型の制限をかける（部長、課長、メンバー）
  jobTitle: string;
  phone: string;
  email: string;
  joinedOn: string;
  createdAt: string;
  updatedAt: string;
};
