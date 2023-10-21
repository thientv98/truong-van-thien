import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import notes from './notes/notes.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API',
  });
});

router.use('/notes', notes);

export default router;
