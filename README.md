# 插件说明
基于jquery,网页中开始 提示插件
# 使用案例
```
<script src="./jquery.min.js"></script>
<script src="./jquery.guide.js"></script>
<script>
$.guide([{
    selector: '.logo',
    content: '<img src="guide-1.png" width="102" height="47">',
    align: 'left'
}, {
    selector: '.ad img',
    content: '<img src="guide-2.png" width="104" height="47">'
}, {
    selector: '#back',
    content: '<img src="guide-3.png" width="72" height="47">',
    align: 'left'
}, {
    selector: '.demo img',
    content: '<img src="guide-4.png" width="86" height="47">'
}]);
</script>
```