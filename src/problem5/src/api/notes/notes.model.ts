import { WithId } from 'mongodb';
import * as z from 'zod';
import { db } from '../../db';

export const Note = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
});

export type Note = z.infer<typeof Note>;
export type NoteWithId = WithId<Note>;
export const Notes = db.collection<Note>('notes');
