const toast = {};

toast.config = (setElements) => {
  toast.setElements = setElements;
};

toast.success = (mess) => {
  toast.setElements((prev) => {
    return [
      ...prev,
      {
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
  }, 1500);
};

toast.error = (mess) => {
  toast.setElements((prev) => {
    return [
      ...prev,
      {
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
  }, 1500);
};

export default toast;
