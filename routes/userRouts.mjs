import { default as express } from 'express';
import { User, saveUser, readUsers, isUser, auth, getUser } from '../models/user.mjs';
export const router = express.Router();

import { usersdir as dir } from '../app.mjs';
import { readAutherSkills } from '../models/fsStore.mjs';
import { skillsdir } from '../app.mjs';

router.get('/', async (req, res, next) => {
  try {
    const user = await getUser(req.query.user, dir);
    console.log(user)
    if (user) {
      res.render("new-account", {
        title: 'Skillshare: about ' + user.id, notEdit: true, user: user, id: user.id,
        heading: "User Acconut Info"
      })
    } else {
      res.redirect("/?user=");
    }
  } catch (error) {
    next(error)
  }
})

router.get("/new-account", (req, res, next) => {
  if(!req.query.w) {
    res.render('new-account', { title: 'SkillShare: New Account', new: true, heading: "Enter Details To Create Acount" })
  } else {
    res.render('new-account', {
        title: 'SkillShare: New Account', new: true,
        heading: "Enter Details To Create Acount",
        notwar: 'yes', wtype: "error",
        war: "Error: Already This ID exist"
      })
  }
})

router.get("/login", (req, res, next) => { console.log(typeof(req.query.w))
  if (!req.query.w) {
    res.render('login', { title: 'SkillShare: Login' })
  } else if (req.query.w =="info") {
    res.render('login', { title: 'SkillShare: Login',
      notwar:"ueu", wtype:"info",  war:"Account created Successfully. Now You can login."
     })
  } else if (req.query.w == "error") {
    res.render('login', { title: 'SkillShare: Login',
      notwar:"ueu", wtype:"error",  war:"No such ID, or password Incorrect"
     })
  }
  
})

router.get('/edit', async (req, res, next) => {
  try {
    const user = await getUser(req.query.user, dir);
    console.log(user)
    if (user) {
      res.render("new-account", {
        title: 'Skillshare: Update:' + user.id, notEdit: false, editing: true, user: user,
        id: user.id, heading: "Enter Details To Update Account",
        war: "Do not change Id. Changing Id will create new account  ", notwar: "yes", wtype:"warning"
      })
    } else {
      res.redirect("/?user=");
    }
  } catch (error) {
    next(error)
  }
})

router.post("/auth", async (req, res, next) => {
  try {
    if (await auth(req.body.id, req.body.password, dir)) {
      
      res.redirect(`/?user=${req.body.id}&w=success`);
    } else {
      res.redirect(`/user/login/?w=error`)
    }
  } catch (error) {
    next(error)
  }
})

router.post("/save", async (req, res, next) => {
  try {
    let user = new User(req.body.name, req.body.id, req.body.password, req.body.email, req.body.about);
    if (!await isUser(req.body.id, dir)) {
      await saveUser(user, dir);
      res.redirect("/user/login/?w=info");
    } else {
      res.redirect('/user/new-account/?w=error')
    }
  } catch (error) {
    next(error)
  }
})
router.post("/update", async (req, res, next) => {
  try {
    let user = new User(req.body.name, req.body.id, req.body.password, req.body.email, req.body.about);
    if (await isUser(req.body.id, dir)) {
      await saveUser(user, dir);
      res.redirect("/user/?user=" + user.id);
    } else {
      res.redirect("/user/?user=" + user.id)
    }
  } catch (error) {
    next(error)
  }
})

router.get("/view", async (req, res,next ) => {
  try {
    const auther =await getUser(req.query.id, dir); console.log(auther.id)
    const skills =await readAutherSkills(auther.id, skillsdir );
    res.render("viewUser", {title :"Skillshare: About auther"+auther.name,
      skills: skills, user: auther, id: req.query.user
    })
  } catch (error) {
    next(error)
    
  }
})