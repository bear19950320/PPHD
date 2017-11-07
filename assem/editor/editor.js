// 全局变量
var editorBody=$("#editor-ul>li");
var content=[] 

layui.use('element', function(){
  var element = layui.element;
});
/*------------------- 关闭编辑工具框  ----------------------*/
$(".back-close").click(function(event){
	event.stopPropagation();
	$("#action-bar").animate({"right":"-200px"});
	$(".back-open").animate({"right":"0"})
});

/*------------------- 呼唤编辑工具框  ----------------------*/
$(".back-open").click(function(event){
	event.stopPropagation();
	$("#action-bar").animate({"right":0});
	$(".back-open").animate({"right":"-200px"})
});

/*------------------- 点击输入框呼唤拉动  ----------------------*/
$("#editor-ul>li").on("click",".click-box",function(event){
	$(this).parents("li").siblings("li").find('.resize-panel').hide();
	event.stopPropagation();
	if($(this).attr("touch")=="flase"){
		$(this).attr("touch",true);
		 new ZResize({
		   stage: "#editor-ul", //舞台 
		   item: $('#editor-ul>li>.click-box'), //可缩放的类名 
		 }); 					
	}
});


/*------------------- 双击呼唤div的编辑  ----------------------*/
$("#editor-ul>li>.click-box").dblclick(function(){
	$(this).children('.content').prop('contenteditable',true);
	$(this).parents("li").siblings("li").find('.content').prop('contenteditable',false);		
//			$('.writing>.content').mouseup(function(){
//			var s=window.getSelection();
//			s=s.toString();
//			s=s.replace(/([\'\"\<\>\[\]\/\?\.\*\+\^\$\!])/g,'\\$1');
//			var reg=new RegExp(s);
//			console.log("reg-----------"+reg);
//			var h=$(this).html();
//			console.log("h变量--------"+h)
//			 if(reg.test(h)){
//			 	console.log(s)
//			 	console.log(s==NaN)
////				 	if(s!=" "){
////				 		var reg1=new RegExp('^(.*?)('+s+')(.*?)$');
////				 		$(this).html(h.replace(reg1,'$1<span>$2</span>$3'));console.log(reg1);
////				 	}
//			 }
//		});
})

var textDom='<li><div class="click-box writing" name="text" touch="flase"><div class="content" contentEditable>双击可编辑</div></div></li>'
 /* 点击选择文字添加 */
$("#textAdd").click(function(){
	 $("#editor-ul").append(textDom)
});

/*---------  调用储存html的方法  ------------------*/    
  function htmlSql(){
  	for(var i=0;i<editorBody.length;i++){
			function GetJsonData() {
				var json = {
					Css:editorBody.eq(i).find(".click-box").attr("style"),
					content:editorBody.eq(i).find(".content").html(),
					Class:editorBody.eq(i).find(".click-box").attr('name'),
					Width:$(".content>img").width(),
					Height:$(".content>img").height()
//					 jim:{
//								
//						}
				};	
				console.log("JSON内容--"+json);
				return json;
			}
			content.push(GetJsonData())
		}
  }

/* 按钮 */
 
 
 
/*---------  浏览器离开事件  ------------------*/  
//	window.onbeforeunload=function(){
//		// 这里保存浏览器离开前的数据操作 //
//		console.log(1-1)
//		return "快住手！！别点下去！！";
//	};


$("#keep").click(function(event){
	event.stopPropagation();
	// 点击保存的时候的操作
	htmlSql();
	
	// 转为json
	
	content=JSON.stringify(content)

	sessionStorage.setItem("content",content)
	
	location.href="../display/index.html"
})
