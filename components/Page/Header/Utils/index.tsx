export function on(obj, ...args) {
  obj.addEventListener(...args);
}

export function off(obj, ...args) {
  obj.removeEventListener(...args);
}
