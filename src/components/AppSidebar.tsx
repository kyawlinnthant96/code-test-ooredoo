import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Package, SquareMenu } from 'lucide-react';
import { useLocation } from 'react-router';

const items = [
    {
        title: 'Categories',
        url: '/admin/dashboard',
        icon: SquareMenu,
    },
    {
        title: 'Items',
        url: '/admin/dashboard/items',
        icon: Package,
    },
];

const AppSidebar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader className='text-2xl'>Dashboard</SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='gap-2'>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                    >
                                        <a href={item.url}>
                                            <item.icon className='!h-6 !w-6' />
                                            <span className='text-lg'>
                                                {item.title}
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
