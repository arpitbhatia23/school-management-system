import React from 'react'
import {
    Collapsible, 
    CollapsibleContent, 
    CollapsibleTrigger,

}from "@/components/ui/collapsible"
import {  SidebarMenu,SidebarMenuSub,SidebarMenuItem,SidebarMenuSubItem,SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar'
const Navbar = () => {
  return (
    <div>
        <SidebarProvider>
      <SidebarMenu>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem />
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</SidebarMenu>
</SidebarProvider>
    </div>
  )
}

export default Navbar
