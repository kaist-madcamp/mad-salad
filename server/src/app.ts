require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user';
import morgan from 'morgan';

const app: express.Express = express();

console.log(process.env.DATABASE_URL);

app.set('port', process.env.PORT || 80);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),


  
);



app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello');
});

app.use('/api/user', userRouter);

app.listen(app.get('port'), () => {
  console.log(`✅ Server is Listening on port ${app.get('port')}`);
});
