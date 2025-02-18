export const isPromise = (val) =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);
export function noop() {}
export function callInterceptor(interceptor, { args, done, canceled }) {
  if (interceptor) {
    const returnVal = interceptor.apply(null, args);

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done();
          } else if (canceled) {
            canceled();
          }
        })
        .catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}
