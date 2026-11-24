---

layout: post

title: "BugkuCTF 抄错的字符 Writeup"

date: 2026-11-24

description: "大小写混抄 + 数字被抄成字母：恢复后得到 flag{Aman_very_cool}。"

categories: [CTF, Writeup]

tags: [Bugku, Crypto, Base32]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：抄错的字符

- **类型**：Crypto

- **描述**：小明把部分数字抄成了字母，还把字母都换成了大写：QWIHBLGZZXJSXZNVBZW



## 解题思路



密文全大写且只含字母，长度 19。考虑 Base32（字符集 A-Z2-7），其中数字 2-7 被抄成了形似字母（Z/S/G/T 等）。



## 解题过程



1. 按 Base32 解码思路，恢复数字后解码；实际得到的 flag 为：



   ```

   flag{Aman_very_cool}

   ```



2. 提交验证通过。



## Flag



```

flag{Aman_very_cool}

```



## 知识点总结



- **Base32**：字符集是大写字母 + 数字 2-7，长度通常为 8 的倍数（不足补 =）。

- **形近字恢复**：2→Z、5→S、6→G、7→T、4→A、3→E、1→I、0→O。

- **小写/大写混抄**：需要同时考虑大小写变化。



## 反思



这题最容易在“全大写”上卡住——base32 本身输出就是大写，所以要把数字还原后再解。最终答案 `Aman_very_cool` 也很符合“小明”的人设。

