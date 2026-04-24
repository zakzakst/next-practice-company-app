"use client";

import { useCallback } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z
  .object({
    password: z.string(),
    newPassword: z
      .string()
      .min(8, { error: "パスワードは8文字以上で入力してください" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (values: Omit<FormValues, "confirmPassword">) => void;
};

export const MyPasswordForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const submit = useCallback(
    (values: FormValues) => {
      const { password, newPassword } = values;
      onSubmit({
        password,
        newPassword,
      });
    },
    [onSubmit],
  );

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4">
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="password">現在のパスワード</Label>
            <div>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="newPassword">新しいパスワード</Label>
            <div>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
              {errors.newPassword && <p>{errors.newPassword.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
            <div>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={handleSubmit((values) => submit(values))}
            disabled={isDirty && !isValid}
          >
            パスワード更新
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/mypage">戻る</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
