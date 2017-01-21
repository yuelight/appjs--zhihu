### 根据知乎日报API构建的简单移动端页面

api来源于<a href="https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90">知乎日报API分析</a>

---

使用Express做后台服务，并使用request模块构建简单的反向代理处理不能跨域访问的问题

前端使用app.js和zepto构建页面结构和处理逻辑，并在页面中构造了微型模板引擎，将后台的数据渲染到前台

页面样式中引用了部分media object的样式，快速构建出信息-图片列表
