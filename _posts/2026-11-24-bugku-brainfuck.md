---

layout: post

title: "BugkuCTF [+-<>] Writeup"

date: 2026-11-24

description: "Brainfuck 编码：把 +-<>[]., 八种符号交给 BF 解释器执行，输出里就有 flag。"

categories: [CTF, Writeup]

tags: [Bugku, Crypto, Brainfuck]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：[+-<>]

- **类型**：Crypto



## 解题思路



题目名直接给出了字符集——Brainfuck 的八种指令。这类题不需要逆向思维，直接丢给 Brainfuck 解释器执行即可。



## 解题过程



1. 复制题目给的 Brainfuck 代码。

2. 用在线/本地 Brainfuck 解释器运行：



   ```python

   def run_bf(code, limit=1000000):

       tape=[0]*30000; ptr=0; pc=0; out=[]; stack=[]; jumps={}

       for i,c in enumerate(code):

           if c=='[': stack.append(i)

           elif c==']':

               j=stack.pop(); jumps[i]=j; jumps[j]=i

       n=0

       while pc < len(code) and n < limit:

           c=code[pc]

           if c=='>': ptr+=1

           elif c=='<': ptr-=1

           elif c=='+': tape[ptr]=(tape[ptr]+1)%256

           elif c=='-': tape[ptr]=(tape[ptr]-1)%256

           elif c=='.': out.append(chr(tape[ptr]))

           elif c=='[' and tape[ptr]==0: pc=jumps[pc]

           elif c==']' and tape[ptr]!=0: pc=jumps[pc]

           pc+=1; n+=1

       return ''.join(out)

   ```



3. 运行输出即为 flag，提交。



## Flag



```

flag{***}  # 以实际输出为准

```



## 知识点总结



- **Brainfuck**：8 个指令、图灵完备，`+ - < > [ ] . ,` 分别表示加减、指针移动、循环和输入输出。

- **识别特征**：密文只含这 8 种字符，直接搜索 Brainfuck 解释器。



## 复盘



这题是最“标准”的 Brainfuck 入门题：认识字符集 → 找解释器 → 跑出 flag。之后遇到 `Ook!`、`Short Ook!` 都属于同一家族。

