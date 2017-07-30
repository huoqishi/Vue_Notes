function DateBind (options) {
  var obj = options.data()
  DateBind.vText(obj)
  DateBind.vModel(obj)
  // 注册事件
  DateBind.vModelChange(obj)
  DateBind.autoRender(this, obj)
}

/**
 * 自动更新
 */
DateBind.autoRender = function autoRender (_this, obj) {
  console.log(obj)
  for (var key in obj) {
    // console.log(this)
    Object.defineProperty(_this, key, {
      get: function () {
        console.log('有人想使用vm.的值')
        return obj[key]
      },
      set: function (val) {
        console.log('有人要给vm.赋值了')
        obj[key] = val
        DateBind.vText(obj)
        DateBind.vModel(obj)
      }
    })
  }
}

/**
 * 该方法执行时，会获取所有有v-text属性的元素
 * 并将v-text的值作为obj的属性名，去获取对应的值
 * 将得到的值添加到元素的innerText上
 */
DateBind.vText = function (obj) {
  var oVTexts = document.querySelectorAll('[v-text]')
  for (var i = 0; i < oVTexts.length; i++) {
    var item = oVTexts[i]
    var itemVal = item.getAttribute('v-text')
    item.innerText = obj[itemVal]
  }
}

/**
 * 该方法执行时，会获取所有有v-model属性的元素
 * 并将v-model的值作为obj的属性名，去获取对应的值
 * 将得到的值添加到元素的value上
 */
DateBind.vModel = function (obj) {
  var oVTexts = document.querySelectorAll('[v-model]')
  for (var i = 0; i < oVTexts.length; i++) {
    var item = oVTexts[i]
    var vModelVal = item.getAttribute('v-model')
    item.value = obj[vModelVal]
  }
}

/**
 * 给属性名为v-model的元素注册input事件
 * 在用户输入内容时，将文本框中的内容再赋值给obj中对应的对象
 */
DateBind.vModelChange = function (obj) {
  var oVTexts = document.querySelectorAll('[v-model]')
  for (var i = 0; i < oVTexts.length; i++) {
    var item = oVTexts[i]
    item.oninput = function (e) {
      var oModelVal = e.target.getAttribute('v-model')
      obj[oModelVal] = e.target.value
      DateBind.vText(obj) // +
      DateBind.vModel(obj) // +
    }
  }
}

// /**
//  * 该方法执行时，会获取所有有v-bind:xx 属性的元素
//  * 并将v-bind:xx的值作为obj的属性名，去获取对应的值
//  * 并为元素添加一个属性xx, 值为就是前面取到的值
//  */
// DateBind.vBind = function (obj) {
//   var oVBinds = document.querySelectorAll('[v-bind*=""]')
//   // var oVBinds = document.querySelectorAll('[:*="w3school.com.cn"')
//   console.log(oVBinds)
// }
