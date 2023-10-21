import { Response, Request, NextFunction } from "express";

import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { Note, NoteWithId } from "./notes.model";
import {
  createNote,
  findAndDelete,
  findAndUpdateNote,
  findNote,
  findNotes,
} from "./notes.services";

export async function findAll(
  req: Request,
  res: Response<NoteWithId[]>,
  next: NextFunction
) {
  try {
    const notes = await findNotes();
    res.json(notes);
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, NoteWithId, {}>,
  res: Response<NoteWithId>,
  next: NextFunction
) {
  try {
    const result = await findNote(req.params.id);
    if (!result) {
      res.status(404);
      throw new Error(`Note with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, NoteWithId, Note>,
  res: Response<NoteWithId>,
  next: NextFunction
) {
  try {
    const insertResult = await createNote(req.body);
    if (!insertResult.acknowledged) throw new Error("Error inserting note.");
    res.status(201).json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, NoteWithId, Note>,
  res: Response<NoteWithId>,
  next: NextFunction
) {
  try {
    const result = await findAndUpdateNote(req.params.id, req.body);
    if (!result.value) {
      res.status(404);
      throw new Error(`Note with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction
) {
  try {
    const result = await findAndDelete(req.params.id);
    if (!result.value) {
      res.status(404);
      throw new Error(`Note with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
