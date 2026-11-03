---
layout: default
title: 归档
description: 全部文章按时间归档
permalink: /archive/
---

<div class="section-title">全部文章 <span class="count">{{ site.posts.size }}</span></div>

{% assign current_year = "" %}
{% for post in site.posts %}
  {% assign year = post.date | date: "%Y" %}
  {% if year != current_year %}
    {% if current_year != "" %}
        </ul>
      </div>
    {% endif %}
    {% assign current_year = year %}
    <div class="archive-year">
      <h2>{{ year }}</h2>
      <ul class="archive-list">
  {% endif %}
    <li>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m-%d" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% if forloop.last %}
      </ul>
    </div>
  {% endif %}
{% endfor %}
