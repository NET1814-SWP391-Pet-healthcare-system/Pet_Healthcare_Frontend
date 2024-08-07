import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenu
} from '@/components/ui/navigation-menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APPOINTMENT, HOSPITALIZATION_INTRO } from '@/Route/router-const';

const intro = [
  {
    title: 'Welcome',
    href: '/#',
    description: 'Discover the journey of HealthCare’s evolution.'
  },
  {
    title: 'About Us',
    href: '#about',
    description: 'Learn about our dedicated team and mission.'
  },
  {
    title: 'Booking',
    href: '#booking',
    description: 'Book your next appointment with ease.'
  },
  {
    title: 'Meet Our Vets',
    href: '#veterinarian',
    description: 'Get to know our skilled veterinary professionals.'
  },
  {
    title: 'Customer Rating',
    href: '#rating',
    description: 'See what our clients have to say about our services.'
  }
];

const shops = [
  {
    title: 'Booking',
    href: `/${APPOINTMENT}`,
    description: 'Schedule your service appointments here.'
  },
  {
    title: 'Hospitalization',
    href: `/${HOSPITALIZATION_INTRO}`,
    description: 'Explore our top-tier hospitalization services.'
  }
];

export default function Header() {
  return (
    <div className='mt-[2.25rem] ml-10'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-[--nav-button]'>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {intro.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-[--nav-button]'>Service</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] '>
                {shops.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to='/about'
              className={`${navigationMenuTriggerStyle()}`}
              style={{ backgroundColor: 'var(--nav-button)' }}
            >
              About
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to='/contact'
              className={`${navigationMenuTriggerStyle()}`}
              style={{ backgroundColor: 'var(--nav-button)' }}
            >
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  { title: string; children: React.ReactNode; href: string; className?: string }
>(({ className, title, children, href, ...props }, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHashLink = href.startsWith('#');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isHashLink) {
      event.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (location.pathname === '/') {
        // Scroll to the target element if on the home page
        targetElement?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to the home page and then scroll to the target element
        navigate('/');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Delay to allow the navigation to complete
      }
    } else {
      // Navigate to a different page
      navigate(href);
      // Scroll to the top of the page when navigating to a different page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <li>
      <div
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className='text-sm font-medium leading-none'>{title}</div>
        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
      </div>
    </li>
  );
});

ListItem.displayName = 'ListItem';
