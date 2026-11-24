---

layout: post

title: "BugkuCTF 这不是md5 Writeup"

date: 2026-11-24

description: "一串十六进制字符串，每两位转一个 ASCII 字符，得到 flag。"

categories: [CTF, Writeup]

tags: [Bugku, Crypto, 十六进制]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：这不是md5

- **类型**：Crypto

- **分值**：30

- **描述**：666c61677b616537333538376261353662616566357d



## 解题思路



描述只有一串十六进制字符（0-9a-f），看起来像 MD5，但长度和内容都提示它是十六进制编码的 ASCII 文本。



## 解题过程



1. 每两个十六进制字符一组转 ASCII：



   ```python

   h = "666c61677b616537333538376261353662616566357d"

   print(bytes.fromhex(h))

   ```



2. 输出 `b'flag{ae73587ba56baef5}'`，提交。



## Flag



```

flag{ae73587ba56baef5}

```



## 知识点总结



- **十六进制编码**：`bytes.fromhex()` 一行还原。

- **区分 MD5**：MD5 是 32 位十六进制、不可逆；本题长度和“flag 开头”特征说明是编码而不是哈希。



## 反思



题目名“这不是md5”就是提示：看到疑似 md5 的字符串，先数长度、看能不能直接 hex 解码。

