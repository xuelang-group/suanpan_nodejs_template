console.log('require work in suanpan')

const sp = require('suanpan_node_sdk').sp
let justCount = 0
// 每隔一秒钟向输出口1 发送一条消息
setInterval(function () {
  justCount++
  sp.sendSuccessMessage({
    out1: `hello from interval, count ${justCount}`
  })
}, 1000)
