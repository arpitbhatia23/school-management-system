import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { studentapi } from '@/services/student';
import axios from 'axios';

function calculateAttendancePercentage(daysPresent, totalWorkingDays) {
  if (totalWorkingDays === 0) return 0; // Avoid division by zero
  return Math.floor((daysPresent / totalWorkingDays) * 100);
}
const StDashboard = () => {
  const[attendance,setattendance]=useState()
  const [idcard,setidcard]=useState()
  const navigate = useNavigate();
  const styling = [
    {
      text: 'text-white p-6 px-14',
      bgcolor: 'bg-orange-600',
      height: 'h-28 ',
    },
  ];
  const { getMonthlyAttendance,idCard } = studentapi();
  const userData = useSelector((state) => state.auth.userData);
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // getMonth() is zero-indexed (0 = January)
  const currentYear = currentDate.getFullYear();
  
  // Calculate the start and end dates of the current month
  const startOfMonth = new Date(currentYear, currentMonth, 1); // First day of the month
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0); // Last day of the month
  
  const fetchAttendance = async () => {
    const res = await getMonthlyAttendance({
      startDate: startOfMonth.toISOString().split('T')[0], // Format as YYYY-MM-DD
      endDate: endOfMonth.toISOString().split('T')[0], // Format as YYYY-MM-DD
    });

    if(res.data.success){
      setattendance(res.data.data)
    }
  
    // Handle the response as needed
  };
  const fetchCard=async()=>{
    const res=await idCard()
    if(res.data.success){
      setidcard(res.data.data)
    }
  }

  useEffect(()=>{
    fetchAttendance()
    fetchCard()

  },[])
  const currentMonthPresent = attendance?.filter(
    (record) => record.status === "present"
  )?.length;
  console.log("present",currentMonthPresent)
  
  const handeDownload = async () => {
    try {
      const res = await axios.get(idcard, {
        responseType: 'blob', // Ensure we get a Blob response
      });

      // Create a URL for the Blob
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${userData.name}.pdf`); // Set the download attribute
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object and remove the link
      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      console.log('Download initiated successfully.');
    } catch (error) {
      console.error('Something went wrong while downloading the file:', error);
    }
  }; 
  return (
    <>
      <Card className="m-20 mx-24">
        <CardTitle className="flex justify-center my-8 text-2xl">
          <h2>Welcome Back {userData?.name} </h2>
        </CardTitle>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {styling.map((styling, index) => (
            <>
              <Card
                className={`${styling.bgcolor} ${styling.height} `}
              >
                <h2 className={`${styling.text}`}>Monthly attendance {calculateAttendancePercentage(currentMonthPresent,attendance?.length)}%</h2>
              </Card>
              <Card
                className={`${styling.bgcolor} ${styling.height}`}
                onClick={() => {
                  navigate('/student/attendance');
                }}
              >
                <h2 className={`${styling.text}`}>Attendance </h2>
              </Card>
              <Card
                className={`${styling.bgcolor} ${styling.height}`}
                onClick={() => {
                  navigate('/student/notification');
                }}
              >
                <CardContent>
                  <h2 className={`${styling.text}`}>Notification</h2>
                </CardContent>
              </Card>
              <Card
                className={`${styling.bgcolor} ${styling.height}`}
                onClick={() => {
                  navigate('/student/result');
                }}
              >
                <h2 className={`${styling.text}`}>Result</h2>
              </Card>
              
                
              <Card
               
                className={`${styling.bgcolor} ${styling.height}`}
              >
                <h2 className={`${styling.text}`} onClick={handeDownload}> Download Id Card</h2>
              </Card>
            </>
          ))}
        </CardContent>
      </Card>
          </>
  );
};

export default StDashboard;
