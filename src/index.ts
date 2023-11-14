
const zeroWidthChar = [
  '\u200B',  // 零宽空格
  '\u200C',  // 零宽非连接符
  '\u200D',  // 零宽连接符
]

// 匹配任何零宽字符的正则表达式
const regex = new RegExp(zeroWidthChar.join("|"), "g")


/** 判断字符串中是否含有零宽字符 */
export const containsZeroWidth = (text: string) => {
  if (!text) return false
  return regex.test(text);
}

/** 移除字符串中的零宽字符 */
export const removeZeroWidth = (text: string) => {
  if (!text) return ""
  return text.replace(regex, '')
}

/** 在文本中插入零宽字符 */
export const encodeZeroWidth = (text: string, zeroWidthStr: string) => {
  const newText = removeZeroWidth(text)
  const newZeroWidthStr = removeZeroWidth(zeroWidthStr)
  if (!newText) return newText
  if (!newZeroWidthStr) return newText

  return newText + [...newZeroWidthStr].reduce((previousValue, currentValue, index) => {
    const charCode = newZeroWidthStr.charCodeAt(index)
    const bString = charCode.toString(2)
    const joinCode = index === newZeroWidthStr.length - 1 ? "": zeroWidthChar[0]
    return previousValue += [...bString].map(bcode => {
      const number = Number(bcode)
      return number === 0 ? zeroWidthChar[1]: zeroWidthChar[2]
    }).join("") + joinCode
  }, "")
}

/** 解析文本中插入的零宽字符 */
export const decodeZeroWidth = (text: string) => {
  if (!containsZeroWidth(text)) return text
  const charArr = text.match(regex)
  if (!charArr) return ""
  const words = charArr.join("").split(zeroWidthChar[0])
  return words.reduce((previousValue, currentValue) => {
    const bString = [...currentValue].reduce((pValue, cValue) => pValue += cValue === zeroWidthChar[1] ? 0: 1, "")
    const charCode = parseInt(bString, 2)
    return previousValue += String.fromCharCode(charCode)
  }, "")
}
