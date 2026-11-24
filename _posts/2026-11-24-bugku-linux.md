---

layout: post

title: "BugkuCTF linux Writeup"

date: 2026-11-24

description: "Linux 基础题：附件是嵌套压缩包，逐层解压后得到 tar 包，用 strings 抓 key{}。"

categories: [CTF, Writeup]

tags: [Bugku, MISC, Linux]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：linux

- **类型**：MISC

- **分值**：15

- **提示**：key{}

- **描述**：linux 基础问题



## 解题思路



附件下载后是 ZIP，里面还有 `linux/1.tar.gz`，属于“嵌套压缩包 + 磁盘镜像/文件”类题目，最终目标是用 Linux 基础命令（tar、strings、grep）把 `key{}` 找出来。



## 解题过程



1. 附件解压得到 `linux/1.tar.gz`。

2. 解压 tar.gz 后得到一个 14MB 的 `test/flag` 文件（内容是大量空字节 + 隐藏字符串）。

3. 用 Python 直接在原始数据中搜索 `key{`：



   ```python

   import re

   data = open("test/flag","rb").read()

   for m in re.finditer(rb"key\{[^}]{0,100}\}", data):

       print(m.group())

   ```



4. 得到 `key{feb81d3834e2423c9903f4755464060b}`，提交。



## Flag



```

key{feb81d3834e2423c9903f4755464060b}

```



## 知识点总结



- **strings 思维**：Linux 题常用的 `strings 文件 | grep key`，本质是在二进制里找可打印字符串。

- **嵌套压缩**：先 file 看类型，再层层解压。

- **注意 flag 格式**：本题提示是 `key{}` 而不是 `flag{}`，提交前先看提示。



## 反思



我一开始以为附件直接就是文本，忽略了它是 ZIP。做 MISC 题先 file/看文件头，比硬猜快得多。

