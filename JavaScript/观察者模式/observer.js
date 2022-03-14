

// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.state = '开心'
    this.observers = []
  }

  // 用于与观察者之间建立关系，也就是将观察者注册到 被观察者对象中，也就是 “订阅” on()
  attach(o) {
    this.observers.push(o)
  }

  /**
   * 
   * 此例子中 订阅和发布都写在被观察者中
   */

  setState(state) {
    this.state = state
    // 状态进行更新的时候会发布消息， 会遍历所有的订阅者，也就是 “发布” emit()
    this.observers.forEach(o => {
      o.update(this)
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(s) {
    console.log(`${this.name}: ${s.name}当前的状态为 ${s.state}`)
  }
}

let baby = new Subject('小宝贝')
let father = new Observer('爸爸')
let mother = new Observer('妈妈')

baby.attach(father)
baby.attach(mother)

baby.setState('不开心')

