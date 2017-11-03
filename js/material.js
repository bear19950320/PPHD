layui.use('element', function(){
  var element = layui.element;
});
/* 循环假数据填充 */
	for(var i=0;i<15;i++){
		$(".list-ul").append("<li class='layui-col-md4 layui-col-sm6 layui-col-xs6'>"+$(".list-ul>li").eq(i).html()+"</li>");
	}
		