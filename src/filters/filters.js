/**
 * 扩展原生Date对象，添加format方法
 * @param  {string} format [格式化类型]
 * @return {[type]}        [description]
 */
Date.prototype.format = function (format) {
    let o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'h+': this.getHours(), // hour
        'H+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second
        'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
        'S': this.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return format
}
export default {
    /**
     * 金额格式化
     * @param {number} amount 金额
     * @param {boolean} [isRound] 是否四舍五入 默认否
     * @param {number} [digits] 小数位数
     * @returns {string} 格式化后的数字，默认两位小数  fmoney("12345.675910", 3)
     */
    fmoney (amount,isRound=false, digits = 2) {
        if (amount === null || amount === '' || isNaN(amount)) {
            return '0.00';
        } else {
            amount = parseFloat((amount + '').replace(/[^\d\.-]/g, ''))
            if (isRound) {
                amount = amount.toFixed(digits) + '';
            } else {
                amount = amount.toFixed(digits + 1);
                amount = amount.substring(0, amount.toString().length - 1);
            }
            var l = amount.split('.')[0].split('').reverse(),
                r = amount.split('.')[1];
            let t = '';
            for (let i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
            }
            return t.split('').reverse().join('') + '.' + r;
        }
    },
    /**
     * 数字格式化
     * @param number
     * @param {boolean} [isRound] 是否四舍五入 默认否
     * @param {number} [digits] 小数位数
     * @returns {string}
     */
    numberFormatter (number, isRound=false, digits = 2) {
        if (number === null || number === '' || isNaN(number)) {
            number = '0.00';
        } else {
            var number = parseFloat(number);
            if (isRound){
                number = Math.round(number * 100) / 100;
            }else{
                number = number.toFixed(digits+1);
                number = number.substring(0,number.toString().length - 1);
            }
            var rs = number.indexOf('.');
            if (rs < 0) {
                rs = number.length;
                number += '.';
            }
            while (number.length <= rs + digits) {
                number += '0';
            }
        }
        return number;
    },
    /**
     * 将长数字转化成以空格分隔的每四个数字为一组的字符串
     * @param {string} digits - 待处理字符串
     * @returns {string} 已处理字符串
     */
    digitify (digits) {
        return String(digits).replace(/\d{4}/g, (fourDigits) => `${fourDigits} `)
    },
    /**
     * 布尔格式化
     * @param boolean
     * @param trueText 如果等于true，将显示的文本。
     * @param falseText 如果等于false，将显示的文本
     * @returns {*}
     */
    booleanFormatter (boolean, trueText, falseText) {
        var result;
        trueText = trueText || 'Yes';
        falseText = falseText || 'No';
        if (boolean === null || boolean === undefined || boolean === '') {
            result = '-';
        } else {
            result = boolean ? trueText : falseText;
        }
        return result;
    },
    /**
     * oldVal: 需要进行format的值
     * format: 格式化的格式
     */
    dateFormat (oldVal, format) {
        if (!oldVal) return ''
        let myDate = new Date(oldVal)
        if (isNaN(myDate)) return oldVal
        var o = {
            'M+': myDate.getMonth() + 1, // month,
            'd+': myDate.getDate(), // day
            'h+': myDate.getHours(), // hour
            'H+': myDate.getHours(), // hour
            'm+': myDate.getMinutes(), // minute
            's+': myDate.getSeconds(), // second
            'q+': Math.floor((myDate.getMonth() + 3) / 3), // quarter
            'S': myDate.getMilliseconds() // millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (myDate.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            }
        }
        return format
    },
    /**
     * oldVal: 需要进行format的值
     * type: 格式化的类型
     * -1：****（全部脱敏）
     * 1：字***（首文字不脱敏），
     * 2：135****1234（手机中间4位脱敏），
     * 3：110011********1010（身份证年月日脱敏）；
     * other：返回原值
     */
    stringEncrypt (oldVal, type) {
        if (!oldVal) return ''
        if (!type) return ''
        if (type === -1 && oldVal.length > 0) {
            return '****'
        } else if (type === 1 && oldVal.length > 1) {
            return oldVal.substr(0, 1) + '**'
        } else if (type === 2 && oldVal.length === 11) {
            let endStr = oldVal.substr(7)
            return oldVal.substr(0, 3) + '****' + endStr
        } else if (type === 3 && (oldVal.length === 15 || oldVal.length === 18)) {
            let len = 0
            if (oldVal.length === 15) len = 6 //  410224 980808 223
            if (oldVal.length === 18) len = 8
            let startStr = oldVal.substr(0, 5)
            let endStr = oldVal.substr(len)
            return startStr + '**** ****' + endStr
        } else {
            return oldVal
        }
    }
}
