import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { adminApi } from '@/services/adminapi';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { DialogDescription } from '@radix-ui/react-dialog';
const Notification = () => {
  const [notification, setnotifaction] = useState([
    {
      title: 'System Update',
      description: 'A new system update is available.',
      date: '2024-12-30',
      time: '10:30 AM',
    },
    {
      title: 'Meeting Reminder',
      description: 'Team meeting scheduled for today.',
      date: '2024-12-30',
      time: '11:00 AM',
    },
    {
      title: 'Password Expiry',
      description: 'Your password will expire in 3 days.',
      date: '2024-12-30',
      time: '12:00 PM',
    },
    {
      title: 'New Message',
      description: 'You have a new message from HR.',
      date: '2024-12-30',
      time: '1:15 PM',
    },
  ]);

  const { getNotification, delNoification, addnotification } = adminApi();

  const fetchnotgication = async () => {
    const res = await getNotification();
    if (res.data.success === true) {
      setnotifaction(res.data.data);
    }
  };

  const handeldelete = async (data) => {
    console.log(data);
    const res = await delNoification(data);
    if (res.data.success) {
      setnotifaction((prev) => prev.filter((prev) => prev._id !== data));
      toast({
        title: 'success',
        description: 'notification delete successfully',
      });
    } else {
      toast({
        title: 'failed',
        description: res.data.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchnotgication();
  }, [addnotification]);

  const form = useForm({
    defaultValues: {
      title: '',
      message: '',
    },
  });
  const handeladdnotification = async (data) => {
    console.log(data);
    const res = await addnotification(data);
    if (res.data.success) {
      toast({
        title: 'success',
        description: 'notifcationa addedd successfully',
      });
    } else {
      toast({
        title: 'failed',
        description: res.data.message,
        variant: 'destructive',
      });
    }
  };
  return (
    <div>
      <Card>
        <CardContent className="shadow-md shadow-black rounded-lg  ">
          <div className=" h-64 overflow-y-scroll p-2 scrollbar-hide">
            <CardTitle className="flex justify-between realtive top-0 ">
              Notifaction
              <Dialog>
                <DialogTrigger>
                  <Plus />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add Notification</DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handeladdnotification)}
                        className="grid grid-cols-1 gap-5"
                      >
                        <FormField
                          name="title"
                          control={Form.control}
                          rules={{ required: 'title is required' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="enter title of notification"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="message"
                          control={Form.control}
                          rules={{ required: 'discription is required' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="enter title of notification"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <DialogFooter>
                          <Button type="submit">submit</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <Separator />

            {notification?.map((item, index) => (
              <CardContent key={index} className="mb-4">
                <CardTitle className="p-2">{item.title}</CardTitle>
                <CardDescription className="flex gap-2 justify-between ">
                  <span>{item.description || item.message}</span>{' '}
                  <span>
                    {item.date || new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    className="bg-red-500"
                    onClick={() => handeldelete(item._id)}
                  >
                    delete
                  </Button>
                </CardDescription>
              </CardContent>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification;
