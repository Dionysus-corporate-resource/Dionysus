import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { toast } from "@/shared/hooks/use-toast";
import { cn } from "@/shared/lib/utils";
import { queryClient } from "@/shared/model/api/query-client";
import { IUserRoles } from "@/shared/model/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUpdateProfile, userApi } from "../api/user-api";
import { useSetAtom } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";

type IFormData = {
  userName: string;
  email: string;
  phone: string;
  roles: IUserRoles;
  nameCompany: string | null;
};

export default function ProfileEditForm() {
  const [isChangeForm, setIsChangeForm] = useState(false);
  const setUser = useSetAtom(userStorageAtom);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getDataProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: IUpdateProfile) => userApi.updateDataProfile(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const [formData, setFormData] = useState<IFormData>({
    userName: "",
    email: "",
    phone: "",
    roles: "driver",
    nameCompany: null,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setFormData({
        userName: userData.userName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        roles: userData.roles || "driver",
        nameCompany: userData.companyPublicData?.nameCompany || null,
      });
    }
  }, [userData, setUser]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChangeForm(true);
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsChangeForm(false);

    if (formData.roles === "customer" && !formData.nameCompany) {
      return toast({
        title: "Ошибка валидации",
        description: "Введите название компании",
        variant: "destructive",
      });
    }

    const data = {
      userName: formData.userName,
      phone: formData.phone,
      roles: formData.roles,
      nameCompany: formData.nameCompany || null,
    };

    console.log("Edit profile", data);
    updateProfileMutation.mutate(data, {
      onSuccess: (data: { message: string }) => {
        console.log(data);
        toast({
          title: "Успешно",
          description: data?.message,
        });
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Можно заменить на спиннер или любую заглушку
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* {isCustomer ? "customer" : "driver"} */}
        {/* Имя */}
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input
            value={formData.userName}
            onChange={handleChange}
            id="name"
            name="userName"
            placeholder="Иван Петров"
          />
        </div>
        {/* Компания */}
        <div
          className={cn("space-y-2", formData.roles !== "customer" && "hidden")}
        >
          <Label htmlFor="company">Компания</Label>
          <Input
            value={formData.nameCompany ?? ""}
            onChange={handleChange}
            name="nameCompany"
            id="companyName"
            placeholder="ООО 'Компания'"
          />
        </div>
        {/* Телефон */}
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            onChange={handleChange}
            value={formData?.phone}
            placeholder="+7 (999) 999-99-99"
          />
        </div>
        <div className="space-y-2">
          <Label>Род деятельности</Label>

          <RadioGroup
            value={formData?.roles}
            onValueChange={(value: IUserRoles) => {
              setIsChangeForm(true);
              setFormData((prev) => ({ ...prev, roles: value }));
            }}
            className="flex space-x-4 py-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">Заказчик перевозки</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="driver" id="driver" />
              <Label htmlFor="driver">Водитель</Label>
            </div>
          </RadioGroup>
        </div>

        {isChangeForm && (
          <Button variant="secondary" className="w-full col-span-1 mt-2">
            <Save className="w-4 h-4" />
            Сохранить
          </Button>
        )}
      </div>
    </form>
  );
}
