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
  async create(id, name, key , title, body) {
    const skill = new Skill(id,name, key, title, body);

    await chkDir(fsSotreData);
    await chkDir(path.join(fsSotreData, id));
    await chkDir(path.join(approotdir, "FSall"))

    await fs.writeFile(path.join(fsSotreData, id, key+'.json'), skill.stringify(), 'utf8');
    await fs.writeFile(path.join(approotdir, "FSall", key+'.json'), skill.stringify(), 'utf8')
    .catch(err => { throw new Error(err)})
    return skill;
  }
  async read(id, key) {
    const skilljson = fs.readFile(path.join(fsSotreData, id, key+".json"), 'utf-8')
    .then(data => data)
    .catch(err => {
      throw new Error(err)
    });
    const skillObj = JSON.parse(skilljson);
    return skillObj;
  }
}


