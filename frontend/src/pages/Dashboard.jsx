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

import { useAuthApi } from '@/services/authapi';
import { logout as authlogout } from '@/store/slice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
const Dashboard = () => {
  const { logout ,updateImage} = useAuthApi();
  const location = useLocation();
  console.log(location.pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment);
  console.log(pathSegments);

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const handelLogout = async () => {
    const res = await logout();
    console.log(res);
    if (res.data.success === true) {
      dispatch(authlogout(null));
      navigate('/login');
    }
  };

  const form = useForm({
    defaultValues: {
      newPassword: '',
      oldPassword: '',
    },
  });
  const handelchangepassword = async (data) => {
    const { changePassword } = useAuthApi();
    const res = await changePassword(data);
    console.log(res.data);
    if (res.data.success) {
      toast({
        title: 'success',
        description: 'password change sucessfully',
      });
    } else {
      toast({
        title: 'failed',
        description: res.data.message,
        variant: 'destructive',
      });
    }
  };

  const [image,setimage]=useState()
  console.log(image)

 const handelupdateprofileimage=async()=>{
  console.log(image)
 const res=await updateImage({profile_image:image})
 console.log(res.data)
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className=" fixed right-4 border-2 border-gray-500 h-8 w-8 rounded-full ">
                  <AvatarImage
                    src={userData?.profile_image?.url}
                    className="rounded-full"
                  />
                  <AvatarFallback>cn</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" w-52 flex flex-col  mx-6">
                <DropdownMenuLabel>MY ACCOUNT</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        profile
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>PROFILE</DialogTitle>
                      <DialogDescription className="flex justify-center items-center">
                        <img
                          src={userData?.profile_image?.url}
                          alt=""
                          className="h-52 w-52"
                        />
                      </DialogDescription>
                      <DialogDescription className="flex  flex-col items-center gap-2">
                        <DialogDescription>
                          NAME:{userData?.name}
                        </DialogDescription>
                        <DialogDescription>
                          GENDER:{userData?.gender}
                        </DialogDescription>
                        <DialogDescription>
                          EMAIL:{userData?.email}
                        </DialogDescription>
                        <DialogDescription>
                          PHONE NO :{userData?.phone_no}
                        </DialogDescription>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Change Password
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <Form {...form}>
                      <DialogContent>
                        <DialogTitle>Change Password</DialogTitle>
                        <form
                          onSubmit={form.handleSubmit(handelchangepassword)}
                          className="flex flex-col gap-6"
                        >
                          <FormField
                            control={form.control}
                            name="newPassword"
                            rules={{ required: 'New password is required' }}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter new password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="oldPassword"
                            rules={{ required: 'old password is required' }}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter new password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            onClick={() => console.log('click')}
                          >
                            submit
                          </Button>
                        </form>
                      </DialogContent>
                    </Form>
                  </Dialog>

                 <Dialog>
                  <DialogTrigger>

                <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                  update profile image
                </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>update title</DialogTitle>
                    <DialogDescription>

                    <Input type="file"  onChange={e=>setimage(e?.target?.files[0])}/>
                    <Button onClick={handelupdateprofileimage} className="mt-2" >submit</Button>
                    </DialogDescription>
                  </DialogContent>
                 
                </Dialog>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handelLogout}>
                  <LogOut />
                  logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
