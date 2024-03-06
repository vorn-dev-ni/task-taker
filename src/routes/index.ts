import express, { NextFunction, Request, Response } from "express";
import { todoNoteController } from "../controller";
import { getDb } from "../lib/mongdb";
import { ObjectId } from "mongodb";


export const router = express.Router();
router.param(
  "id",
  async (req: Request, res: Response, next: NextFunction, val) => {
    if (val) {
      if (!ObjectId.isValid(val)) {
        return res.status(404).json({
          message: val + " does not exist ",
        });
      }
      const db = await getDb().db();
      const query = await db
        .collection("list")
        .find({ _id: new ObjectId(val ?? "") })
        .toArray();
      if (!query.length) {
        return res.status(404).json({
          message: val + " does not exist ",
        });
      }
    }
    return next();
  }
);
router.get("", todoNoteController.getNote);

router.post("/create", todoNoteController.postNote);

router
  .route("/:id")
  .get(todoNoteController.getSingleNote)
  .put(todoNoteController.updateNote)
  .delete(todoNoteController.deleteNote);
