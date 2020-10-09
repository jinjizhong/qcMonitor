
/* ws连接地址 */
/* eslint-disable */
const wsUrl = process.env.VUE_APP_WSURL

const state = {
    websock: null,
    eventlist: [],
    callBackData: null
}
const getters = {
    onEvent: state => state.callBackData
}
const mutations = {
    WEBSOCKET_INIT (state) {
        state.websock = new WebSocket(wsUrl);
        state.websock.onopen = () => {
            console.log("连接成功！！！");
        }
        state.websock.onmessage = (callBack) => {
            // console.log("ws接收！");
            // console.log(callBack.data);
            state.callBackData = callBack.data
            //                var receive = [];
            //                var type = 0;
            //                var length = 0;
            //                receive = receive.concat(Array.from(new Uint8Array(callBack.data)));
            //                if (receive.length < 6) {
            //                    console.log("包头大小错误：" + receive.length)
            //                    return;
            //                }
            //                var index = 0;
            //                type = new DataView(new Uint8Array(receive).buffer).getUint16(index)
            //                index += 2;

            //                length = new DataView(new Uint8Array(receive).buffer).getUint32(index);
            //                index += 4;
            //                if (receive.length < length + 6) {
            //                    console.log("包体大小错误：" + receive.length)
            //                    return;
            //                }

            //                if (type==5){
            //                    console.log("收到服务器心跳包！")
            //                    return;
            //                }
            //                var bytes = receive.slice(index, length + 6);
            //                console.log("包体数据大小：" + bytes.length)

            //                var typeS = new DataView(new Uint8Array(receive).buffer).getUint16(index)
            //                index += 2;

            //                var methodLenth = new DataView(new Uint8Array(receive).buffer).getUint16(index)
            //                index += 2;

            //                var methodByte = receive.slice(index, index + methodLenth);
            //                index += methodLenth;
            //                var methodStr = byteToString(methodByte);
            //                var dataByte = receive.slice(index, length + 6);
            //                var dataStr = byteToString(dataByte);
            //                console.log("methodStr:" + methodStr + " dataStr:" + dataStr)
            //                state.eventlist.push({
            //                    method:methodStr,
            //                    data:JSON.parse(dataStr)
            //                })
        }
        state.websock.οnerrοr = (e) => {
            console.log('ws错误!' + e);
        }
        state.websock.onclose = (e) => {
            console.log("ws关闭！" + e);
        }
        // state.websock.binaryType = "arraybuffer";
        //发送心跳包
        setInterval(() => {
            console.log("ws发送心跳！");
            // var heart={
            //     type:5,
            //     method: "",
            //     jsonData:{}
            // };
            // state.websock.send(makeByte(heart));
            let heart = 'heart'
            state.websock.send(heart);
        }, 30000)
    },
    WEBSOCKET_SEND (state, p) {
        //console.log("ws发送！");
        state.websock.send(p);
        //state.websock.send(makeByte(p));
    }
}
const actions = {
    wsInit ({ commit }) {
        commit('WEBSOCKET_INIT')
    },
    wsSend ({ commit }, p) {
        // p.type=3;
        commit('WEBSOCKET_SEND', p)
    }
}

export default {
    namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
    state,
    getters,
    actions,
    mutations
}
//  // 转byte类型
// function makeByte(p){
//     var bytesMethod = stringToByte(p.method);

//     var bytes = stringToByte(JSON.stringify(p.jsonData));

//     var headLenth = 6;
//     var bodyLenth = bytes.length + bytesMethod.length + 2 + 2;
//     var buffer = new ArrayBuffer(headLenth + bodyLenth);
//     var view = new DataView(buffer);

//     var count = 0;
//     //包头
//     view.setInt16(count, p.type);//消息类型2
//     count += 2;
//     view.setUint32(count, bodyLenth);//包体大小4
//     count += 4;
//     //包体

//     view.setInt16(count, 1);//序列化类型2
//     count += 2;
//     view.setInt16(count, bytesMethod.length);//方法字符大小2
//     count += 2;
//     for (var i = 0; i < bytesMethod.length; i++) {
//         view.setUint8(count, bytesMethod[i]);
//         count++;
//     }
//     for (var i = 0; i < bytes.length; i++) {
//         view.setUint8(count, bytes[i]);
//         count++;
//     }
//     return view;
// }

// // string转byte
// function stringToByte(str) {
//     var bytes = new Array();
//     var len, c;
//     len = str.length;
//     for (var i = 0; i < len; i++) {
//         c = str.charCodeAt(i);
//         if (c >= 0x010000 && c <= 0x10FFFF) {
//             bytes.push(((c >> 18) & 0x07) | 0xF0);
//             bytes.push(((c >> 12) & 0x3F) | 0x80);
//             bytes.push(((c >> 6) & 0x3F) | 0x80);
//             bytes.push((c & 0x3F) | 0x80);
//         } else if (c >= 0x000800 && c <= 0x00FFFF) {
//             bytes.push(((c >> 12) & 0x0F) | 0xE0);
//             bytes.push(((c >> 6) & 0x3F) | 0x80);
//             bytes.push((c & 0x3F) | 0x80);
//         } else if (c >= 0x000080 && c <= 0x0007FF) {
//             bytes.push(((c >> 6) & 0x1F) | 0xC0);
//             bytes.push((c & 0x3F) | 0x80);
//         } else {
//             bytes.push(c & 0xFF);
//         }
//     }
//     return bytes;
// }

//  // byte转string
// function byteToString(arr) {
//     if (typeof arr === 'string') {
//         return arr;
//     }
//     var str = '',
//         _arr = arr;
//     for (var i = 0; i < _arr.length; i++) {
//         var one = _arr[i].toString(2),
//             v = one.match(/^1+?(?=0)/);
//         if (v && one.length == 8) {
//             var bytesLength = v[0].length;
//             var store = _arr[i].toString(2).slice(7 - bytesLength);
//             for (var st = 1; st < bytesLength; st++) {
//                 store += _arr[st + i].toString(2).slice(2);
//             }
//             str += String.fromCharCode(parseInt(store, 2));
//             i += bytesLength - 1;
//         } else {
//             str += String.fromCharCode(_arr[i]);
//         }
//     }
//     return str;
// }