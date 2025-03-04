import { useAuth } from "@/app/providers/auth-provider";
import { TruckInfoCard } from "@/entities/driver";
import { PersonalInfo } from "@/entities/profile";
import { ProfileEditForm } from "@/feature/auth/profile";

export default function ProfilePage() {
  const authContext = useAuth();

  // const [location, setLocation] = useState<[number, number] | null>(null);

  // const getLocation = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation([latitude, longitude]);
  //       },
  //       (error) => {
  //         console.error("Ошибка получения геолокации:", error);
  //       },
  //     );
  //   } else {
  //     console.error("Геолокация не поддерживается этим браузером");
  //   }
  // };

  // useEffect(() => {
  //   if (!("geolocation" in navigator)) {
  //     console.error("Геолокация не поддерживается этим браузером");
  //     return;
  //   }

  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation([latitude, longitude]);
  //     },
  //     (error) => {
  //       console.error("Ошибка получения геолокации:", error);
  //     },
  //   );

  //   return () => navigator.geolocation.clearWatch(watchId);
  // }, []);

  return (
    <div className="w-full">
      <div
        className="mx-auto w-full grid grid-cols-1 gap-4
        2xl:container p-2 md:p-4 xl:p-6 2xl:p-6 lg:grid-cols-2"
      >
        <PersonalInfo
          userData={authContext?.user}
          formSlot={<ProfileEditForm />}
        />

        {/* <PasswordChange /> */}
        {/* Notification Preferences */}
        {/* <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Настройте способы получения уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="email-notifications"
                  className="flex items-center space-x-2"
                >
                  <Bell className="h-4 w-4" />
                  <span>Email уведомления</span>
                </Label>
                <Switch id="email-notifications" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="sms-notifications"
                  className="flex items-center space-x-2"
                >
                  <Bell className="h-4 w-4" />
                  <span>SMS уведомления</span>
                </Label>
                <Switch id="sms-notifications" />
              </div>
            </CardContent>
          </Card> */}
        {/* Connected Accounts */}
        {/* <Card>
            <CardHeader>
              <CardTitle>Связанные аккаунты</CardTitle>
              <CardDescription>
                Подключите ваши социальные сети для быстрого входа
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-5 w-5" />
                  <span>Google</span>
                </div>
                <Button variant="outline" size="sm">
                  Подключить
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-5 w-5" />
                  <span>Telegram</span>
                </div>
                <Button variant="outline" size="sm">
                  Подключить
                </Button>
              </div>
            </CardContent>
          </Card> */}
        {/* Session Management */}
        {/* <Card>
            <CardHeader>
              <CardTitle>Активные сессии</CardTitle>
              <CardDescription>
                Управляйте вашими активными сессиями на различных устройствах
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Chrome на Windows</p>
                    <p className="text-xs text-muted-foreground">
                      Последняя активность: 2 часа назад
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Safari на iPhone</p>
                    <p className="text-xs text-muted-foreground">
                      Последняя активность: 5 минут назад
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card> */}
        {/* <SubscriptionInfo /> */}
        <div className="bg-muted rounded-lg flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-semibold text-muted-foreground">
              Подписки отключены
            </span>
            <span className="max-w-md text-center font-medium text-muted-foreground">
              Платформа в активной разработке, на первое время подписки решено
              было отключить и сделать систему бесплатной
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <TruckInfoCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
