export class Model {
  private $attributes: Record<string, any>;
  public constructor($attributes) {
    this.$attributes = $attributes
  }


  private get(key, defaultValue?) {
    const value =  this.$attributes[key];
    return typeof value === 'undefined' ? defaultValue : value;
  }

  public getInfo() {
    return this.getAttributes();
  }

  public getAttributes() {
    return this.$attributes;
  }
}