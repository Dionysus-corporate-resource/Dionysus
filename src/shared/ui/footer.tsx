import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { NavLink, useNavigate } from "react-router";

export function SiteFooter() {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Груз рынок</h3>
            <p className="text-slate-400">
              Надежные логистические решения для вашего бизнеса. Предоставляем
              удобный поиск грузов и перевозчиков.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+7 (918) 522-96-65</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>skorohodroman921@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Ростов-на-Дону, ул. Фунзе 3</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Услуги</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/create-booking" className="hover:text-background">
                  Размещение заявок
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-background">
                  Поиск перевозчиков
                </NavLink>
              </li>
              {/* <li>
                <a href="#" className="hover:text-background">
                  Таможенное оформление
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background">
                  Мультимодальные перевозки
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background">
                  Экспресс-доставка
                </a>
              </li> */}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Компания</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://t.me/gruzrynok"
                  className="hover:text-background"
                >
                  Телеграмм канал
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/gruzrynokSupport"
                  className="hover:text-background"
                >
                  Написать в поддержку
                </a>
              </li>

              {/* <li>
                <a
                  href="#"
                  className="hover:text-background"
                >
                  О нас
                </a>
              </li> */}
              {/* <li>
                <a href="#" className="hover:text-background">
                  Новости
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background">
                  Карьера
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background">
                  Отзывы клиентов
                </a>
              </li> */}
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold">Подпишитесь на новости</h4>
            <p className="text-slate-400">
              Получайте последние новости и специальные предложения
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Ваш email"
                className="bg-slate-800 text-slate-200 placeholder:text-slate-400"
              />
              <Button>Подписаться</Button>
            </div>
            <div className="text-sm text-slate-400">
              Нажимая кнопку "Подписаться", вы соглашаетесь с условиями
              обработки персональных данных
            </div>
          </div> */}
          {/* Предложения */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">
              Помогите улучшить платформу
            </h4>
            <p className="text-slate-400">
              Пишите свои предложения по разработке, добавления новых функций
              или, если нашли ошибки на сайте
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/proposals")}
                variant="secondary"
              >
                Написать предложение
              </Button>
            </div>
            <div className="text-sm text-slate-400">
              По вопросам сотрудничества пишите в поддержку{" "}
              <a
                href="https://t.me/gruzrynokSupport"
                className="hover:text-background"
              >
                @gruzrynokSupport
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <div className="flex gap-4">
            <a href="#" className="hover:text-background">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-background">
              Условия использования
            </a>
          </div>
          <div>© 2025 Груз рынок. Все права защищены.</div>
        </div>
      </div>
    </footer>
  );
}
