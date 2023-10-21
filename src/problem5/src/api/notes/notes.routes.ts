import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as NoteHandlers from './notes.handlers';
import { Note } from './notes.model';

const router = Router();

router.get('/', NoteHandlers.findAll);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  NoteHandlers.findOne,
);

router.post(
  '/',
  validateRequest({
    body: Note,
  }),
  NoteHandlers.createOne,
);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Note,
  }),
  NoteHandlers.updateOne,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  NoteHandlers.deleteOne,
);

export default router;
