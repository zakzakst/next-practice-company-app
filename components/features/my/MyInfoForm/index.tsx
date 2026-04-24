"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { error: "氏名は入力必須項目です" }),
  phone: z
    .string()
    .or(z.literal(""))
    .refine((val) => val === "" || /^[0-9]{10,11}$/.test(val), {
      message: "有効な電話番号を入力してください",
    }),
  email: z.email({ error: "有効なメールアドレスを入力してください" }),
});

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  values?: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  onReturn: () => void;
};

export const MyInfoForm = ({ values, onSubmit, onReturn }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
    mode: "onChange",
  });

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4">
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="name">氏名</Label>
            <div>
              <Input id="name" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid items-center">
            <Label htmlFor="phone">電話番号</Label>
            <div>
              <Input id="phone" maxLength={11} {...register("phone")} />
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
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={handleSubmit((values) => onSubmit(values))}
            disabled={isDirty && !isValid}
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
