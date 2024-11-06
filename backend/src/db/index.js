import mongoose from 'mongoose'
import {Db_NAME} from '../constant.js'

const dbconnect =async()=> {
    try {
        const connectioninstance= await mongoose.connect(`${process.env.MONGODB_URL}/${Db_NAME}`)
        console.log(`\n mongodb is connect db_host at ${connectioninstance.Connection.host}`)
    } catch (error) {
        console.log('connection error',error)
        process.exit(1)
    }
}
export default dbconnect