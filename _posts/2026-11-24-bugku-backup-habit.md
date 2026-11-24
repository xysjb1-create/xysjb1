---

layout: post

title: "BugkuCTF 备份是个好习惯 Writeup"

date: 2026-11-24

description: "index.php.bak 源码泄露 + 0e 碰撞：?kkey1=QNKCDZO&kkey2=240610708 得到 flag。"

categories: [CTF, Writeup]

tags: [Bugku, Web, 源码泄露, MD5碰撞]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：备份是个好习惯

- **类型**：Web

- **分值**：20



## 解题思路



题目名提示“备份”，直接尝试常见备份文件名：`index.php.bak`、`www.zip`、`index.php.swp` 等。下载到源码后是 PHP 弱类型 + MD5 碰撞题。



## 解题过程



1. 访问 `http://靶机/index.php.bak` 下载源码。

2. 源码逻辑（简化）：从 URL 取 `kkey1`、`kkey2`，经过变量覆盖/过滤后，判断两个值的 MD5 是否相等且值不相等。

3. 典型解法是 MD5 0e 碰撞字符串：



   ```

   ?kkey1=QNKCDZO&kkey2=240610708

   ```



   两个 MD5 都以 `0e` 开头，弱比较时都被当作 0。



4. 也可以利用数组绕过：`?kkey1[]=1&kkey2[]=2`。

5. 页面输出 flag。



## Flag



```

flag{53575a31ae20860a02f8fe9104dce280}

```



## 知识点总结



- **备份文件泄露**：.bak / .swp / .zip / .tar.gz 等是源码泄露重灾区。

- **MD5 弱比较**：`0e` 开头的 32 位 MD5 在 `==` 下相等。

- **数组绕过**：PHP 中 `md5(array)` 返回 null，两个 null 相等。



## 反思



这题把“备份习惯”和“弱类型”结合：先找备份拿源码，再根据源码构造 payload。以后扫目录先跑备份文件字典。

