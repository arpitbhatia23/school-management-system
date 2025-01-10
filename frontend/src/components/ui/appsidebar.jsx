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
  icons,
  Book,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
 const [item,setitem]=useState([])
// Menu items.
const userData=useSelector(state=>state.auth.userData)
if(userData.role==="admin"){
  setitem([
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'Student',
      icon: Users,
      submenu: [
        {
          title: 'Students',
          url: '/getstudents',
          icon: User, // Represents individual student profiles
        },
        {
          title: 'Add Students',
          url: '/addstudent',
          icon: UserPlus, // Represents adding a new student
        },
        {
          title: 'Promote Students',
          url: '/promotestudent',
          icon: UserCheck, // Represents promotion or approval
        },
      ],
    },
    {
      title: 'parents',
      url: '/getparents',
      icon: Search,
    },
    {
      title: 'Teachers',
      icon: Users,
      submenu: [
        {
          title: 'Teachers',
          url: '/getteacher',
          icon: Users, // Represents a group of parents
        },
        {
          title: 'Add Teachers',
          url: 'addteacher',
          icon: UserPlus, // Represents adding a new parent
        },
      ],
    },
  
    {
      title: 'Accounts',
  
      icon: DollarSign,
      submenu: [
        { title: 'Students fee', url: '/addFees', icon: DollarSign },
        { title: 'get  students fees', url: '/getFees', icon: DollarSign },
        { title: 'Expenses', url: '/getexpense', icon: DollarSign },
        { title: 'ADD exprense', url: '/addExpenses', icon: DollarSign },
      ],
    },
    {
      title: 'subjects',
      url: '/addSubject',
      icon: Book,
    },
    {
      title: 'Settings',
      url: '/setting',
      icon: Settings,
    },
  ])
}
else if(userData.role==="teacher"){
  setitem([
   { title:"Dashboard",url:"#"},
   { title:"Atendence",url:"#"},
   { title:"Students",url:"#"},
   { title:"Assignement",url:"#"},
   { title:"Exam",url:"#"},
   { title:"Result",url:"#"},
   { title:"Setting",url:"#"},
  ])
}


export default function Appsidebar() {
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

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
              {item.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="px-0 py-1 border-b border-black"
                >
                  <SidebarMenuButton
                    asChild
                    className="peer-data-[active=true]/menu-button:opacity-100"
                  >
                    <div
                      onClick={() => item.submenu && toggleSubmenu(item.title)}
                      className="flex items-center justify-between w-full cursor-pointer"
                    >
                      <Link to={item.url}>
                        <div className="flex items-center">
                          <item.icon className="mr-2" />
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

                  {/* Submenu items */}
                  {item.submenu && expandedSubmenu === item.title && (
                    <div className="ml-6 mt-2">
                      {item.submenu.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              to={subItem.url}
                              className="flex items-center"
                            >
                              <subItem.icon className="mr-2" />
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
}
