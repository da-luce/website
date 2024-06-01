export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  wait: number,
): T {
  let isThrottled = false;
  let args: any[];
  let context: any;

  function wrapper(this: any, ...innerArgs: any[]) {
    if (isThrottled) {
      args = innerArgs;
      context = this;
      return;
    }

    isThrottled = true;
    fn.apply(this, innerArgs);

    setTimeout(() => {
      isThrottled = false;
      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, wait);
  }

  return wrapper as T;
}
