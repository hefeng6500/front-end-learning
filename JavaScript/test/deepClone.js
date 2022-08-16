function deepClone(obj, map = new WeakMap()) {
  if (typeof obj === "null" || typeof obj !== "object") {
    return obj;
  }

  const data = map.get(obj);

  if (data) {
    return data;
  }

  const newObj = new obj.constructor();

  map.set(obj, newObj);

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj, map);
    }
  }

  return newObj;
}
