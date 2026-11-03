---
layout: post
title: "BugkuCTF 你必须让他停下 Writeup"
date: 2026-09-12
description: "页面疯狂自动刷新？直接看源代码，flag 就藏在 display:none 的隐藏元素里。"
categories: [CTF, Writeup]
tags: [Bugku, Web, 源码泄露]
---

## 题目信息

- **平台**：BugkuCTF
- **题目**：你必须让他停下
- **类型**：Web
- **分值**：10
- **描述**：你必须让他停下
- **目标地址**：`http://160.202.254.160:16160`

## 解题思路

页面会不断自动刷新，并提示：

> Stop at panda! u will get flag

但刷新速度很快，无法正常操作。最直接的方法是查看页面源代码，因为刷新不会影响源代码的查看。

## 解题过程

1. 按 `Ctrl+U` 查看网页源代码。
2. 在源代码中找到刷新逻辑：

   ```javascript
   function myrefresh(){
       window.location.reload();
   }
   setTimeout('myrefresh()',500);
   ```

3. 继续向下看，发现一个隐藏的 `<a>` 标签：

   ```html
   <a style="display:none">flag{9777adc4b1e5924a454501d89260190f}</a>
   ```

4. 该标签使用 `display:none` 隐藏，所以页面上看不见，但源代码中可以直接找到 flag。

## 关键代码

```html
<a style="display:none">flag{9777adc4b1e5924a454501d89260190f}</a>
```

## Flag

```
flag{9777adc4b1e5924a454501d89260190f}
```

## 知识点总结

- **自动刷新**：通过 `setTimeout` 或 `setInterval` 实现，可用 `F8` 暂停脚本，或者直接查看源代码。
- **隐藏元素**：`display:none` 只是视觉隐藏，源代码中依然可见。
- **源码审计**：遇到快速刷新、弹窗等干扰时，优先查看源代码。

## 参考

- BugkuCTF 平台：https://ctf.bugku.com/
