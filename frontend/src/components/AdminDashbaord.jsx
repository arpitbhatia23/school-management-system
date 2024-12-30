 
 import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import { User } from 'lucide-react'
import { Separator } from './ui/separator'
 
 const AdminDashbaord = () => {
   return (
     <div >
        <Card className=" m-2 sm:m-20 p-10">
            <CardTitle >
                Admin Dashboard 
            </CardTitle>

            <CardContent className="grid grid-cols-4 gap-6 mt-4 ">
              <CardContent className="flex justify-evenly gap-x-8 bg-slate-600 rounded-lg py-2  items-center "> 
              <User/>

                 <div className='flex flex-col'>
                 <span>
                    student
                 </span>
                 <Separator/>
                 <span>
                    60000
                 </span>
                    </div>
                 </CardContent>

                 <CardContent className="flex justify-evenly gap-x-8 bg-slate-600 rounded-lg  py-2  items-center "> 
              <User/>

                 <div className='flex flex-col'>
                 <span>
                    teacher
                 </span>
                 <Separator/>

                 <span>
                    60000
                 </span>
                    </div>
                 </CardContent>
                 <CardContent className="flex justify-evenly gap-x-8 bg-slate-600 rounded-lg py-2  items-center "> 
              <User/>

                 <div className='flex flex-col'>
                 <span>
                    parents
                 </span>
                 <Separator/>

                 <span>
                    60000
                 </span>
                    </div>
                 </CardContent>
                 <CardContent className="flex justify-evenly gap-x-8 bg-slate-600 rounded-lg py-2  items-center "> 
              <User/>

                 <div className='flex flex-col '>
                 <span>
                    earings
                 </span>
                 <Separator/>

                 <span>
                    60000
                 </span>
                    </div>
                 </CardContent>
            </CardContent>

            <CardContent className="grid grid-cols-2 gap-6">

                <CardContent>

                </CardContent>


            </CardContent>
        </Card>


       
     </div>
   )
 }
 
 export default AdminDashbaord
 