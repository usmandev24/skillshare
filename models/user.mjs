import * as fs from "node:fs/promises";
import { approotdir } from "../approotdir.mjs";
export class User {
  #name;
  #id;
  #about 
  constructor (name, id, about) {
    this.#name = name;
    this.#id = id;
    this.#about = about
  }
  get name() { return this.#name}
  get id() { return this.#id }
  get about() { return this.#about }
  stringify() {
    return JSON.stringify({id: this.#id, name: this.#name, about: this.#about})
  }
}

export async function saveUser(user, path) {
  let userData = await readUsers(path);
  userData[user.id] = user.stringify;
  await fs.writeFile(path, JSON.stringify(userData), "utf-8")
  .catch(err => { throw new Error(err)})
}

export async function readUsers(path) {
  let userData = await fs.readFile(path, "utf-8")
  .then(data => data)
  .catch(err => { });
  userData = JSON.parse(userData);
  return userData
}