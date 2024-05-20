"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
});

export function EmailProviderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await signIn("email", { email });
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="mt-5 flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative my-5">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white pb-1 text-lg tracking-widest text-neutral-500">
            ou
          </span>
          <hr />
        </div>
        <FormField
          name="email"
          control={form.control}
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Entrar com e-mail"
          )}
        </Button>
      </form>
    </Form>
  );
}
