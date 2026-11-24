---

layout: post

title: "BugkuCTF 眼见非实 Writeup"

date: 2026-11-24

description: "docx 里藏 flag：把 docx 当 zip 解压，在 document.xml 中找到隐藏文字 flag{F1@g}。"

categories: [CTF, Writeup]

tags: [Bugku, MISC, 文件分析]

---



## 题目信息



- **平台**：BugkuCTF

- **题目**：眼见非实

- **类型**：MISC

- **描述**：flag{}



## 解题思路



附件解压得到 docx 文件，但打开显示乱码/看不到内容，说明 flag 被藏在文档结构里。docx 本质是 zip，直接解压查看内部 XML。



## 解题过程



1. 把 docx 后缀改为 zip 解压，或直接用 Python `zipfile` 读取。

2. 查看 `word/document.xml`，搜索 flag：



   ```python

   import zipfile, re

   z = zipfile.ZipFile("xxx.docx")

   for n in z.namelist():

       d = z.read(n)

       for m in re.finditer(rb"(flag|key)\{[^}]{0,80}\}", d, re.I):

           print(n, m.group())

   ```



3. 在 document.xml 中找到 `flag{F1@g}`，提交。



## Flag



```

flag{F1@g}

```



## 知识点总结



- **Office 文件本质**：docx/xlsx/pptx 都是 zip + XML。

- **隐藏文字**：Word 可以把文字设为隐藏/白色，但 XML 里始终存在。

- **一句话解压**：改后缀 → 解压 → 搜 flag。



## 反思



“眼见非实”这个题名点题：页面/文档显示不出来的东西，去文件结构里找。

