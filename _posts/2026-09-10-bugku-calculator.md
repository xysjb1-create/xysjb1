---
layout: post
title: "BugkuCTF 计算器 Writeup"
date: 2026-09-10
description: "前端 maxlength 限制绕过：改掉输入框长度限制，就能输入两位数答案拿到 flag。"
categories: [CTF, Writeup]
tags: [Bugku, Web, 前端绕过]
---

## 题目信息

- **平台**：BugkuCTF
- **题目**：计算器
- **类型**：Web
- **分值**：10
- **描述**：计算正确即可得到 flag
- **目标地址**：`http://160.202.254.160:14796`

## 解题思路

打开页面后，显示一道随机算术题（例如 `25+74=？`），并有一个输入框和“验证”按钮。但输入框被设置了 `maxlength="1"`，只能输入 1 个字符，而算术结果通常是两位数甚至三位数，无法正常输入。

这说明本题考察的是 **前端限制绕过**：用浏览器开发者工具修改输入框的 `maxlength` 属性，解除长度限制，再输入正确结果即可。

## 解题过程

1. 按 `F12` 打开开发者工具，切换到 **Elements（元素）** 面板。
2. 找到输入框对应的 `<input>` 标签：

   ```html
   <input type="text" class="input" maxlength="1"/>
   ```

3. 双击 `maxlength="1"`，将其修改为 `maxlength="5"`，或者直接删除整个 `maxlength` 属性。
4. 在页面上计算当前算式的结果（例如 `25+74=99`）。
5. 在输入框中输入 `99`，点击“验证”。
6. 页面弹窗显示 flag。

## 关键代码

```html
<!-- 修改前 -->
<input type="text" class="input" maxlength="1"/>

<!-- 修改后 -->
<input type="text" class="input" maxlength="5"/>
```

## Flag

```
flag{d8870aa6cd3745aa36ee463fa15c9327}
```

## 知识点总结

- **前端限制绕过**：`maxlength` 只是浏览器端的约束，可以通过开发者工具实时修改。
- **开发者工具使用**：Elements 面板可以编辑任意 HTML 属性，修改立即生效。
- **前端验证**：本题的验证逻辑完全在前端 JavaScript 中，解除输入限制即可正常提交。

## 参考

- BugkuCTF 平台：https://ctf.bugku.com/
