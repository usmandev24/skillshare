import * as fs from 'fs/promises';
import { Skill } from './skill.mjs';
import { AbstractSkillStore } from './skill.mjs';
import { approotdir } from '../approotdir.mjs';
import * as path from 'path';
import * as os from "node:os"
import { skillsdir  as fsSotreData, skillsdir} from '../app.mjs';

export async function chkDir(dir) {
  try {
    const status = await fs.stat(dir);
  } catch (err) {
    await fs.mkdir(dir).catch (err => { throw new Error(err)})
  }
}

export class FsStore extends AbstractSkillStore {
  async create(id, name, key , title, body, comments) {
    let skill = new Skill(id,name, key, title, body, comments);
    await chkDir(fsSotreData);
    await chkDir(path.join(fsSotreData, id));
    await fs.writeFile(path.join(fsSotreData, id, key+'.json'), skill.stringify(), 'utf8')
    .catch(err => { throw new Error(err)})
    return skill;
  }

  async read(id, key) {
    const skilljson =await fs.readFile(path.join(fsSotreData, id, key+".json"), 'utf-8')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    }); 
    const skillObj = JSON.parse(skilljson);
    return skillObj;
  }
  
  async update(id, name, key , title, body) {
    const old = await this.read(id, key);
    const skill = new Skill(id,name, key, title, body, old.comments);
    await chkDir(fsSotreData);
    await chkDir(path.join(fsSotreData, id));
    await fs.writeFile(path.join(fsSotreData, id, key+'.json'), skill.stringify(), 'utf8')
    .catch(err => { throw new Error(err)})
    return skill;
    
  }

  async addcomment(id, key, cname, cbody) {
    let old =  await this.read(id, key);
    let oldcomments = old.comments;
    const cid =Math.floor(Math.random()*1000) ;
    oldcomments.push({name: cname, body: cbody, cid: cid});
    let newskill = await this.create(id, old.name, key, old.title, old.body, oldcomments);
    return newskill;
  }
  async destroycomment (id, key, cid) {
    let oldSkill = await this.read(id, key); 
    let oldcomments = oldSkill.comments;
    let newComments= oldcomments.filter(c => {
      if (c.cid != cid) return c
    });
    let newskill = await this.create(id, oldSkill.name, oldSkill.key, oldSkill.title, oldSkill.body, newComments);
    return newskill;
  }
  async destroy(id, key) {
    await fs.rm(path.join(skillsdir, id, `${key}.json`))
  }

  async getSkillList(id) {
    await chkDir(path.join(skillsdir, id));
    return await fs.readdir(path.join(skillsdir, id));
  }
}

export async function readAllSkills(dir) {
  let addSkill = [];
  await chkDir(dir);
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

export async function readAutherSkills(id, dir) {
  let skills = [];
  const files = await fs.readdir(path.join(dir, id));
  for (let file of files) {
      let skill = await fs.readFile(path.join(dir, id, file), "utf-8")
      .then(data => data);
      skill = JSON.parse(skill)
      skills.push(skill)
    }
  return skills
}


