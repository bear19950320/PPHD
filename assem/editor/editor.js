
layui.use('element', function(){
  var element = layui.element;
});
$(".back-close").mousemove(function(event){
	event.stopPropagation();
	$("#action-bar").animate({"right":"-200px"});
	$(".back-open").animate({"right":"0"})
})
//function backClose(){
//	var backOpen=document.getElementsByClassName('back-open');
//	backOpen.style.right='0'
//}
$(".back-open").mouseover(function(event){
	event.stopPropagation();
	$("#action-bar").animate({"right":0});
	$(".back-open").animate({"right":"-200px"})
})
/* 点击输入框呼唤拉动  */
$("#editor-ul>li>.click-box").click(function(e){
	$(this).parents("li").siblings("li").find('.resize-panel').hide();
	e.stopPropagation();
	if($(this).attr("touch")=="flase"){
		$(this).attr("touch",true);
		$(this).children('.content').prop('contenteditable',true);
		 new ZResize({
		   stage: "#editor-ul", //舞台 
		   item: $(this), //可缩放的类名 
		 }); 					
	}
});
/* 按钮 */
var editorBody=$("#editor-ul>li");
var content=[]  
    
$("#keep").click(function(){
	for(var i=0;i<editorBody.length;i++){
		function GetJsonData() {
				var json = {
					Css:editorBody.eq(i).find(".click-box").attr("style"),
					content:editorBody.eq(i).find(".content").html(),
					Class:editorBody.eq(i).find(".click-box").attr('name'),
					Width:$(".content>img").width(),
					Height:$(".content>img").height()
				};	
			console.log(json)
			return json;
		}
		content.push(GetJsonData())
	}
	content=JSON.stringify(content)
	sessionStorage.setItem("content",content)
	location.href="../display/index.html"
})
