import { connect } from 'mongoose';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = 8000;
const MONGODB_URI =
  'mongodb+srv://ThisIsForSchool:lSaFPLvHIk2bPCCz@cluster0.mtqaf6e.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

try {
  const mongoConnect = async () => {
    await connect(MONGODB_URI);
  };

  mongoConnect();

  //   app.use('/restaurants', router);

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
} catch (err) {
  console.error(err);
}
