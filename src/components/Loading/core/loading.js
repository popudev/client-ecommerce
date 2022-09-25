import { toast } from '~/components/Toast/core';

const loading = {
  config(setVisible) {
    loading.setVisible = setVisible;
  },

  run() {
    // console.log('run');
    loading.setVisible(true);
  },

  done(callBack) {
    // console.log('done');
    loading.setVisible(false);

    return {
      ...toast,
      err: false,
      succ: true,
    };
  },
};

export default loading;
