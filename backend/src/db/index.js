import mongoose from 'mongoose';
import { Db_NAME } from '../constant.js';
import dns from "dns/promises"
const dbconnect = async () => {
    try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URL}/${Db_NAME}`);
        console.log(`\n mongodb is connect || db_host at ${connectioninstance.connection.host}`);
    } catch (error) {
        console.log('connection error', error);
        process.exit(1);
    }
};
export default dbconnect;
