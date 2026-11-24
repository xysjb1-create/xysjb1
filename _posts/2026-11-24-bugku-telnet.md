---

layout: post

title: "BugkuCTF telnet Writeup"

date: 2026-11-24

description: "wireshark 流量分析：从 telnet 登录会话的明文流量里直接看到 flag。"

categories: [CTF, Writeup]

tags: [Bugku, MISC, 流量分析]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：telnet

- **类型**：MISC

- **描述**：key 格式 flag{xxxxxxxxxxxxxxxxxxxxxxxxxxx}

- **附件**：networking.pcap



## 解题思路



telnet 是明文协议，登录过程（用户名/密码）和数据都会出现在 TCP 载荷中，直接用流量分析工具或 strings 提取即可。



## 解题过程



1. 附件解压得到 `networking.pcap`，用 Wireshark 打开。

2. 过滤 `telnet`，跟踪 TCP 流（Follow TCP Stream）。

3. 在登录会话中可以看到 `hockeyinjune-virtual-machine login:`、`Password:` 以及回显的 flag：



   ```

   flag{d316759c281bf925d600be698a4973d5}

   ```



4. 也可以直接用 Python 在 pcap 中搜索可打印字符串，效果一样。



## Flag



```

flag{d316759c281bf925d600be698a4973d5}

```



## 知识点总结



- **明文协议**：telnet/FTP/HTTP 等协议流量可直接读出内容。

- **Wireshark 跟踪流**：Follow → TCP Stream 是流量题万能起手。

- **strings 技巧**：小流量包直接搜 flag 关键字符也能出。



## 反思



流量题先看协议、再跟流，比逐包翻快。以后遇到 pcap 先 strings 搜 flag，再上 Wireshark 精查。

