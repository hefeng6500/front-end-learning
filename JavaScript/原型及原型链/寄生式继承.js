    /**
     * 寄生式继承
     * */  

     function inheritObject(o) {
      function F() { }
      F.prototype = o
      return new F()
    }

    var book = {
      name: 'js book',
      alikeBook: ['css book', 'html book']
    }

    function createBook(obj) {
      // 通过原型继承方式创建新对象
      var o = new inheritObject(obj)
      // 拓展新对象
      o.getName = function () {
        console.log(name)
      }
      // 返回拓展后的新对象
      return o
    }

    var newBooks = createBook(book)
    newBooks.name = 'Ajax book'
    newBooks.alikeBook.push('xml book') 

    var otherBooks = createBook(book)
    otherBooks.name = 'flash book'
    otherBooks.alikeBook.push('as book')

    console.log(newBooks.name) // Ajax book
    console.log(newBooks.alikeBook) // ["css book", "html book", "xml book", "as book"]

    console.log(otherBooks.name) // flash book
    console.log(otherBooks.alikeBook) // ["css book", "html book", "xml book", "as book"]

    /**
     * 查看结果： 效果同原型式继承，引用类型会受到影响
    */