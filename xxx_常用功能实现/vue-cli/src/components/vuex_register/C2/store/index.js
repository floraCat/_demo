export const store2 = {
  install (store) {
    store.registerModule(['module2'], {
      namespaced: true,
      state: {
        module2: 'module2'
      },
    });
  },
  uninstall(store) {
    store.unregisterModule(['module2'])
  }
};
