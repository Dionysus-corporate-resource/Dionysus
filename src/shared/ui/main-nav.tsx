import { NavLink, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Coffee,
  Menu,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  UserCog2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { userStorageAtom } from "../model/atoms/user-atom";
import { useAtomValue } from "jotai";
import ThemeToggle from "@/feature/toggle-theme/toggle-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useAuth } from "@/app/providers/auth-provider";
// import { MobileNav } from "@/widgets/mobile/mobile-nav/mobile-nav";

export type Props = {
  headerContent: {
    logoTitle: string;
    linksMain: {
      icon?: React.ComponentType<{ className?: string }>;
      linkLabel: string;
      navigate: string;
    }[];
    linksFooter: {
      icon?: React.ComponentType<{ className?: string }>;
      linkLabel: string;
    }[];
  };
};

export function MainNav() {
  const userData = useAtomValue(userStorageAtom);
  const navigate = useNavigate();
  const user = useAuth();
  const headerContent: Props["headerContent"] = {
    logoTitle: "Груз Рынок",
    linksMain: [
      {
        icon: PackageSearch,
        linkLabel: "Смотреть заявки",
        navigate: "/",
      },
      {
        icon: PackageOpen,
        linkLabel: "Мои заявки",
        navigate: "/my-booking",
      },
      {
        icon: PackagePlus,
        linkLabel: "Создать заявку",
        navigate: "/create-booking",
      },
      // {
      //   icon: ALargeSmall,
      //   linkLabel: "Обсуждения",
      //   navigate: "/card-view",
      // },
      // {
      //   icon: Headset,
      //   linkLabel: "Поддержка",
      //   navigate: "/table-view",
      // },
    ],
    linksFooter: [
      {
        icon: BriefcaseBusiness,
        linkLabel: "Заявки",
      },
    ],
  };

  return (
    <div className="relative flex justify-between items-center gap-2 w-full sm:gap-4">
      <div className="flex items-center gap-4 sm:gap-12">
        <NavLink to="/landing" className="flex items-center space-x-2">
          {/* <img className="w-4 h-4  sm:w-6 sm:h-6" src="truck3.png" /> */}

          <span className="inline-block font-semibold text-sm sm:text-xl md:text-2xl">
            {headerContent.logoTitle}
          </span>
        </NavLink>
        {/* Навигация */}
        <nav className="flex gap-4 -mb-1 sm:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex gap-2 items-center text-sm font-medium transition-colors hover:primary ${
                isActive ? "text-primary" : "text-primary/60"
              }
              hidden text-xs sm:text-sm xl:flex`
            }
          >
            <PackageSearch className="w-3 h-3 sm:w-4 sm:h-4" />
            Смотреть заявки
          </NavLink>
          {headerContent.linksMain.map((link) => (
            <NavLink
              to={link.navigate}
              className={({ isActive }) =>
                `flex gap-2 items-center text-sm font-medium transition-colors hover:primary ${
                  isActive ? "text-primary" : "text-primary/60"
                }
                ${user?.token && user?.user?.roles === "customer" ? "" : "!hidden"}
                hidden text-xs sm:text-sm xl:flex`
              }
            >
              {link?.icon && <link.icon className="w-3 h-3 sm:w-4 sm:h-4" />}
              {link.linkLabel}
            </NavLink>
          ))}
          {user?.token && (
            <NavLink
              to="/proposals"
              className={({ isActive }) =>
                `flex gap-2 items-center text-sm font-medium transition-colors hover:primary ${
                  isActive ? "text-primary" : "text-primary/60"
                }
              hidden text-xs sm:text-sm xl:flex`
              }
            >
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
              Предложения
            </NavLink>
          )}
        </nav>
      </div>

      {/* <MobileNav /> */}
      <div className="flex gap-4 xl:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 mt-4">
            {headerContent.linksMain.map((nav) => (
              <DropdownMenuItem
                onClick={() => navigate(nav.navigate)}
                className="flex gap-4 justify-between"
              >
                <p>{nav.linkLabel}</p>
                {nav?.icon && <nav.icon className="w-4 h-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="flex gap-4 justify-between"
            >
              <p>Профиль</p>
              <UserCog2 className="w-4 h-4" />
            </DropdownMenuItem>
            {/* proposals */}
            {user?.token && (
              <DropdownMenuItem
                onClick={() => navigate("/proposals")}
                className="flex gap-4 justify-between"
              >
                <p>Предложения</p>
                <Coffee className="w-4 h-4" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {userData ? (
        <div className="items-center gap-0 hidden xl:flex text-primary">
          <NavLink to="/profile">
            <Button variant="link" className="text-xs sm:text-sm text-">
              {/* <UserCog className="w-4 h-4" /> */}
              Профиль
            </Button>
          </NavLink>
          <ThemeToggle />
        </div>
      ) : (
        <div className="hidden xl:block sm:space-x-2 text-white">
          <NavLink to="/register">
            <Button size="sm" variant="link">
              Зарегистрироваться
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button size="sm" variant="link">
              Войти
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
