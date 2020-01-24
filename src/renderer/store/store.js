import Vue from 'vue'
import Vuex from 'vuex'
import Node from '../classes/node.js';

Vue.use(Vuex);

const types = {
  START: 'START',
  VARIABLE: 'VARIABLE'
};

const store = new Vuex.Store({
  state: {
    grid: {
      size: 24,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      nodes: [],
    }
  },
  getters: {
    grid: (state) => {
      return state.grid;
    },
    nodes: (state) => {
      return state.grid.nodes;
    }
  }
});
store.state.grid.nodes.push(
  new Node({
    x: 0,
    y: 0,
    h: 2,
    type: types.START,
    output: ['execute']
  }),
  new Node({
    x: 0,
    y: 5,
    h: 2,
    type: types.VARIABLE,
    value: 12,
    output: ['variable']
  }),
  new Node({
    x: 0,
    y: 8,
    h: 2,
    type: types.VARIABLE,
    value: 3.14,
    output: ['variable']
  }),
  new Node({
    x: 0,
    y: 11,
    h: 2,
    type: types.VARIABLE,
    value: 'test',
    output: ['variable']
  }),
  new Node({
    x: 0,
    y: 14,
    h: 2,
    type: types.VARIABLE,
    value: true,
    output: ['variable']
  }),
  new Node({
    x: 0,
    y: 17,
    h: 2,
    type: types.VARIABLE,
    value: undefined,
    output: ['variable']
  }),
  new Node({
    x: 0,
    y: 20,
    h: 2,
    type: types.VARIABLE,
    value: null,
    output: ['variable']
  }),
  new Node({
    x: 0,
    y: 23,
    type: types.VARIABLE,
    value: {},
  }),
);


export default store;
