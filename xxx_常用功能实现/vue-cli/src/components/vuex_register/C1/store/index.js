import {module11} from './modules/module11';
import {module12} from './modules/module12';
export const store1 = {
  install (store) {
    store.registerModule(['module1'], {
      namespaced: true,
      state: {
        test: 'module1'
      },
      mutations: {
        putTest: (state, val) => {
          state.test = val;
        }
      },
      actions: {
        setTest: ({commit}, val) => {
          commit('putTest', val)
        }
      },
      modules: {
        module11,
        module12
      }
    });
  },
  uninstall(store) {
    store.unregisterModule(['module1'])
  }
};
