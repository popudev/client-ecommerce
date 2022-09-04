const loading = {
  config(setVisible) {
    loading.setVisible = setVisible;
  },

  run() {
    console.log('run');
    loading.setVisible(true);
  },

  done() {
    console.log('done');
    loading.setVisible(false);
  },
};

export default loading;
