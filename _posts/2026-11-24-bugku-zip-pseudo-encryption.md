---

layout: post

title: "BugkuCTF zip伪加密 Writeup"

date: 2026-11-24

description: "ZIP 伪加密：把本地文件头和中央目录的加密标志位清掉，重新解压得到 flag{Adm1N-B2G-kU-SZIP}。"

categories: [CTF, Writeup]

tags: [Bugku, MISC, ZIP]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：zip伪加密

- **类型**：MISC

- **描述**：zip伪加密

- **附件**：一个小 zip 文件



## 解题思路



ZIP 的“伪加密”指：文件数据其实没加密，但压缩包的**加密标志位**被置 1，解压软件就要求密码。只要改回标志位即可正常解压。



## 解题过程



1. 用 Python 打开 ZIP，发现解压报“需要密码”。

2. 找到本地文件头（`PK\x03\x04`）的通用标志位（偏移 6）和中央目录（`PK\x01\x02`）的标志位（偏移 8），清除 bit0：



   ```python

   data = bytearray(open("xxx.zip","rb").read())

   # 本地文件头

   idx = data.find(b'PK\x03\x04')

   flag = int.from_bytes(data[idx+6:idx+8], 'little')

   data[idx+6:idx+8] = (flag & ~1).to_bytes(2, 'little')

   # 中央目录

   idx = data.find(b'PK\x01\x02')

   flag = int.from_bytes(data[idx+8:idx+10], 'little')

   data[idx+8:idx+10] = (flag & ~1).to_bytes(2, 'little')

   ```



3. 重新解压得到 `flag.txt`，内容即 flag。



## Flag



```

flag{Adm1N-B2G-kU-SZIP}

```



## 知识点总结



- **ZIP 结构**：本地文件头 + 文件数据 + 中央目录 + 目录结束记录。

- **伪加密**：标志位 bit0 表示“加密”，与真实数据无关。

- **修复工具**：ZipCenOp、7-Zip 改标志位、Python 手动修复。



## 反思



这题是纯格式题：知道 ZIP 头结构，改两个字节就解开了。以后遇到“要密码但密码不对”的 zip，先查伪加密。

