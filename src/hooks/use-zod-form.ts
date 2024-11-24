import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { z } from "zod";
export const useZodForm = <T extends ZodType<unknown>>(
  schema: T,
  defaultValues: DefaultValues<z.TypeOf<T>> | undefined
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    watch,
  };
};
