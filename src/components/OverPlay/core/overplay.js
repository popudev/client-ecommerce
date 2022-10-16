const overplay = {
  queue: [],

  config: (setVisible) => {
    overplay.setVisible = setVisible;
  },

  toggle: () => {
    console.log('toggle');
    overplay.setVisible((prev) => !prev);
  },

  active: () => {
    console.log('active');

    overplay.queue.push(1);
    overplay.setVisible(true);
  },

  disable: () => {
    console.log('disable');

    overplay.queue.pop();
    if (!overplay.length) overplay.setVisible(false);
  },
};

export default overplay;
