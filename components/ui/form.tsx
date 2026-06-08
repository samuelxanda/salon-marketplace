"use client";

import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormProps,
  FormProvider,
} from "react-hook-form";
import { cn } from "@/lib/utils";

function Form<T extends FieldValues>({
  onSubmit,
  children,
  ...props
}: {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
} & Omit<UseFormProps<T>, "onSubmit">) {
  const methods = useForm<T>({ ...props });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

type FormItemProps = React.ComponentProps<"div">;

function FormItem({ className, ...props }: FormItemProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

type FormLabelProps = React.ComponentProps<"label">;

function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-text-primary",
        className
      )}
      {...props}
    />
  );
}

type FormControlProps = React.ComponentProps<"div">;

function FormControl({ className, ...props }: FormControlProps) {
  return <div className={cn("flex flex-col", className)} {...props} />;
}

type FormMessageProps = React.ComponentProps<"p">;

function FormMessage({ className, ...props }: FormMessageProps) {
  return <p className={cn("text-sm text-error", className)} {...props} />;
}

export { Form, FormItem, FormLabel, FormControl, FormMessage };