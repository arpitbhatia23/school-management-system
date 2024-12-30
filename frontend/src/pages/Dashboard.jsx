import Addstudent from '@/components/Addstudent'
import Appsidebar from '@/components/ui/appsidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator';
import React, { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Outlet, useLocation,Link } from 'react-router-dom';

const Dashboard = () => {
 const location=useLocation()
 console.log(location.pathname)
 const pathSegments = location.pathname.split('/').filter((segment) => segment);
 console.log(pathSegments)
  return (
    <>
<SidebarProvider>
  <Appsidebar/>
  <SidebarInset>
<header className="flex h-16 shrink-0 items-center bg-white border-b border-gray-500 gap-2 transition-[width,height] ease-linear fixed w-full top-0 z-50 ">
  <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className=" -ml-1" />
      <Separator className="h-4 mr-2 " orientation="vertical " />

      <Breadcrumb>
                <BreadcrumbList>
                  {pathSegments.map((segment, index) => {
                    const isLast = index === pathSegments.length - 1;
                    const formattedSegment =
                      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                    return (
                      < Fragment key={index} >
                        <BreadcrumbItem  className={isLast ? 'font-semibold' : ''}>
                          {isLast ? (
                            <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                          ) : (
                            <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                              {formattedSegment}
                            </Link>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
      </div>
   </header>
   
          <Outlet/>
  </SidebarInset>
</SidebarProvider>
       
        
      
    </>
  )
}

export default Dashboard
