/**
 * 根据reg校验str
 * @param {校验的值} str 
 * @param {正则} reg 
 */
function regFn (str, reg) {
  if (!str) return false
  if (!reg) return false
  return reg.test(str)
}

/**
 * 验证手机号
 * @param {校验的值} str 
 */
export function mobileReg (str) {
  const reg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
  return regFn(str, reg)
}

/**
 * 验证密码
 * @param {校验的值} str 
 */
export function pwdReg (str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]{6,20}$/
  return regFn(str, reg)
}
