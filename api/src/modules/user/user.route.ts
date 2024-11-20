import { Router } from 'express';

import { UpdateUserDto } from './user.dto';
import { userService } from './user.service';

const router = Router();

router.get('/users/:userId', async (_, res) => {
  try {
    const result = await userService.getUserById(Number(_.params.userId));
    res.json({
      code: 0,
      data: result || null,
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error,
    });
  }
});

router.put('/users/:userId', async (_, res) => {
  const updateData: UpdateUserDto = _.body;
  if (updateData.tel_no === undefined) {
    res.json({
      code: -1,
      message: 'tel_no is required',
      data: null,
    });
    return;
  }
  if (updateData.username === undefined) {
    res.json({
      code: -1,
      message: 'username is required',
      data: null,
    });
    return;
  }
  const user = await userService.getUserById(Number(_.params.userId));
  if (!user) {
    res.json({
      code: -1,
      message: '该用户不存在',
    });
  }
  try {
    const result = await userService.updateUserById(Number(_.params.userId), updateData);
    res.json({
      code: 0,
      data: result,
    });
  } catch (error) {
    res.json({
      code: -1,
      message: error,
    });
  }
});

export { router as userRouter };
