import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { proposalsApi } from "./api/proposals-api";
import { toast } from "@/shared/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { IProposals } from "@/shared/model/types/proposals";
import { queryClient } from "@/shared/model/api/query-client";

const formSchema = z.object({
  name: z.string().min(1, "Заголовок для сообщения обязателен к заполнению"),
  description: z.string(),
  topic: z.enum(["bag", "proposals"], {
    required_error: "Пожалуйста, выберите тип сообщения",
  }),
});

export default function ProposalsForm({
  setIsOpenFeedBackForm,
}: {
  setIsOpenFeedBackForm: Dispatch<SetStateAction<boolean>>;
}) {
  const mutationCreate = useMutation({
    mutationFn: (body: IProposals) => proposalsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      topic: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      mutationCreate.mutate(values, {
        onSuccess: () => {
          toast({
            title: "Сообщение создано",
            description: "Поздравляю, сообщение создано",
          });
          setIsOpenFeedBackForm(false);
        },
        onError: () => {
          toast({
            title: "Ошибка",
            description: "Ошибка при создании",
            variant: "destructive",
          });
          setIsOpenFeedBackForm(false);
        },
      });

      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 ex:p-4 max-w-2xl col-span-1 border-0 lg:border-l mx-auto">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl ex:text-lg font-medium  ex:font-normal tracking-tight">
          Дайте обратную связь
        </h1>
        <p className="text-lg ex:text-sm">
          Создавайте предложения по разработке или, если нашли недочеты в нашей
          системе
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип заявки</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выбрать тип сообщения" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="proposals">
                      Предложение по разработке
                    </SelectItem>
                    <SelectItem value="bag">Сообщить об ошибке</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Выберите одно из двух типов сообщения
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название" {...field} />
                </FormControl>
                <FormDescription>
                  Как будет называться ваше сообщение
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Описание предложения или ошибки"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Добавьте описание проблемы или предложения по разработке,
                  чтобы мы поняли, что вы имеете ввиду
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col xl:flex-row gap-4">
            <Button
              className="bg-primary/80"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправляем..." : "Отпарвить сообщение"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="lg:hidden"
              onClick={() =>
                setIsOpenFeedBackForm && setIsOpenFeedBackForm(false)
              }
            >
              Вернуться назад
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
