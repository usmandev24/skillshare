import { default as express } from "express";
import { FsStore } from "../models/fsStore.mjs";
import { getUser, readUsers } from "../models/user.mjs";
import { usersdir as dir } from '../app.mjs';
export const router = express.Router();

router.get("/add", async (req, res, next) => {
  try {
    if (req.query.user === "") {
      res.redirect('/user/login');
    }
    const user = await getUser(req.query.user, dir)
    res.render("addSkill", { title: 'Add Skill', id: req.query.user, user: user });
  } catch (error) {
    next(error)
  }

});

router.get("/edit", async (req, res, next) => {
  try {
    const user = await getUser(req.query.id, dir);
    res.render("editSkill", { title: 'Add Skill', id: req.query.user, user: user });
  } catch (error) {
    next(error)
  }

});

router.get("/save", async (req, res, next) => {
  try {
    let skill;
    const store = new FsStore;
    skill = await store.create(req.query.user, req.query.name, req.query.key, req.query.title, req.query.body)
    res.redirect("/?user="+req.query.user)
  } catch (error) {
    next(error)
  }
})

