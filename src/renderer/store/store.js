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
      nodes: [
        // {
        //   id: 0,
        //   x: 1,
        //   y: 1,
        //   w: 8,
        //   h: 4,
        //   z: 5,
        //   name: 'log',
        //   kind: 'method',
        //   input: [
        //     {
        //       type: 'property',
        //       connections: [
        //       ]
        //     },
        //     {
        //       type: 'execute',
        //       connections: [
        //       ]
        //     },
        //     {
        //       type: 'variable',
        //       connections: [
        //         {
                
        //         }
        //       ]
        //     },
        //   ],
        //   output: [
        //     {
        //       type: 'property',
        //       connections: [
        //       ]
        //     },
        //     {
        //       type: 'execute',
        //       connections: [
        //         {
                
        //         }
        //       ]
        //     },
        //     {
        //       type: 'variable',
        //       connections: [
              
        //       ]
        //     }
        //   ]
        // },
        // {
        //   id: 1,
        //   x: 1,
        //   y: 7,
        //   w: 8,
        //   h: 2,
        //   z: 6,
        //   name: 'console',
        //   kind: 'object',
        //   output: [
        //     {
        //       type: 'variable',
        //       connections: []
        //     },
        //   ]
        // },
        // {
        //   id: 2,
        //   x: 1,
        //   y: 12,
        //   w: 8,
        //   h: 4,
        //   z: 7,
        //   name: '25.56',
        //   kind: 'float',
        // }
      ],
    }
  }
});
store.state.grid.nodes.push(
  new Node({
    x: 0,
    y: 0,
    z: 7,
    value: 55,
  }),
  new Node({
    x: 11,
    y: 1,
    z: 7,
    value: 'test',
  }),
  new Node({
    x: 1,
    y: 6,
    z: 7,
    value: true,
  }),
  new Node({
    x: 7,
    y: 11,
    z: 7,
    value: {},
  }),
);


export default store;
