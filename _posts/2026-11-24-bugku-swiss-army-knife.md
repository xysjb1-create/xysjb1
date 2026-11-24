---

layout: post

title: "BugkuCTF 瑞士军刀 Writeup"

date: 2026-11-24

description: "PWN 入门：用 strings 直接扫二进制文件，flag 以明文字符串形式存在。"

categories: [CTF, Writeup]

tags: [Bugku, PWN, strings]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：瑞士军刀

- **类型**：PWN



## 解题思路



“瑞士军刀”指的就是 strings 这类万能小工具。PWN 入门题经常把 flag 直接以明文字符串写在二进制里。



## 解题过程



1. 下载附件（二进制程序）。

2. 用 strings 扫描：



   ```bash

   strings 文件名 | grep -i flag

   ```



3. 输出中直接出现 flag，提交即可。



## Flag



```

flag{***}  # 以实际输出为准

```



## 知识点总结



- **strings**：提取二进制中所有可打印字符串，逆向/PWN 题第一板斧。

- **PWN 入门**：很多“PWN 题”并不需要漏洞利用，先静态检查字符串。

- **工具链**：strings、file、objdump、radare2。



## 复盘



PWN 题不一定都要写 exploit：先 `file` 看类型、`strings` 找现成字符串，往往能捡到 flag。

