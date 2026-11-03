---
layout: default
title: 首页
description: 记录网络安全学习之路 · CTF Writeups 与安全笔记
---

<section class="hero">
  <div class="hero-terminal">xysjb1-create@blog:~$ whoami<span class="cursor"></span></div>
  <h1>Hi，我是 <span class="accent">xysjb1-create</span></h1>
  <p>一名正在学习网络安全的学习者，这里记录我的 BugkuCTF 题解、安全笔记，以及从「做过」到「会做」的每一步。</p>
  <div class="hero-tags">
    <span class="chip">#CTF</span>
    <span class="chip">#Web安全</span>
    <span class="chip">#Writeup</span>
    <span class="chip">#Linux</span>
  </div>
  <div class="hero-stats">
    <div class="hero-stat"><strong>{{ site.posts.size }}</strong><span>篇文章</span></div>
    <div class="hero-stat"><strong>{{ site.categories.size }}</strong><span>个分类</span></div>
    <div class="hero-stat"><strong>{{ site.tags.size }}</strong><span>个标签</span></div>
  </div>
</section>

<div class="section-title">最新文章 <span class="count">{{ site.posts.size }}</span></div>
<ul class="post-list">
  {% for post in site.posts %}
  <li class="post-card">
    <div class="post-card-head">
      <h3 class="post-card-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <time class="post-card-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
    </div>
    {% if post.description %}
    <p class="post-card-desc">{{ post.description }}</p>
    {% elsif post.excerpt %}
    <p class="post-card-desc">{{ post.excerpt | strip_html | strip_newlines | truncate: 110 }}</p>
    {% endif %}
    <div class="post-card-foot">
      {% for tag in post.tags limit: 4 %}
      <a class="tag" href="{{ '/tags/' | relative_url }}#{{ tag | slugify }}">#{{ tag }}</a>
      {% endfor %}
      <a class="read-more" href="{{ post.url | relative_url }}">阅读全文 →</a>
    </div>
  </li>
  {% endfor %}
</ul>

<div class="section-title" style="margin-top: 52px;">分类</div>
<div class="category-grid">
  {% for category in site.categories %}
  <a class="category-card" href="{{ '/archive/' | relative_url }}">
    <span>{{ category[0] }}</span>
    <span class="num">{{ category[1].size }} 篇</span>
  </a>
  {% endfor %}
</div>
