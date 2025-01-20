import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  UserPlus,
  Users,
  UserCheck,
  Book,
  DollarSign,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppSidebar = () => {
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.role === 'admin') {
      setMenuItems([
        {
          title: 'Dashboard',
          url: '/',
          icon: Home,
        },
        {
          title: 'Student',
          icon: Users,
          submenu: [
            { title: 'Students', url: '/getstudents', icon: User },
            { title: 'Add Students', url: '/addstudents', icon: UserPlus },
            {
              title: 'Promote Students',
              url: '/promotestudents',
              icon: UserCheck,
            },
          ],
        },
        {
          title: 'Parents',
          url: '/getparents',
          icon: Search,
        },
        {
          title: 'Teachers',
          icon: Users,
          submenu: [
            { title: 'Teachers', url: '/getteachers', icon: Users },
            { title: 'Add Teachers', url: '/addteachers', icon: UserPlus },
          ],
        },
        {
          title: 'Accounts',
          icon: DollarSign,
          submenu: [
            { title: 'Students Fee', url: '/addFees', icon: DollarSign },
            { title: 'Get Students Fees', url: '/getFees', icon: DollarSign },
            { title: 'Expenses', url: '/getexpenses', icon: DollarSign },
            { title: 'Add Expense', url: '/addExpenses', icon: DollarSign },
          ],
        },
        {
          title: 'Subjects',
          url: '/addSubjects',
          icon: Book,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ]);
    } else if (userData?.role === 'teacher') {
      setMenuItems([
        { title: 'Dashboard', url: '/teacher', icon: Home },

        { title: 'Attendance', url: 'attendance', icon: Calendar },
        { title: 'Students', url: 'Getstudents', icon: Users },
        { title: 'Assignments', url: 'assignments', icon: Inbox },
        { title: 'Exams', url: 'exams', icon: Search },
        { title: 'Results', url: 'results', icon: UserCheck },
        { title: 'Settings', url: '/settings', icon: Settings },
      ]);
    } else if (userData?.role === 'student') {
      setMenuItems([
        { title: 'Dashboard', url: '/student', icon: Home },
        { title: 'Result', url: 'result', icon: UserCheck },
        { title: 'Attendance', url: 'attendance', icon: UserCheck },
        { title: 'Subject', url: 'subject', icon: UserCheck },

        { title: 'Datesheet', url: 'datesheet', icon: Search },

        { title: 'Setting', url: 'setting', icon: Settings },
      ]);
    }
  }, [userData?.role]);

  const toggleSubmenu = (title) => {
    setExpandedSubmenu((prev) => (prev === title ? null : title));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="px-0 py-0">
          <SidebarGroupLabel className="text-sm text-black font-bold rounded-none bg-orange-600 py-8 flex-row justify-center items-center">
            School Management System
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-0 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="px-0 py-1 border-b border-black"
                >
                  <SidebarMenuButton asChild>
                    <div
                      onClick={() => item.submenu && toggleSubmenu(item.title)}
                      className="flex items-center justify-between w-full cursor-pointer"
                    >
                      <Link to={item.url}>
                        <div className="flex items-center">
                          {item.icon && <item.icon className="mr-2" />}
                          <span>{item.title}</span>
                        </div>
                      </Link>
                      {item.submenu &&
                        (expandedSubmenu === item.title ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        ))}
                    </div>
                  </SidebarMenuButton>
                  {item.submenu && expandedSubmenu === item.title && (
                    <div className="ml-6 mt-2">
                      {item.submenu.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              to={subItem.url}
                              className="flex items-center"
                            >
                              {subItem.icon && (
                                <subItem.icon className="mr-2" />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
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
