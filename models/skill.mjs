export class Skill {
  #name;
  #key;
  #title;
  #body;
  constructor(name, key, title, body) {
    this.#name = name;
    this.#key = key;
    this.#body = body;
    this.#title = title
  }
  get name() { return this.#name}
  get key() { return this.#key }
  get title() { return this.#title }
  get body() { return this.#body }
  set title(newTitle) { this.#title = newTitle }
  set body(newbody) { this.#body = newbody }

  static fromJSON (skillJSON) {
    const skill = JSON.parse(skillJSON)
    return new skill(skill.name, skill.key, skill.title, skill.body)
  }
   stringify()  {
    return JSON.stringify({name: this.#name, key: this.#key, title: this.#title, body: this.#body})
   }
}


export class AbstractSkillStore {
  async create() {}
  async update() {}
  async read() {}
  async destroy() {};
  async list() {};
}