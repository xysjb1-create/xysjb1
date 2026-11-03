---
layout: default
title: 标签
description: 按标签浏览全部文章
permalink: /tags/
---

<div class="section-title">标签云</div>
<div class="post-tags" style="margin-bottom: 34px;">
  {% for tag in site.tags %}
  <a class="tag" href="#{{ tag[0] | slugify }}">#{{ tag[0] }} <span style="opacity:.6">{{ tag[1].size }}</span></a>
  {% endfor %}
</div>

{% for tag in site.tags %}
<div class="tag-group" id="{{ tag[0] | slugify }}">
  <h2>#{{ tag[0] }} <span class="count" style="font-size:13px;color:var(--muted);font-weight:400;">{{ tag[1].size }} 篇</span></h2>
  <ul class="archive-list">
    {% for post in tag[1] %}
    <li>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</div>
{% endfor %}
