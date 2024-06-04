import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APPOINTMENT, HOSPITALIZATION } from "@/Route/router-const";

const intro = [
  { title: "Welcome", href: "/#", description: "Lich sử phát triển của HealthCare" },
  { title: "About Us", href: "#about", description: "Đội ngũ nhân viên của HealthCare" },
  { title: "Booking", href: "#booking", description: "Đội ngũ nhân viên của HealthCare" },
  { title: "Meet Our Teams", href: "#veterinarian", description: "Đội ngũ nhân viên của HealthCare" },
  { title: "Customer Rating", href: "#rating", description: "Đội ngũ nhân viên của HealthCare" },
];

const shops = [
  { title: "Booking", href: `/${APPOINTMENT}`, description: "Dịch Vụ 1 description" },
  { title: "Hospitalization", href: `/${HOSPITALIZATION}`, description: "Dịch Vụ 2 description" },
];

export default function Header() {
  return (
    <div className="mt-[2.25rem] ml-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#F3F4F6]">Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {intro.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#F3F4F6]">Service</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                {shops.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-[#F3F4F6]`}>
              <Link to="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
              <Link to="/contact">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHashLink = href?.startsWith("#");

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHashLink) {
        event.preventDefault();
        const targetId = href?.slice(1);
        const targetElement = document.getElementById(targetId?.toString() ?? "");

        if (location.pathname === "/") {
          // Scroll to the target element if on the home page
          targetElement?.scrollIntoView({ behavior: "smooth" });
        } else {
          // Navigate to the home page and then scroll to the target element
          navigate("/");
          setTimeout(() => {
            document.getElementById(targetId?.toString() ?? "")?.scrollIntoView({ behavior: "smooth" });
          }, 100); // Delay to allow the navigation to complete
        }
      }
    };

    const resolvedLink = isHashLink ? `/#${href?.slice(1)}` : href;

    return (
      <li>
        <Link
          ref={ref}
          to={resolvedLink ?? "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
