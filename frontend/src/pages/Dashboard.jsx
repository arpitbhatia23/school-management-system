import Addstudent from '@/components/Addstudent';
import Appsidebar from '@/components/ui/appsidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import React, { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useAuthApi } from '@/services/authapi';
import { logout as authlogout } from '@/store/slice';
const Dashboard = () => {
  const {logout}=useAuthApi()
  const location = useLocation();
  console.log(location.pathname);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment);
  console.log(pathSegments);

  const userData=useSelector(state=>state.auth.userData)
  console.log(userData)
  const handelLogout=async()=>{
     const res= await logout()
     console.log(res)
     if(res.data.success===true){
       dispatch(authlogout(null))
       navigate('/login')
     } 
  }
  return (
    <>
      <SidebarProvider>
        <Appsidebar />
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
                      segment.charAt(0).toUpperCase() +
                      segment.slice(1).replace(/-/g, ' ');
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem
                          className={isLast ? 'font-semibold' : ''}
                        >
                          {isLast ? (
                            <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                          ) : (
                            <Link
                              to={`/${pathSegments.slice(0, index + 1).join('/')}`}
                            >
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

            <Avatar className=' fixed right-4 border-2 border-gray-500 h-8 w-8 rounded-full '>
              <Popover>
                <PopoverTrigger asChild>
              <AvatarImage src={userData?.profile_image?.url} className="rounded-full"/>
              </PopoverTrigger>
              <AvatarFallback>cn</AvatarFallback>
              <PopoverContent className=" flex justify-center  items-center p-4 bg-white shadow-md rounded-md mx-2">
                <Button className="w-52" onClick={handelLogout}>logout</Button>
              </PopoverContent>
              </Popover>
            </Avatar>
          </header>

          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
