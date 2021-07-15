import express, { Request, Response, Router } from 'express';
import { read } from 'fs';
import client from '../client';
const { user } = client;

const userRouter: express.Router = express.Router();

userRouter.get('/', async (_, res: Response) => {
  res.send('user root');
});

userRouter.get('/getall', async (_, res: Response) => {
  const users = await user.findMany({
    select: {
      id: true,
      password: true,
      email: true,
      name: true,
    },
  });
  res.json(users);
});

userRouter.post('/getOne', async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExist = await user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: "user doesn't",
    });
  }

  res.json(userExist);
});

userRouter.post('/join', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const userExist = await user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (userExist) {
    return res.status(400).json({
      msg: 'user already exists',
    });
  }

  const newUser = await user.create({
    data: {
      password,
      email,
      name,
    },
  });
  res.json(newUser);
});

userRouter.post('/update', async (req: Request, res: Response) => {
  const { email, password, newPassword, newName } = req.body;
  const userExist = await user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: "user doesn't exit",
    });
  }
  if (userExist.password == password) {
    const updateUser = await user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
        name: newName,
      },
    });
    res.status(200).json(updateUser);
    //res.status(200).json({msg:"test msg"})
  } else {
    res.status(401).json({ msg: 'wrong password' });
  }
});

userRouter.post('/unroll', async (req: Request, res: Response) => {
  console.log('/api/user/unroll');
  const { email, password } = req.body;

  const userExist = await user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: "user doesn't exist",
    });
  }
  if (userExist.password == password) {
    const deleteUser = await user.delete({
      where: {
        email,
      },
    });
    console.log(deleteUser);
    res.status(200).json({ msg: 'deleted' });
  } else {
    res.status(401).json({ msg: 'password incorrect' });
  }
});

export = userRouter;
