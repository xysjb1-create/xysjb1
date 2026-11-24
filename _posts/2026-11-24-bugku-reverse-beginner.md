---

layout: post

title: "BugkuCTF 入门逆向 Writeup"

date: 2026-11-24

description: "PE32 逆向入门：baby.exe 把 flag 以 mov byte ptr [esp+xx], imm8 的形式逐字节写入栈，提取立即数拼起来即可。"

categories: [CTF, Writeup]

tags: [Bugku, Reverse, PE]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：入门逆向

- **类型**：Reverse

- **分值**：10

- **描述**：来源：XJNU

- **附件**：baby.exe（PE32）



## 解题思路



下载附件解压得到 `baby.exe`。flag 直接硬编码在 `_main` 函数中，以 `mov byte ptr [esp+xx], imm8` 的形式逐字节写入栈上，按顺序取出立即数再转 ASCII 即可。



## 解题过程



1. 确认文件类型：`file baby.exe` → PE32 executable (GUI) Intel 80386。

2. 用 Python 解析 PE，扫描机器码中的 `C6 44 24 XX imm8` 指令（mov byte ptr [esp+XX], imm8），按出现顺序收集立即数：



   ```python

   import re

   data = open("baby.exe","rb").read()

   seq = [m.group(2)[0] for m in re.finditer(rb'\xc6\x44\x24(.)(.)', data, re.S)]

   print(bytes(seq))   # b'flag{Re_1s_S0_C0OL}'

   ```



3. 拼接得到的字节序列就是 flag，直接提交。



## Flag



```

flag{Re_1s_S0_C0OL}

```



## 知识点总结



- **PE 结构**：MZ 头 + PE 头 + 节表，代码在 .text 节。

- **x86 指令编码**：`C6 /0 ib` 是 `mov r/m8, imm8`；`44 24 XX` 表示 `[esp+XX]` 寻址。

- **静态提取**：不需要 IDA，按字节模式扫描就能还原硬编码字符串。



## 反思



这题的关键是不要被“逆向”吓住：flag 是明文写进二进制的，只是被拆成了单字节 mov 指令。先 file 看类型，再 strings/字节扫描，最后才上 IDA。

