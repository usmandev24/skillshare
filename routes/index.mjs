import { default as express } from 'express';
import * as fs from 'fs/promises';
import { FsStore as store } from '../models/fsStore.mjs';
import path from 'path';
import { approotdir } from '../approotdir.mjs';
import { json } from 'stream/consumers';
import { getUser } from '../models/user.mjs';
import { usersdir } from '../app.mjs';
export const router = express.Router();
const dir = path.join(approotdir, "fsStoreData")
/* GET home page. */
router.get('/',async function (req, res, next) {
  const skills = await read(dir);
  const user = await getUser(req.query.user, usersdir)
  if (req.query.w) {
    res.render('index', {
      title: 'Skillshare', id: req.query.user,skills: skills,user:user,
      notwar: "no", wtype: "success", war: " Login Successfull."
    });
  } else
    res.render('index', { title: 'Skillshare', id: req.query.user, skills: skills, user: user });
});

async function read(dir) {
  let addSkill = [];
  let folders = await fs.readdir(dir)
  
  for (let folder of folders) {
    let files = await fs.readdir(path.join(dir, folder));
    for (let file of files) {
      let skill = await fs.readFile(path.join(dir, folder, file), "utf-8")
      .then(data => data);
      skill = JSON.parse(skill)
      addSkill.push(skill)
    }
  }
  return addSkill
}



