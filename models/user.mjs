import * as fs from "node:fs/promises";

export class User {
  #name;
  #id;
  #password;
  #email;
  #about ;
  constructor (name, id, password, email, about) {
    this.#name = name;
    this.#id = id;
    this.#password = password;
    this.#email = email;
    this.#about = about
  }
  get name() { return this.#name}
  get id() { return this.#id }
  get password() { return this.#password }
  get about() { return this.#about }
  get stringify() {
    return JSON.stringify({id: this.#id, name: this.#name,password: this.#password, email: this.#email, about: this.#about})
  };
  get obj () {
    return {id: this.#id, name: this.#name, password: this.#password, email: this.#email, about: this.#about}
  }
}

export async function saveUser(user, path) {
  let userData = await readUsers(path);
  userData[user.id] = user.obj;
  await fs.writeFile(path, JSON.stringify(userData), "utf-8")
  .catch(err => { throw new Error(err)})
}

export async function readUsers(path) {
  let userData = await fs.readFile(path, "utf-8")
  .then(data => data)
  .catch(err => { });
  if (userData) {
userData = JSON.parse(userData);
  } else {
    userData = {}
  } 
  return userData
}

export async function isUser(id, path) {
  let userData = await readUsers(path);
  if (userData[id] === undefined) { 
    return false; 
  } 
  return true;
}

export async function auth(id, password, path) {
  let userData = await readUsers(path);
  if (await isUser(id, path)) {
     const USER = userData[id];
     if (USER.password === password) return true;
  }
  return false;
}
export async function getUser(id, path) {
  let userData = await readUsers(path);
  if (await isUser(id, path)) {
    return userData[id];
  }
  return null;
}
