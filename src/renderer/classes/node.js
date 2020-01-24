export default class Node {

  constructor(props) {
    const defaultProps = {
      id: Math.round(Math.random() * 1000000),
      x: 1,
      y: 1,
      w: 8,
      h: 4,
      z: 1,
      type: 'VARIABLE',
      value: undefined,
      input: [],
      output: [],
      selected: false,
      dragging: false
    };

    props = {...defaultProps, ...props };
    
    this.id = props.id;
    this.x = props.x;
    this.y = props.y;
    this.w = props.w;
    this.h = props.h;
    this.z = props.z;
    this.value = `${props.value}`;
    this.selected = props.selected;
    this.dragging = props.dragging;

    this.input = props.input.map((pinType) => {
      return {
        type: pinType,
        connections: []
      }
    });
    this.output = props.output.map((pinType) => {
      return {
        type: pinType,
        connections: []
      }
    });

    console.log('node', this);
  }

  get kind() {
    if (this.value === null) {
      return 'null';
    }
    const type = typeof this.value;
    if (type === 'number') {
      return Number.isInteger(this.value) ? 'integer' : 'float';
    }
    return type;
  }

  set value(value) {
    this.raw = value;
    try {
      value = JSON.parse(value);
    } catch(e) {
      if (value === 'undefined') {
        value = undefined;
      } else {
        value = String(value);
      }
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}