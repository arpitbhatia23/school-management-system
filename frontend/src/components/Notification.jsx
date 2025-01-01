import React, { useEffect,useState } from 'react'
import { Card ,CardContent,CardDescription,CardTitle} from './ui/card'
import { adminApi } from '@/services/adminapi';
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

      const { getNotification } = adminApi();
      
        const fetchnotgication = async () => {
          const res = await getNotification();
          console.log(res.data);
          if (res.data.success === true) {
            setnotifaction(res.data.data);
          }
        };

        useEffect(()=>{
fetchnotgication()
        },[])
  return (
    <div>
        <Card>
      <CardContent className="shadow-md shadow-black rounded-lg  ">
            <div className=" h-64 overflow-y-scroll p-2 scrollbar-hide">
              <CardTitle>Notifaction</CardTitle>

              {notification.map((item, index) => (
                <CardContent key={index} className="mb-4">
                  <CardTitle className="p-2">{item.title}</CardTitle>
                  <CardDescription className="flex gap-2 justify-between ">
                    <span>{item.description || item.message}</span>{' '}
                    <span>
                      {item.date ||
                        new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </CardContent>
              ))}
            </div>
          </CardContent>
          </Card>
    </div>
  )
}

export default Notification
