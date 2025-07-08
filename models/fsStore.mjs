import * as fs from 'fs/promises';
import { Skill } from './skill.mjs';
import { AbstractSkillStore } from './skill.mjs';
import { approotdir } from '../approotdir.mjs';
import * as path from 'path';
import { sign } from 'crypto';

const fsSotreData = path.join(approotdir,"fsStoreData");
export async function chkDir(dir) {
  try {
    const status = await fs.stat(dir);
  } catch (err) {
    await fs.mkdir(dir).catch (err => { throw new Error(err)})
  }
}

export class FsStore extends AbstractSkillStore {
  async create(name, key , title, body) {
    const skill = new Skill(name, key, title, body);

    await chkDir(fsSotreData);
    await chkDir(path.join(fsSotreData, name));

    await fs.writeFile(path.join(fsSotreData, name, key+'.json'), skill.stringify(), 'utf8')
    .catch(err => { throw new Error(err)})
    return skill;
  }
}