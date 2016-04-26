[查看在线效果](http://www.neove.cc/neoslide/test.html)
**neoslide是一款灵活的jQuery轮播插件，采用面向对象编写，扩展性强**
####特性如下 
* 跨浏览器支持：`支持IE8+` `火狐` `谷歌` `欧鹏`等主流浏览器
* 你可以随便添加图片个数，而不用改变HTML文档结构
* 支持自定义方向的`左右无缝滑动`，和`淡入淡入效果`
* 自定义显示/隐藏`顶部图片信息`介绍以及`底部滑动列表`
* 自定义`轮播区域的尺寸`，方便放在你网站的任何位置
* 底部列表支持`图片预览`,预览尺寸可依据轮播区域大小自动调整
* 可在此基础上扩展和编写自己喜欢的渐变动画以及其他模块

####
####如何使用neoslide
Step1:引入<strong>jQuery</strong>,<strong>neoslide</strong>和<strong>css</strong>样式表
```javascript
<script src="js/jquery-1.12.3.min.js"></script>
<script src="js/jquery.neoslide.js"></script>
<link rel="stylesheet" href="css/neoslide.css"/>
```
Step2:准备<strong>HTML</strong>代码
```javascript
<div class="banner-wrap">
    <div class="banner">
        <ul class="banner-img">
            <li><img /></li>
            <li><img /></li>
            <li><img /></li>
        </ul>       
        <div class="top"><p></p></div>
         <ul class="list">
             <li class="curr"></li>
         </ul>
    <img class="prew-img" />
</div>
```
Step3：调用插件

```javascript
$(function() {
    $('.banner').neoslide();//在这里需要传入参数配置，请看下面介绍
});
```

====
####参数配置
````javascript
$(function(){
    $('div.banner').neoslide({
        'w':'1390',         //轮播区域的宽度(必选项)
        'h':'450',          //轮播区域的高度(必选项)
        'direction':'right',//轮播方向left或者right，默认为right
        'delay':'4000',     //中间间隔时间，单位毫秒，默认4000
        'type':'slide',     //轮播方式：slide或者fadeIn,默认为slide
        'bot_list':true,    //顶部图片信息介绍，参数为布尔值(必选项)
        'top_info':true,    //底部列表，参数布尔值(必选项)
        //下面配置你的图片信息(必选项)
        'img':[
        {
            'top':'1...',     //顶部图片介绍信息（bot_list为false时省略不写）
            'src':'img/1.png'//图片路径
        }
        //下面可以随意添加任意数量图片信息
        ]
    });
});
````

===
#####至此你已经完成了所有的参数配置，一个灵活的轮播就可以放在你的网站上了，是不是很简答呢，赶紧拥有它,如果你有好的建议，欢迎协助开发 0.0










