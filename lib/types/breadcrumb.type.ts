export interface BreadcrumbItem {
  label?: string;
  href: string;
  isActive?: boolean;
}

export interface MenuItem {
  title: string;
  href?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}