"use client";

import { DatePicker } from "@/components/common/DatePicker";
import { ItemSelect } from "@/components/common/ItemSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRolesItems, UserRolesWithLabelItems } from "@/constants/user";
import type { UserRolesItem } from "@/orval/adminUsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// TODO: 任意項目について、空欄を許容するパターンをどう実装するか調べて対応する
export const formSchema = z.object({
  name: z.string().min(1, { error: "氏名は入力必須項目です" }),
  department: z.string(),
  jobTitle: z.string(),
  phone: z
    .string()
    .regex(/^[0-9]$/, { error: "半角数字で入力してください" })
    .min(10, { error: "有効な電話番号を入力してください" })
    .max(11, { error: "有効な電話番号を入力してください" }),
  email: z.email({ error: "有効なメールアドレスを入力してください" }),
  joinedOn: z.date(),
  roles: z.enum(UserRolesItems),
});

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  values?: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  onReturn: () => void;
};

export const UserForm = ({ values, onSubmit, onReturn }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
    mode: "onBlur",
  });

  const test = watch();

  return (
    <Card>
      <CardContent>
        <div>{JSON.stringify(test)}</div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4">
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="name">氏名</Label>
            <div>
              <Input id="name" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="department">部署</Label>
            <div>
              <Input id="department" {...register("department")} />
              {errors.department && <p>{errors.department.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="jobTitle">役職</Label>
            <div>
              <Input id="jobTitle" {...register("jobTitle")} />
              {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="phone">電話番号</Label>
            <div>
              <Input id="phone" {...register("phone")} />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="email">メールアドレス</Label>
            <div>
              <Input id="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="joinedOn">入社日</Label>
            <div>
              <Controller
                name="joinedOn"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      date={field.value}
                      onSelect={(date) => field.onChange(date)}
                    />
                    {error && <p>{error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="roles">権限</Label>
            <div>
              <Controller
                name="roles"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <ItemSelect<UserRolesItem>
                      items={UserRolesWithLabelItems}
                      defaultValue={field.value}
                      onChange={(item) => field.onChange(item.id)}
                    />
                    {error && <p>{error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={handleSubmit((values) => onSubmit(values))}
            disabled={!isValid}
          >
            送信
          </Button>
          <Button size="lg" variant="outline" onClick={onReturn}>
            戻る
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
