export default class Node {

  constructor(props) {
    const defaultProps = {
      id: Math.round(Math.random() * 1000000),
      x: 1,
      y: 1,
      w: 8,
      h: 4,
      z: 1,
      value: '25.56',
      kind: 'float',
      input: [],
      output: []
    };

    const mergedProps = {...defaultProps, ...props };
    
    this.id = mergedProps.id;
    this.x = mergedProps.x;
    this.y = mergedProps.y;
    this.w = mergedProps.w;
    this.h = mergedProps.h;
    this.z = mergedProps.z;
    this.value = mergedProps.value;
    this.input = mergedProps.input;
    this.raw = `'${this.value}'`;
    this.output = mergedProps.output;

    console.log('node', this);
  }

  get kind() {
    return (typeof this.value);
    // const test = typeof this.value === 'string' ? this.raw : this.value;
    // return (new Function( `return (typeof ${test})` )());
  }

}