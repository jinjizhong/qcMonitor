export const getDate = (type) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (type === 'start') {
        year = year - 60;
    } else if (type === 'end') {
        year = year + 2;
    }
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    return `${year}-${month}-${day}`;
}
export const formatDate = (timeDate) => {
    let array = [];
    let a1 = [];
    let a2 = [];
    array = timeDate.split('T');
    a1 = array[0].split('-');
    a2 = array[1].split(':');
    let month = a1[1];
    let day = a1[2];
    let h = a2[0];
    let m = a2[1];
    return month + '月' + day + '日 ' + h + ':' + m;
}

export const formatTime = (number, format) => {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

// 截取三位数加逗号
export const toThousands = (num) => {
    num = (num || 0).toString();
    let number = 0,
        floatNum = '',
        intNum = '';
    // 判断是否有小数位，有则截取小数点后的数字
    if (num.indexOf('.') > 0) {
        number = num.indexOf('.'); // 获取小数点出现的位置
        floatNum = num.substr(number); // 截取arr.substr(form, length)
        intNum = num.substring(0, number); // 截取arr.substring(start, end)
    } else {
        intNum = num;
    }
    let result = [],
        counter = 0;
    intNum = intNum.split('');
    // 利用3的倍数，向数组插入','
    for (let i = intNum.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(intNum[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('') + floatNum || '';
}

// 比较两数组不同处
export const diffentArr = (fArr, cArr) => {
    let diffRes = []
    let fDatas = []
    let cDatas = []
    for (let i in fArr) {
        let flg = false
        for (let j in cArr) {
            if (cArr[j] === fArr[i]) {
                flg = true
                break
            }
        }
        if (!flg) {
            fDatas.push(fArr[i])
        }
    }
    for (let i in cArr) {
        let flg = false
        for (let j in fArr) {
            if (fArr[j] === cArr[i]) {
                flg = true
                break
            }
        }
        if (!flg) {
            cDatas.push(cArr[i])
        }
    }
    diffRes.push(...cDatas.concat(fDatas))
    return diffRes
}

//数据转化  
function formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
} 