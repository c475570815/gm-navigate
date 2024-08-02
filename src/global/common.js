function uuid() {
    let temp_url = URL.createObjectURL(new Blob());
    let uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
}

/**
 * 生成指定长度的uuid默认长度为10
 * @param len
 */
export function getUuidStr(len = 10) {
    let str = ''
    for (let i = 0; i < len; ++i) {
        str += uuid();
    }
    return str;
}

/**
 * 获取url参数
 * @param paraName 键名
 * @return
 * @author CYH
 * @date 2021/1/4 0004 14:52
 **/
export function getUrlParam(paraName) {
    let url = document.location.toString();
    let arrObj = url.split("?");

    if (arrObj.length > 1) {
        let arrPara = arrObj[1].split("&");
        let arr;

        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");

            if (arr != null && arr[0] === paraName) {
                return arr[1];
            }
        }
        return "";
    } else {
        return "";
    }
}

export function isNull(checkObject) {
    if (checkObject === undefined || checkObject === null) {
        return true
    }
    //对象类型判断
    if (typeof checkObject === 'object') {
        if (Object.keys(checkObject).length === 0) {
            return true
        }
    }
    if (typeof checkObject === 'string') {
        if (checkObject === '') {
            return true
        }
    }
    return false
}

export function isNotNUll(checkObject) {
    return !isNull(checkObject);
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) !== null;
}


