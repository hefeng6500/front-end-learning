const deepClone = (target, map = new WeakMap()) => {
  if (typeof target !== "object") return target;

  if (target instanceof RegExp) return new RegExp(target);
  if (target instanceof Date) return new Date(target);

  if (map.get(target)) {
    return map.get(target);
  }

  let result = new target.constructor();

  map.set(target, result);

  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = deepClone(target[key], map);
    }
  }

  return result;
};


// 来自 vuex utils
const deepClone2 = (target, cache = []) => {
  const find = (list, fn) => {
    return list.filter(fn)[0];
  };

  if (typeof target !== "object") return target;

  if (target instanceof RegExp) return new RegExp(target);
  if (target instanceof Date) return new Date(target);

  let hit = find(cache, (v) => v.original === target);

  if (hit) {
    return hit.copy;
  }

  let result = new target.constructor();

  cache.push({
    original: target,
    copy: result,
  });

  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = deepClone2(target[key], cache);
    }
  }

  return result;
};

let a = {};
a.b = a;

let c = deepClone2(a);

console.log(c);

// let obj1 = {
//   name: "hefeng6500",
//   age: 27,
//   info: {
//     desk: 12,
//   },
// };
// console.log(deepClone(obj1));

// let copy = deepClone(obj1);
// copy.info.desk = 100;

// console.log(obj1);
// console.log(copy);
