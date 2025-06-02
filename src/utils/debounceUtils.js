export const debouncedSelector = (selector, delay = 300) => {
  let memoizedResult;
  let lastState;

  return (state) => {
    if (state === lastState) return memoizedResult;
    lastState = state;
    setTimeout(() => {
      memoizedResult = selector(state);
    }, delay);
    return memoizedResult;
  };
};

