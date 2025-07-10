import { default as express } from "express";
import { FsStore } from "../models/fsStore.mjs";
import { getUser, readUsers } from "../models/user.mjs";
import { usersdir as dir } from '../app.mjs';
export const router = express.Router();

const fstore = new FsStore();
router.get("/add", async (req, res, next) => {
  try {
    if (req.query.user === "") {
      res.redirect('/user/login/?w=infoskill');
    }
    const user = await getUser(req.query.user, dir)
    res.render("addSkill", { title: 'Add Skill', id: req.query.user, user: user });
  } catch (error) {
    next(error)
  }

});

router.get("/edit", async (req, res, next) => {
  try {
    const user = await getUser(req.query.user, dir);
    console.log(user)
    const skill = await fstore.read(req.query.user, req.query.key);
    res.render("editSkill", { title: 'Add Skill', user: user, skill:skill });
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

router.get("/view", async (req, res, next) => {
  try {
    let selfUser;
    const user = await getUser(req.query.user, dir);
    const store = new FsStore;
    const skill = await store.read(req.query.id,  req.query.key);
    if(skill.id === req.query.user) {
      selfUser ="yes";
    }
    res.render("viewSkill", {title :`SkillShare:${skill.title}`,
    skill: skill , user: user, self: selfUser, comments: skill.comments});
  } catch (error) {
    next(error)
  }
})

router.get("/view/addcomment", async (req, res, next) => {
  try {
    
    const store = new FsStore();
    
    const updated = await store.addcomment(req.query.id, req.query.key, req.query.name, req.query.body)
    res.redirect(`/skill/view/?user=${req.query.user}&key=${req.query.key}&id=${req.query.id}`)
    
  } catch (error) {
    next(error)
  }
})

router.get("/update",async (req, res, next) => {
  try {
    const user = await getUser(req.query.user, dir);
    const newskill = await fstore.update(req.query.user, req.query.name, req.query.key, req.query.title, req.query.body)
    res.redirect(`/skill/view/?user=${req.query.user}&key=${req.query.key}&id=${req.query.user}&w=info`)
  } catch (error) {
    next(error)
  }
} )


