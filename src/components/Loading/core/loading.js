import { toast } from '~/components/Toast/core';

const loading = {
  importance: false,

  config(setVisible) {
    loading.setVisible = setVisible;
  },

  run() {
    // console.log('run');
    loading.setVisible(true);
  },

  setImportance(importance = false) {
    this.importance = importance;
  },

  done(callBack) {
    // console.log('done');
    if (!this.importance) loading.setVisible(false);

    return {
      ...toast,
      err: false,
      succ: true,
    };
  },
};

export default loading;
