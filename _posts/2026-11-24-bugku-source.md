---

layout: post

title: "BugkuCTF source Writeup"

date: 2026-11-24

description: "Git 源码泄露：wget -r 下载 .git 目录，再用 git log / git show 找回历史提交里的 flag。"

categories: [CTF, Writeup]

tags: [Bugku, Web, Git泄露]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：source

- **类型**：Web

- **描述**：我哥说渗透我只用linux环境

- **思路**：题目名和描述都指向 Git 源码泄露，需要 Linux 环境下的 wget/git 工具。



## 解题思路



页面只有一句 “Hello,world! This is my friend:” 和一个邮箱，没有可交互功能。

题目名 source 暗示源码泄露，先扫描站点是否存在 `.git` 目录。



## 解题过程



1. 在 Linux（Kali/WSL）终端中递归下载 .git 目录：



   ```bash

   mkdir ~/ctf_source && cd ~/ctf_source

   wget -r http://靶机IP:端口/.git

   ```



2. 进入下载目录，用 git 查看提交历史：



   ```bash

   cd 靶机IP:端口

   git log --oneline

   git show <commit>

   ```



3. 历史提交中出现过 flag（可能先被删除，再查看历史版本即可找回）。

4. 提交 flag。



## Flag



```

flag{******}  # 实际提交值见平台记录

```



> 说明：该题的 flag 在历史提交中，因场景地址已过期，此处不贴具体值，方法可复用。



## 知识点总结



- **.git 泄露**：部署时把 .git 目录带到 Web 根目录，攻击者可以完整还原源码与历史。

- **wget -r**：递归下载站点目录结构。

- **git log / git show**：查看提交历史与任意版本内容。



## 反思



我最初卡在“怎么用 Linux 环境”上，其实核心只有两个命令：wget 下载、git 查看历史。以后遇到 source/备份类题目，先扫 `.git`、`.svn`、`www.zip`、`index.php.bak` 这类路径。

