import { connect } from 'mongoose';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { User } from './models/user.js';
import { GroupMessage } from './models/groupMessage.js';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const PORT = 3000;
const MONGODB_URI =
  'mongodb+srv://ThisIsForSchool:lSaFPLvHIk2bPCCz@cluster0.mtqaf6e.mongodb.net/test?retryWrites=true&w=majority';

const app = express();
app.use(express.static(path.join(__dirname, '/src/public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.get('/:room/messages', async function (req, res) {
  try {
    const room = req.params.room;
    console.log(room);

    const messages = await GroupMessage.find({ room });
    res.status(200).json(messages);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await User.findOne({ username });
    if (!user) throw new Error('invalid credentials');
    if (user.password == hash) {
      res.status(200).json({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      throw new Error('invalid credentials');
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post('/register', async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await User.create({
      username,
      firstName,
      lastName,
      password: hash,
    });
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:8082'],
  },
});

try {
  const mongoConnect = async () => {
    await connect(MONGODB_URI);
  };

  mongoConnect();
} catch (err) {
  console.error(err);
}

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  socket.on('send-message', async (message, room, username, persist = true) => {
    try {
      if (persist) {
        await GroupMessage.create({ from_user: username, room, message });
      }
    } catch (e) {
      console.log(e);
    }
    socket.to(room).emit('receive-message', message, username);
  });

  socket.on('join-room', (room, username, cb) => {
    socket.join(room);
    cb(`Joined the ${room} channel`);
  });
});

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));
