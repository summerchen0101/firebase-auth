import { useEffect, useState } from "react";

function useCounter(): [number, (start: number) => void] {
  let [counter, setCounter] = useState<number>(0);

  function triggerCounter(start: number) {
    const interval = setInterval(() => {
      if (start === 0) {
        clearInterval(interval);
      }
      console.log(start);
      setCounter(start);
      start--;
    }, 1000);
  }

  return [counter, triggerCounter];
}

export default useCounter;
