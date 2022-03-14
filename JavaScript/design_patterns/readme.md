# JavaScript设计模式 #

简介： JavaScript设计模式学习之路



### 一、简单工厂模式

> 需求: 原生js实现一个登陆验证的提示，当用户输入用户名或者密码不正确时，给出提示

    var LoginAlert = function (text) {
      this.content = text
    }
    LoginAlert.prototype.show = function () {
      alert(this.content)
    }
    
    var userNameAlert = new LoginAlert('用户名不能多于16个字母和数字')
    userNameAlert.show()
    
    var pasWordAlert = new LoginAlert('输入密码不正确')
    pasWordAlert.show()



> 新需求： 再加一个注册按钮，同样进行输入框的验证

    var RegisterAlert = function (text) {
      this.content = text
    }
    RegisterAlert.prototype.show = function () {
      alert(this.content)
    }
    
    var RegisterFailedAlert = new RegisterAlert('用户名已存在，请重新输入')
    RegisterFailedAlert.show()



> 新需求： 再添加一个登录成功的提示框

    var LoginPrompt = function (text) {
      this.content = text
    }
    LoginPrompt.prototype.show = function () {
      alert(this.content)
    }
    var loginSuccess = new LoginPrompt('登录成功，填写今天的心情吧~~~')
    loginSuccess.show()



> **点评：** 这么写已经能够满足于需求，只是比较零散，如果将上述类封装在一个类，复用重复性代码，然后调用一个类，从而实现需求的功能，岂不是好？


    var Factory = function (name) {
      switch (name) {
        case 'alert':
          return new LoginAlert();
        case 'register':
          return new RegisterAlert()
        case 'LoginPrompt':
          return new LoginPrompt()
      }
    }




> **点评：**上述代码虽然将多个类封装在一个函数里面，但是存在大量的重复性代码，可以继续优化下

    var LoginValid = function (tips) {
      this.content = tips
    }
    LoginValid.prototype.show = function () {
      alert(this.content)
    }
    var FactoryFun = function (type, tips) {
      var obj = new Object();
      obj.content = tips;
      obj.show = function () {
        alert(this.content)
      }
      if (type === 'alert') {
    
      }
      if (type === 'register') {
    
      }
      if (type === 'LoginPrompt') {
    
      }
      return obj
    }
    
    var loginInstance = FactoryFun('alert', '用户名输入错误')
    loginInstance.show()

​    

> **点评：** 上述代码相对首次书写定义多个类进行验证是不是优雅很多呢？ 提供一个工厂函数，根据传入参数判断类型、提示语。
> 在团队项目开发，我们应该尽可能少的创建全局变量。同一类对象的不同需求，重复性代码可以提取出来，代码复用是面向对象编程的一条准则；



------

### 二、工厂方法模式



> 需求： 有一批关于培训的广告需要投放。
>
> ​          1、java，绿色字体
>
> ​          2、php，黄色字体，红色背景

```
    var Java = function (content) {
      this.content = content;
      (function (content) {
        var div = document.createElement('div')
        div.style.color = 'green'
        div.innerHTML = content
        document.getElementById('container').appendChild(div)
      }(content));
    }

    var Php = function (content) {
      this.content = content;
      (function () {
        var div = document.createElement('div')
        div.style.color = 'yellow'
        div.style.background = 'red'
        div.innerHTML = content
        document.getElementById('container').appendChild(div)
      }(content));
    }

    var JavaScript = function (content) {
      this.content = content;
      (function () {
        var div = document.createElement('div')
        div.style.color = 'red'
        div.innerHTML = content
        document.getElementById('container').appendChild(div)
      }(content));
    }

    // 学科类工厂函数
    var Factory = function (type, content) {
      switch (type) {
        case 'Java':
          return new Java(content);
        case 'Php':
          return new Php(content);
        case 'JavaScript':
          return new JavaScript(content);
        case 'UI':
          return new UI(content)
      }
    }

    var javaInstance = Factory('Java', 'Java天下无敌')
    var phpInstance = Factory('Php', 'Php是世界上是最好的语言')
    var javaScriptInstance = Factory('JavaScript', 'javaScript宇宙最强，无所不能')
    
```



> 新需求： 再添加一个UI广告
>
> ​      思考： 需要再添加一个类，在 Factory 工厂函数中再添加 UI 项

```
    var UI = function (content) {
      this.content = content;
      (function (content) {
        var div = document.createElement('div')
        div.style.color = 'blue'
        div.innerHTML = content
        document.getElementById('container').appendChild(div)
      }(content))
    }

    var uiInstance = Factory('UI', "没有UI，你们都是没有皮肤的王者")
```



> **点评：** 如此，每新增一个需求，就要修改两处： 一是，定义类。二是，修改工厂函数。
>
> ​      可以试下 “工厂方法模式”进行设计，只需要添加新的类，其他的不用管



```
	var Factory2 = function (type, content) {
      if (!(this instanceof Factory2)) {
        return new Factory2(type, content)
      } else {
        return this[type](content)
      }
    }

    Factory2.prototype = {
      Java: function (content) {
        this.content = content;
        (function (content) {
          var div = document.createElement('div')
          div.style.color = 'green'
          div.innerHTML = content
          document.getElementById('container').appendChild(div)
        }(content));
      },
      Php: function (content) {
        this.content = content;
        (function () {
          var div = document.createElement('div')
          div.style.color = 'yellow'
          div.style.background = 'red'
          div.innerHTML = content
          document.getElementById('container').appendChild(div)
        }(content));
      },
      javaScript: function (content) {
        this.content = content;
        (function () {
          var div = document.createElement('div')
          div.style.color = 'red'
          div.innerHTML = content
          document.getElementById('container').appendChild(div)
        }(content));
      },
      UI: function (content) {
        this.content = content;
        (function (content) {
          var div = document.createElement('div')
          div.style.color = 'blue'
          div.innerHTML = content
          document.getElementById('container').appendChild(div)
        }(content))
      },
      "C++": function (content) {
        this.content = content;
        (function (content) {
          var div = document.createElement('div')
          div.style.color = 'purple'
          div.innerHTML = content
          document.getElementById('container').appendChild(div)
        }(content))
      }
    }
    
    var datas = [
      {type: 'Java', content: 'Java天下无敌'},
      {type: 'Php', content: 'Php是世界上是最好的语言'},
      {type: 'javaScript', content: 'javaScript宇宙最强，无所不能'},
      {type: 'UI', content: '没有UI，你们都是没有皮肤的王者'},
      {type: 'C++', content: '没有我，你们都是浮云'},
    ]
    for(var i=0;i<datas.length;i++){
      Factory2(datas[i].type, datas[i].content)
    }
```































