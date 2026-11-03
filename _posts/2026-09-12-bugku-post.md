---
layout: post
title: "BugkuCTF POST Writeup"
date: 2026-09-12
description: "PHP $_POST 传参：参数不能放在 URL 里，用控制台 fetch 或 curl 构造 POST 请求拿到 flag。"
categories: [CTF, Writeup]
tags: [Bugku, Web, POST传参]
---

## 题目信息

- **平台**：BugkuCTF
- **题目**：POST
- **类型**：Web
- **分值**：10
- **描述**：post
- **目标地址**：`http://160.202.254.160:18569`

## 解题思路

题目给出了一段 PHP 源码：

```php
$what=$_POST['what'];
echo $what;
if($what=='flag')
    echo 'flag{***}';
```

与 GET 题类似，但这里使用的是 `$_POST`，意味着参数必须通过 **POST 请求体** 传递，不能放在 URL 中。我们需要构造一个 POST 请求，发送 `what=flag`。

## 解题过程

1. 打开目标地址，按 `F12` 打开开发者工具，切换到 **Console（控制台）**。
2. 如果浏览器提示禁止粘贴，先输入 `允许粘贴` 并回车。
3. 执行以下 JavaScript 代码：

   ```javascript
   fetch('http://160.202.254.160:18569', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: 'what=flag'
   })
   .then(res => res.text())
   .then(data => console.log(data));
   ```

4. 控制台输出服务器返回的内容：

   ```
   flagflag{ec3468f4e107ee03af1e380850fb071}
   ```

5. 提取其中的 flag 并提交。

## 关键代码

```javascript
fetch('http://160.202.254.160:18569', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'what=flag'
})
.then(res => res.text())
.then(data => console.log(data));
```

## Flag

```
flag{ec3468f4e107ee03af1e380850fb071}
```

> 注：页面回显可能显示为方括号或圆括号，提交时以平台实际接受的格式为准。

## 知识点总结

- **HTTP POST 请求**：参数放在请求体中，不会出现在 URL 中。
- **PHP `$_POST`**：用于接收 POST 参数。
- **浏览器控制台**：可用 `fetch` 快速发送 POST 请求并查看响应。
- **备选工具**：`curl -X POST http://地址 -d "what=flag"`。

## 参考

- BugkuCTF 平台：https://ctf.bugku.com/
