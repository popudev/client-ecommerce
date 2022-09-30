import { toast } from '~/components/Toast/core';

const loading = {
  queue: [],

  config(setVisible) {
    loading.setVisible = setVisible;
  },

  run() {
    // console.log('run');
    this.queue.push(0);
    if (this.queue.length) loading.setVisible(true);
  },

  done(callBack) {
    // console.log('done');
    this.queue.pop();
    if (!this.queue.length) loading.setVisible(false);

    return {
      ...toast,
      err: false,
      succ: true,
    };
  },
};

export default loading;
