
# zero.str
> Handling zero width characters in JavaScript.

### 安装
```shell
npm i zero.str
```

### 使用
```jsx
import { encodeZeroWidth, decodeZeroWidth } from "zero.str"

// 插入零宽字符
const encodeStr = encodeZeroWidth("正文内容", "hello,world")

// 获取零宽字符
const zeroWidth = decodeZeroWidth(encodeStr)
// zeroWidth = hello,world
```