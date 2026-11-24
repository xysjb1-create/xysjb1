---

layout: post

title: "BugkuCTF 这是一张单纯的图片 Writeup"

date: 2026-09-28

description: "图片隐藏信息：用 strings / 十六进制查看器检查图片尾部，找到附加的编码并解码。"

categories: [CTF, Writeup]

tags: [Bugku, MISC, 图片隐写]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：这是一张单纯的图片

- **类型**：MISC



## 解题思路



题目名“单纯”是反话，图片里必然藏了东西。常见藏法：图片尾部的附加数据、EXIF 信息、或文件头后的编码串。



## 解题过程



1. 用 `strings` 或 010 Editor/winhex 打开图片，查看文件尾部。

2. 发现一段附加的编码内容（base64/十六进制等）。

3. 根据编码特征解码，得到 flag。



```bash

strings image.png | tail -20

```



## Flag



```

flag{***}  # 以实际输出为准

```



## 知识点总结



- **图片附加数据**：PNG/JPEG 可以在文件末尾追加任意数据而不影响显示。

- **分析工具**：strings、binwalk、010 Editor、winhex。

- **编码识别**：拿到附加内容后先看字符集判断编码类型。



## 复盘



图片题先查尾部，再查 EXIF/元信息，最后才考虑像素级隐写（LSB 等）。

