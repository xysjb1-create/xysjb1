---

layout: post

title: "BugkuCTF 隐写 Writeup"

date: 2026-11-24

description: "PNG 高度被篡改：通过 IHDR CRC 暴露出正确高度 500，修复后图片底部出现 BUGKU{a1e5aSA}。"

categories: [CTF, Writeup]

tags: [Bugku, MISC, PNG]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：隐写

- **类型**：MISC

- **描述**：BUGKU{xxxx}

- **附件**：包含 2.png 的 RAR 压缩包



## 解题思路



RAR 解压得到 PNG，打开只能看到上半部分内容，提示高度被修改。PNG 的 IHDR 里有宽高和 CRC，篡改高度会导致 CRC 不匹配；用 CRC 反推正确高度即可修复。



## 解题过程



1. 解压附件得到 `2.png`（提示：Windows 自带 tar 可解 RAR）。

2. 用 Python 读取 IHDR：当前宽 500、高 420，CRC 校验失败。

3. 暴力尝试高度值，找到使 IHDR CRC 匹配的高度：



   ```python

   import struct, zlib

   data = bytearray(open("2.png","rb").read())

   w, h = struct.unpack('>II', bytes(data[16:24]))

   crc_stored = struct.unpack('>I', bytes(data[29:33]))[0]

   for hh in range(1, 4000):

       test = bytes(data[12:16]) + struct.pack('>II', w, hh) + bytes(data[24:29])

       if (zlib.crc32(test) & 0xffffffff) == crc_stored:

           print("correct height:", hh); break

   ```



4. 正确高度为 500（宽高一致），修复后保存图片，底部出现 flag。



## Flag



```

BUGKU{a1e5aSA}

```



## 知识点总结



- **PNG 结构**：签名 + IHDR（宽、高、位深、颜色类型等）+ CRC。

- **CRC 校验**：篡改宽高会让 CRC 不匹配，可用来反推原始值。

- **图片修复工具**：010 Editor / tweakpng / 随波逐流都能直接改高度。



## 反思



这题让我第一次真正理解 PNG 的 IHDR 和 CRC：原来“图片显示不全”不一定是损坏，可能只是高度被改小。

