import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { useNavigate } from 'react-router-dom'


const StDashboard = () => {
   const navigate = useNavigate()
    const styling = [{
        text:'text-white p-6 px-14',
        bgcolor:"bg-orange-600",
        height:'h-28 '
    }]
  return (
    <>
    <Card className='m-20 mx-24'>
        <CardTitle className='flex justify-center my-8 text-2xl'><h2>Welcome Back ------ </h2></CardTitle>
        <CardContent className='grid grid-cols-3 gap-8'>
            {styling.map((styling,index)=>(
 <>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height} `}
 >
    <h2 className={`${styling.text}`}>Monthly attendance %</h2>

 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 >
    <h2 className={`${styling.text}`}>Attendance</h2>
 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 onClick={navigate('/student/notification')}
 >
    <h2 className={`${styling.text}`} >Notification</h2>

 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 >
    <h2 className={`${styling.text}`}>Result</h2>

 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 >
    <h2 className={`${styling.text}`}>Fees</h2>

 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 >
    <h2 className={`${styling.text}`}>Syllabus</h2>

 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 >
    <h2 className={`${styling.text}`}>Profile</h2>

 </Card>
 <Card
 key={index}
 className={`${styling.bgcolor} ${styling.height}`}
 >
    <h2 className={`${styling.text}`}>Download Id Card</h2>

 </Card>
 </>

 
            ))}
        </CardContent>
    </Card>
      
    </>
  )
}

export default StDashboard
