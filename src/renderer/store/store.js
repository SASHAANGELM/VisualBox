import Vue from 'vue'
import Vuex from 'vuex'
import Node from '../classes/node.js';

Vue.use(Vuex);

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
    value: 12,
    output: [
      {
        type: 'execute',
        connections: []
      }
    ]
  }),
  new Node({
    x: 0,
    y: 4,
    h: 2,
    value: 3.14,
    output: [
      {
        type: 'execute',
        connections: []
      }
    ]
  }),
  new Node({
    x: 0,
    y: 8,
    h: 2,
    value: 'test',
    output: [
      {
        type: 'variable',
        connections: []
      }
    ]
  }),
  new Node({
    x: 0,
    y: 12,
    h: 2,
    value: true,
    output: [
      {
        type: 'variable',
        connections: []
      }
    ]
  }),
  new Node({
    x: 0,
    y: 16,
    value: {},
  }),
);


export default store;
