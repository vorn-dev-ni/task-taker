import { Express, Response, Request, NextFunction } from "express";
import { getDb } from "../lib/mongdb";
import { ObjectId } from "mongodb";
import { ErrorResponse } from "../utils/Error";
export const checkValidaion = (
  next: NextFunction,
  text: string,
  status?: boolean,
  completed?: boolean,
  method?: "post" | "patch"
) => {
  if (!text) {
    const errorResponse = new ErrorResponse("Text Must not be empty ", 400);
    return next(errorResponse);
  }
  if (text.length <= 3) {
    const errorResponse = new ErrorResponse(
      "Text length must be at least 3 character",
      400
    );

    return next(errorResponse);
  }
  if (method === "patch") {
    console.log(typeof status);
    if (status || completed) {
      if (typeof status !== "boolean"   || typeof completed !== "boolean" ) {
        const errorResponse = new ErrorResponse(
          "Invalid status or complete must be true or false ",
          400
        );
        return next(errorResponse);
      }
    }
  }
};
export const getNote = async (req: Request, res: Response) => {
  const db = getDb().db();
  const query = await db
    .collection("list")
    .find()
    .sort({ _id: "asc" })
    .toArray();

  res.json(query);
};
export const postNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text } = req.body as { text: string };
  checkValidaion(next, text, true, true, "post");
  const db = getDb().db();
  try {
    const query = await db.collection("list").insertOne({
      text,
      created_date: Date.now(),
      status: false,
      completed: false,
    });

    res.status(200).json({
      data: req.body,
    });
  } catch (error) {
  } finally {
  }
};
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, status, completed } = req.body as {
    text: string;
    status: boolean;
    completed: boolean;
  };

  checkValidaion(next, text, status, completed, "patch");

  const db = getDb().db();
  try {
    const query = await db.collection("list").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      }
    );

    res.status(200).json({
      response: "data has been updated",
      status: 203,
      data: req.body,
    });
  } catch (error) {
    next(error);
  } finally {
  }
};
export const getSingleNote = async (req: Request, res: Response) => {
  const db = getDb().db();

  const query = await db
    .collection("list")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json(query);
};
export const deleteNote = async (req: Request, res: Response) => {
  const db = getDb().db();
  const query = await db
    .collection("list")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.json(query);
};
