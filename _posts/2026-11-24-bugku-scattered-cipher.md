---

layout: post

title: "BugkuCTF 散乱的密文 Writeup"

date: 2026-11-24

description: "六列矩阵的列置换：按 2 1 6 5 3 4 的列序还原，再按行读出 flag。"

categories: [CTF, Writeup]

tags: [Bugku, Crypto, 置换密码]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：散乱的密文

- **类型**：Crypto

- **描述**：lf5{ag024c483549d7fd@@1} 一张纸条上凌乱的写着 2 1 6 5 3 4



## 解题思路



密文 24 个字符，提示数字 2 1 6 5 3 4 表示**六列的排列顺序**。把密文按列分组后按顺序还原，再按行读出明文。



## 解题过程



1. 密文 24 字符 → 6 列 × 4 行。

2. 先按行分组成 4 行（每行 6 字符），再按列读出得到 6 个“密文列”：



   ```python

   cipher = "lf5{ag024c483549d7fd@@1}"

   rows = [cipher[i*6:(i+1)*6] for i in range(4)]

   cols = [''.join(r[c] for r in rows) for c in range(6)]

   # ['l03f', 'f25d', '544@', '{c9@', 'a4d1', 'g87}']

   perm = [2,1,6,5,3,4]

   orig = ['']*6

   for i, p in enumerate(perm):

       orig[p-1] = cols[i]

   plain = ''.join(''.join(orig[c][r] for c in range(6)) for r in range(4))

   print(plain)  # flag{52048c453d794df1}@@

   ```



3. 去掉末尾填充的 `@@`，得到 `flag{52048c453d794df1}`。



## Flag



```

flag{52048c453d794df1}

```



## 知识点总结



- **列置换密码**：把明文按矩阵写入再按列/行重排，需要根据提示恢复置换顺序。

- **矩阵思维**：先确定维度（总长 / 列数），再尝试行读/列读两种方向。



## 反思



这题我试了几种分组方向才找到正确读法。置换题不要死算，把矩阵画出来，方向对了一眼就能看出来。

