const toast = {};

toast.timer = 0;

toast.config = (setElements) => {
  toast.setElements = setElements;
};

toast.success = (mess) => {
  toast.setElements((prev) => {
    return [
      ...prev,
      {
        id: Math.random(),
        type: 'success',
        mess,
      },
    ];
  });

  setTimeout(() => {
    toast.setElements((prev) => {
      prev.shift();
      return [...prev];
    });
  }, 2000);

  return true;
};

toast.error = (mess, condition = true) => {
  if (!condition) return;

  toast.setElements((prev) => {
    return [
      ...prev,
      {
        id: Math.random(),
        type: 'error',
        mess,
      },
    ];
  });

  setTimeout(() => {
    toast.setElements((prev) => {
      prev.shift();
      return [...prev];
    });
  }, 2000);
  return false;
};

export default toast;
