---

layout: post

title: "BugkuCTF .!? Writeup"

date: 2026-11-24

description: "Short Ook! 编码：把 . ! ? 两两分组映射成 Brainfuck 指令，执行后得到 flag{bugku_jiami}。"

categories: [CTF, Writeup]

tags: [Bugku, Crypto, Ook, Brainfuck]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：.!?

- **类型**：Crypto

- **分值**：20

- **附件**：一个只有 `.` `!` `?` 三个字符的 txt



## 解题思路



题目名直接给出字符集，这是 **Short Ook!** —— Ook! 的压缩版：连 “Ook” 前缀都省了，只剩 `.` `!` `?`，每两个字符表示一个 Ook 词对，即一个 Brainfuck 指令。



## 解题过程



1. 去掉附件中的空格和换行，得到连续的 `. ! ?` 序列（长度 494，偶数）。

2. 按 2 个字符一组，映射为 Brainfuck 指令：



   ```python

   BF = {'.?':'>', '?.':'<', '..':'+', '!!':'-', '.!':',', '!.':'.', '!?':'[', '?!':']'}

   cipher = ''.join(c for c in raw if c in '.!?')

   bf = ''.join(BF[cipher[i:i+2]] for i in range(0, len(cipher), 2))

   ```



   > 这里的关键是映射方向：`!.` 是输出（Ook! Ook.），`!!` 是减号（Ook! Ook!），`.!` 是输入（Ook. Ook!）。一开始我把这几组弄反了，程序跑成了死循环。



3. 用 Brainfuck 解释器执行，输出：



   ```

   flag{bugku_jiami}

   ```



## Flag



```

flag{bugku_jiami}

```



## 知识点总结



- **Short Ook!**：`.` `!` `?` 两两一组编码 8 种 Brainfuck 指令。

- **Ook 词对映射**：`Ook. Ook?` = >、`Ook? Ook.` = <、`Ook. Ook.` = +、`Ook! Ook!` = -、`Ook. Ook!` = ,、`Ook! Ook.` = .、`Ook! Ook?` = [、`Ook? Ook!` = ]。

- **映射方向**：后缀决定语义，`!.` 和 `.!` 千万别搞反。



## 反思



这道题卡在映射表上：网上有些 writeup 的表格写反了，导致 BF 程序死循环。正确做法是按 Ook 词对顺序推导映射，再用小样本闭环验证。

