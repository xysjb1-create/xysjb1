---

layout: post

title: "BugkuCTF source Writeup"

date: 2026-09-22

description: "Git 泄露真实过程：wget 下载 .git，用 reflog 和 fsck 挖出被 reset 的隐藏提交，真 flag 在悬空提交 40c6d51 里。"

categories: [CTF, Writeup]

tags: [Bugku, Web, Git泄露]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：source

- **类型**：Web

- **提示**：我哥说渗透我只用linux环境

- **靶机**：http://160.202.254.160:17384/（已过期）



## 解题思路



页面只有 “Hello,world! This is my friend:——tig——”，`tig` 倒过来是 `git`，提示这是 Git 源码泄露题。



## 解题过程



1. 在 Kali 里用 wget 递归下载 .git：`wget -r --no-parent http://靶机/.git/`，再 `cd` 进带冒号的目录。

2. `git log --oneline` 只有两个提交（flag is here?、this is index.html），`git log -p` 先看到假 flag `flag{not_here}`；`git show 13ce8d0` 又见 `flag{nonono}`、`flag{hahahahahahahahahahahnotflag}`。

3. 真正线索在 `git reflog`：HEAD 曾指向 `40c6d51`、`13ce8d0` 等提交又被 reset；`git fsck --lost-found` 列出这些悬空提交。

4. `git show 40c6d51` 看到 flag.txt 被改成真正的 flag。



## Flag



```

flag{git_is_good_distributed_version_control_system}

```



## 踩坑与知识点



- wget 把带参数的 URL 存成 refs 文件，Git 会报大量警告；第一次下载不完整时 `git cat-file` 报 Not a valid object name，清空后重新下载才完整。

- .git 泄露能还原全部提交历史；`git reflog` 和 `git fsck --lost-found` 可以找回被 reset 的悬空提交，假 flag 要甄别。

