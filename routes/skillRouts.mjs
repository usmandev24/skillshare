import { default as express } from "express";
import { FsStore } from "../models/fsStore.mjs";
export const router = express.Router();

router.get("/add", (req, res , next) => {
  res.render("edit", {title: 'Add Skill'});
});

router.post("/save", async (req, res, next) => {
  try {
    let skill;
    const store = new FsStore;
    skill = await store.create(req.body.name, req.body.key, req.body.title, req.body.body)
    res.redirect("/")
  } catch (error) {
    next(error)
  }
})

