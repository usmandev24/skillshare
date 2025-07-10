import { default as express } from 'express';
import { readAllSkills, readAutherSkills } from '../models/fsStore.mjs';
import path from 'path';
import { approotdir } from '../approotdir.mjs';
import { getUser } from '../models/user.mjs';
import { usersdir } from '../app.mjs';

export const router = express.Router();

const skillsdir = path.join(approotdir, "fsStoreData")
/* GET home page. */
router.get('/',async function (req, res, next) {
  const skills = await readAllSkills(skillsdir);
  const user = await getUser(req.query.user, usersdir)
  if (req.query.w) {
    res.render('index', {
      title: 'Skillshare', id: req.query.user,skills: skills,user:user,
      notwar: "no", wtype: "success", war: " Login Successfull."
    });
  } else
    res.render('index', { title: 'Skillshare', id: req.query.user, skills: skills, user: user });
});




