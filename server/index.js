import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
const server=http.createServer(app);
const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
