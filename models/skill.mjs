export class Skill {
  #name;
  #key;
  #title;
  #body;
  #id;
  #comments;
  constructor(id, name, key, title, body, comments=[]) {
    this.#id = id;
    this.#name = name;
    this.#key = key;
    this.#body = body;
    this.#title = title;
    this.#comments = comments;
  }
  get id() { return this.#id}
  get name() { return this.#name}
  get key() { return this.#key }
  get title() { return this.#title }
  get body() { return this.#body }
  set title(newTitle) { this.#title = newTitle }
  set body(newbody) { this.#body = newbody }
  addComment(name, body) {
    this.#comments.push({name: name, comment: body})
  }
  static fromJSON (skillJSON) {
    const skill = JSON.parse(skillJSON)
    return new skill(skill.id, skill.name, skill.key, skill.title, skill.body, skill.comments)
  }
   stringify()  {
    return JSON.stringify({id: this.#id, name: this.#name, key: this.#key, title: this.#title, body: this.#body, comments : this.#comments})
   }
}


export class AbstractSkillStore {
  async create() {}
  async update() {}
  async read() {}
  async destroy() {};
  async list() {};
}