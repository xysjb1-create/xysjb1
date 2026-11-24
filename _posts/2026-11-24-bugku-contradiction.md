---

layout: post

title: "BugkuCTF 矛盾 Writeup"

date: 2026-11-24

description: "PHP 弱类型：is_numeric 返回 false，但 $num == 1 为真——传入 ?num=1abc 即可。"

categories: [CTF, Writeup]

tags: [Bugku, Web, PHP弱类型]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：矛盾

- **类型**：Web

- **描述**：矛盾（启动场景后给源码）



## 解题思路



场景源码大意：



```php

$num = $_GET['num'];

if (!is_numeric($num)) {

    echo $num;

    if ($num == 1) echo 'flag{...}';

}

```



要求“不是数字，但又等于 1”——利用 PHP 弱类型比较：字符串与数字比较时，PHP 会从字符串开头提取数字，遇到非数字停止。`"1abc"` 不是数字（is_numeric false），但 `"1abc" == 1` 为真。



## 解题过程



1. 点击“启动场景”拿到靶机地址。

2. 在地址后加上 payload：



   ```

   http://靶机/?num=1abc

   ```



3. 页面输出 `1abcflag{...}`，提取 flag 提交。



## Flag



```

flag{b7cd7e9a0325b200a1801039de724b0f}

```



> 注：场景每次生成的 flag 不同，以实际页面输出为准。



## 知识点总结



- **PHP 弱类型比较**：`==` 会做类型转换，字符串转数字时从头截取。

- **is_numeric**：只认纯数字/科学计数法/正负号，`"1abc"` 返回 false。

- **CTF 常见 payload**：`?num=1abc`、`?num=1e1` 等。



## 反思



“矛盾”题名就是在说这种“既不是数字又等于数字”的漏洞。以后看到 `is_numeric` + `==` 组合，直接构造 `1abc`。

