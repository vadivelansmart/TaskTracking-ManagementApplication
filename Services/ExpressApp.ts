import express, {Application, Request, Response, NextFunction} from 'express';
import {UserRoute, TaskRoute, TeamRoute, CommentRoute} from '../routes'
import { Server } from 'socket.io';
import http from 'http';

export const App =  async(app: Application) => {
    const server = http.createServer(app);
    const io = new Server(server);
    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
        });
    });
    app.set('io', io);
    app.use(express.json());
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ message: 'Something went wrong!' });
    });
    app.get('/', (req, res) => {
        res.send("hellow World");
    })
    app.use('/users', UserRoute);
    app.use('/task', TaskRoute);
    app.use('/team', TeamRoute);
    app.use('/comment', CommentRoute);
    return app
}