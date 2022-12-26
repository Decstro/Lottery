class Model {
  attributes
  constructor(attributes) {
    this.attributes = attributes
  }

  get(key, defaultValue) {
    const value =  this.attributes[key];
    return typeof value === 'undefined' ? defaultValue : value;
  }

  getInfo() {
    return this.getAttributes();
  }

  getAttributes() {
    return this.attributes;
  }
}

exports.Model = Model