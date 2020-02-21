let sp = require('suanpan_node_sdk').sp
console.log(sp.parameter)
sp.onCall((req, res) => {
    console.log("now we receive req.msg", req.msg)
    // req.msg = {
    //     in1: "hello",
    //     in2: "suanpan"
    // }
    // 发送一条消息
    res.send({
        out1: "hello world this send in call"
    })
})