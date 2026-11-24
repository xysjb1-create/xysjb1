---

layout: post

title: "BugkuCTF 贝斯家族 Writeup"

date: 2026-11-24

description: "Base91 编码：密文里出现 @、< 等符号，用 base91 解码得到 flag。"

categories: [CTF, Writeup]

tags: [Bugku, Crypto, Base91]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：贝斯家族

- **类型**：Crypto

- **分值**：30

- **描述**：@iH<,{bdR2H;i6*Tm,Wx2izpx2!



## 解题思路



题目名“贝斯家族”即 Base 家族。密文中出现 `@`、`<`、`,` 等 Base64 不存在的字符，优先尝试 Base91/Base92。



## 解题过程



1. 写一个 Base91 解码函数（标准字母表 91 个字符）：



   ```python

   B91 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\""

   def b91decode(s):

       v = -1; b = 0; n = 0; out = bytearray()

       for c in s:

           if c not in B91: continue

           code = B91.index(c)

           if v < 0: v = code

           else:

               v += code * 91

               b |= v << n

               n += 13 if (v & 8191) > 88 else 14

               while n > 7:

                   out.append(b & 255); b >>= 8; n -= 8

               v = -1

       if v >= 0:

           b |= v << n; out.append(b & 255)

       return bytes(out)

   print(b91decode("@iH<,{bdR2H;i6*Tm,Wx2izpx2!"))

   ```



2. 输出 `b'flag{554a5058c9021c76}'`，提交。



## Flag



```

flag{554a5058c9021c76}

```



## 知识点总结



- **Base91**：用 91 个可打印字符表示数据，密文常含 `@`、`<`、`~` 等符号。

- **Base 家族识别**：看字符集——字母数字是 Base64/62，含符号可能是 85/91/92。

- **在线工具**：随波逐流等工具可以一键识别。



## 反思



Base 家族题关键是“认字符集”。先看密文里出现了哪些特殊符号，再决定试哪种 base。

