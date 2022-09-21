import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();
  const count = useRef(1);

  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]);
  //this code will run when the value of 'value' changes
  if (count.current % 2 === 0) {
    return ref.current;
  } else {
    count.current++;
    return null;
  }
}
export default usePrevious;
