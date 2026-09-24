---
layout: post
title: "BugkuCTF GET Writeup"
date: 2026-09-24
categories: [CTF, Writeup]
tags: [Bugku, Web, GET传参]
---

## 题目信息

- **平台**：BugkuCTF
- **题目**：GET
- **类型**：Web
- **分值**：10
- **描述**：无
- **目标地址**：`http://160.202.254.160:11209`

## 解题思路

题目直接给出了 PHP 源码：

```php
$what = $_GET['what'];
echo $what;
if ($what == 'flag')
    echo 'flag{***}';
