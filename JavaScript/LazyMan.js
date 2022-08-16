// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // your code here
  return new _LazyMan(name, logFn);
}

class _LazyMan {
  constructor(name, logFn) {
    this.logFn = logFn;
    this.tasks = [];

    const task = () => {
      this.logFn(`Hi, I'm ${name}.`);
      this.next();
    };

    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift();

    task && task();
  }

  eat(food) {
    const task = () => {
      this.logFn(`Eat ${food}.`);
      this.next();
    };

    this.tasks.push(task);

    return this;
  }

  sleep(time) {
    return this.sleepWapper(time);
  }

  sleepFirst(time) {
    return this.sleepWapper(time, true);
  }

  sleepWapper(time, isFirst = false) {
    const task = () => {
      const sleep = (time) =>
        new Promise((resolve) => setTimeout(resolve, time));

      sleep(time * 1000).then(() => {
        this.logFn(
          `Wake up after ${time} ${time === 1 ? "second" : "seconds"}.`
        );
        this.next();
      });
    };

    if (isFirst) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }

    return this;
  }
}

// LazyMan("Jack", console.log).eat("banana").sleep(10).eat("apple").sleep(1);
// LazyMan('Jack', console.log).eat('banana').eat('apple').sleepFirst(2)
LazyMan("Jack", console.log)
  .eat("banana")
  .eat("apple")
  .sleepFirst(1)
  .eat("egg")
  .sleepFirst(1);
