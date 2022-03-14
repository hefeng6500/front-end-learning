    /**
     * 构造函数继承
     * */
    function SuperClass(id) {
      this.books = ['Javascript', 'html', 'css']
      this.id = id
    }
    SuperClass.prototype.showBooks = function () {
      console.log(this.books)
    }

    function SubClass(id) { 
      SuperClass.call(this, id)
    }

    var instance1 = new SubClass(10)
    var instance2 = new SubClass(11)

    instance1.books.push("设计模式")
    console.log(instance1.books) // ["Javascript", "html", "css", "设计模式"]
    console.log(instance2.books) // ["Javascript", "html", "css"]
    console.log(instance1.id) // 10
    console.log(instance2.id) // 11
    instance1.showBooks() // Uncaught TypeError: instance1.showBooks is not a function

    /**
     * 注意： 子类 SubClass 中，调用 SuperClass.call(this, id)，
     * 是将子类的变量在父类构造函数中执行一遍，由于父类中是给 this 绑定值，因此子类自然继承父类的共有属性
     *
     * 缺点： 通过构造函数这种继承方式，无法将父类原型上的方法继承，如果想继承父类原型上的方法只能把原型方法写在共有属性中，这样会导致每次 new 一个实例的时候都会实例化这个函数，没有放在原型上进行共享，违背了复用原则
    */
    