import { Note, Notes } from './notes.model';
import { ObjectId } from 'mongodb';

export const findNotes = async () => {
  return Notes.find().toArray();
};

export const findNote = async (id: string) => {
  return Notes.findOne({
    _id: new ObjectId(id),
  });
};

export const createNote = async (note: Note) => {
  return Notes.insertOne(note);
};

export const findAndUpdateNote = async (id: string, note: Note) => {
  return Notes.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: note,
    },
    {
      returnDocument: 'after',
    },
  );
};

export const findAndDelete = async (id: string) => {
  return Notes.findOneAndDelete({
    _id: new ObjectId(id),
  });
};
