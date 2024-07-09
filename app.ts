import express  from "express";
import {dbConnection, App} from './Services';
const StartServer = async() => {
    const app = express();
    await dbConnection();
    await App(app);
app.listen(3000, () => {    
    console.log(`Listening to port 3000`);
})
}
StartServer();
