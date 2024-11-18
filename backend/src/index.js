import os from 'os';
import cluster from 'cluster';
import dbconnect from './db/index.js';
import app from './app.js';

const numcpus = os.cpus().length;
if (cluster.isPrimary) {
    console.log(`masterprocessor is runnig.forking ${numcpus}`);
    for (let i = 0; i < numcpus; i++) {
        cluster.fork();
        cluster.on(`exit`, (Worker) => {
            console.log(`worker ${Worker.process.pid} died.forking a new worker`);
            cluster.fork();
        });
    }
} else {
    dbconnect()
        .then(() => {
            const port = process.env.PORT || 8080;
            app.listen(port, () => {
                console.log(`server is running on port ${port} by worker ${process.pid}`);
            });
        })
        .catch((error) => {
            console.error(`fail to connect database ${error.message}`);
        });
}
