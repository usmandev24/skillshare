import * as fs from 'fs/promises';
import { Skill } from './skill.mjs';
import { AbstractSkillStore } from './skill.mjs';
import { approotdir } from '../approotdir.mjs';
import * as path from 'path';


const fsSotreData = path.join(approotdir,"fsStoreData");
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
    console.log(id, key)
    const skilljson =await fs.readFile(path.join(fsSotreData, id, key+".json"), 'utf-8')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    }); console.log(skilljson)
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
    oldcomments.push({name: cname, body: cbody});
    let newskill = await this.create(id, old.name, key, old.title, old.body, oldcomments);
    return newskill;
  }
}

export async function readAllSkills(dir) {
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

export async function readAutherSkills(id, dir) {
  let skills = [];
  const files = await fs.readdir(path.join(dir, id));
  console.log(files)
  for (let file of files) {
      let skill = await fs.readFile(path.join(dir, id, file), "utf-8")
      .then(data => data);
      skill = JSON.parse(skill)
      skills.push(skill)
    }
  return skills
}


