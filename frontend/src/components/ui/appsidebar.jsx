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
} from "lucide-react";
import { useState } from "react";

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
  SidebarRail
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Student",
    url: "#",
    icon: Users,
    submenu: [
      {
        title: "Students",
        url: "#",
        icon: User, // Represents individual student profiles
      },
      {
        title: "Add Students",
        url: "#",
        icon: UserPlus, // Represents adding a new student
      },
      {
        title: "Promote Students",
        url: "#",
        icon: UserCheck, // Represents promotion or approval
      },
    ],
  },
  {
    title: "parents",
    url: "#",
    icon: Search,
  },
  {
    title: "Teachers",
    url: "#",
    icon: Users,
    submenu: [
      {
        title: "Teachers",
        url: "#",
        icon: Users, // Represents a group of parents
      },
      {
        title: "Add Teachers",
        url: "#",
        icon: UserPlus, // Represents adding a new parent
      },
    ],
  },
  
  {
    title: "Accounts",
    url: "#",
    icon: DollarSign,
    submenu:[
      {title:"Fee groups",url:"#" , icon:DollarSign},
      {title:"Students fee",url:"#",icon:DollarSign},
      {title:"Expenses",url:"#",icon:DollarSign},
      {title:"ADD exprense",url:"#",icon:DollarSign}
    ]
  },
  {
    title: "subjects",
    url: "#",
    icon:Book
  },
  {
    title: "Settings",
    url: "#",
    icon:Settings
  }
];

export default function Appsidebar() {
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
 
  const toggleSubmenu = (title) => {
    setExpandedSubmenu((prev) => (prev === title ? null : title));
  };

  return (
    <SidebarProvider>
      <SidebarTrigger/>
      <Sidebar collapsible={"icon"} >
      <SidebarRail/>
        <SidebarContent>
          <SidebarGroup className="px-0 py-0">
            <SidebarGroupLabel className="text-sm text-black font-bold rounded-none bg-orange-600 py-8 flex-row justify-center items-center">
              School Management System     
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-0 py-4">
              <SidebarMenu >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="px-0 py-1 border-b border-black">
                    <SidebarMenuButton asChild className="peer-data-[active=true]/menu-button:opacity-100" >
                      <div
                        onClick={() => item.submenu && toggleSubmenu(item.title)}
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </div>
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
                              <a href={subItem.url} className="flex items-center">
                                <subItem.icon className="mr-2" />
                                <span>{subItem.title}</span>
                              </a>
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
    </SidebarProvider>
  );
}
