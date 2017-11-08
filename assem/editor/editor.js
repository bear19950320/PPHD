// 全局变量
var content=[],imgSrc="";

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

var textDom='<li><div class="click-box writing" name="text" touch="flase"><div class="content" contentEditable>双击可编辑</div></div></li>'
/*---------------------- 点击选择文字添加Start ---------------------- */
$("#textAdd").click(function(){
		$(this).parents("li").siblings("li").find('.resize-panel').hide();
	  $("#editor-ul").append(textDom);
	  $("#editor-ul").find(".resize-panel").remove();
	  new ZResize({
		   stage: "#editor-ul", //舞台 
		   item: $('#editor-ul>li .click-box'), //可缩放的类名 
		 });
});
/*----------------------  点击选择文字添加End ---------------------- */

/* ------- 转Base64的方法  -------- */
function getBase64Image(img) {  
     var canvas = document.createElement("canvas");  
     canvas.width = img.width;  
     canvas.height = img.height;  
     var ctx = canvas.getContext("2d");  
     ctx.drawImage(img, 0, 0, img.width, img.height);  
     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
     var dataURL = canvas.toDataURL("image/"+ext);  
     return dataURL;  
}

/* ---- 图片显示到div里面的方法Start --------  */
var imgUrl="";
function readFile(obj) {
    var file = obj;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        imgss.push(this.result)
    }

}
function BackImage(imgFile) {
    var t_files = imgFile.files;
    var str = '';
    imgss = [];
    for(var i = 0, len = t_files.length; i < len; i++) {
        var filextension = t_files[i].name.substring(t_files[i].name.lastIndexOf("."), t_files[i].name.length);
        filextension = filextension.toLowerCase();
        readFile(t_files[i]);

        if((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
            skin("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
            imgFile.focus();
        } else {
            var path;
            if(document.all) {
                imgFile.select();
                path = document.selection.createRange().text;
                document.getElementById("img").innerHTML = "";
                document.getElementById("img").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"; //使用滤镜效果
            } else {
                path = window.URL.createObjectURL(imgFile.files[i]);
                
                $("#dome").attr("src",path);
                
                var img = $("#dome").attr("src");//imgurl 就是你的图片路径  
								var image = new Image();  
								image.src = img;  
								image.onload = function(){  
								  var base64 = getBase64Image(image); 
								  imgUrl=base64;
								  $("#editor-ul").append('<li style="width:220px;height:220px;"><div class="click-box" touch="flase"><div class="content" contentEditable><img style="width:100%;height:100%;" src='+imgUrl+' /></div></div></li>')
									$("#editor-ul").find(".resize-panel").remove();
								  new ZResize({
									   stage: "#editor-ul", //舞台 
									   item: $('#editor-ul>li .click-box'), //可缩放的类名 
									 });
									
								}                
            }
        }
        $("#img li").eq(0).before(str);
    }
}
/* ---------------- 图片显示到div里面的方法End ---------------------  */


/* ------------------ 点击添加图片按钮Start ------------------------- */
$("#imgAdd").click(function(event){
	$("#imgInput").trigger("click")
	event.stopPropagation();
})
/* ------------------ 点击添加图片按钮end ------------------------- */

/*------------------- 点击输入框呼唤拉动Start  ----------------------*/
$("#editor-ul>li").on("click",".click-box",function(event){
	
	$(this).parents("li").siblings("li").find('.resize-panel').hide();
	event.stopPropagation();
	if($(this).attr("touch")=="flase"){
		$(this).attr("touch",true);
		 new ZResize({
		   stage: "#editor-ul", //舞台 
		   item: $('#editor-ul>li .click-box'), //可缩放的类名 
		 }); 					
	}
});

/*------------------- 点击输入框呼唤拉动End  ----------------------*/

/*------------------- 双击呼唤div的编辑  ----------------------*/
$("#editor-ul>li>.click-box").dblclick(function(){
	$(this).children('.content').prop('contenteditable',true);
	$(this).parents("li").siblings("li").find('.content').prop('contenteditable',false);	


/*-------------------- 对字进行编辑 Start --------------------------- */
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
/*  -------------------- 对字进行编辑 END --------------------------- */
})

/*---------  调用储存html的JSON循环方法Start  ------------------*/ 
function htmlSql(){
	var editorBody=$("#editor-ul>li");
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
/*---------  调用储存html的JSON循环方法END  ------------------*/


/* 按钮 */
 
 
 
/*---------  浏览器离开事件  ------------------*/  
//	window.onbeforeunload=function(){
//		// 这里保存浏览器离开前的数据操作 //
//		console.log(1-1)
//		return "快住手！！别点下去！！";
//	};

/*-------------添加模板------------------------------------*/
$("#add").click(function(event){
	event.stopPropagation();
	$("#editor-body").find("#editor-ul").
	$("#editor-body").find("ul").attr("id"," ")
	
})















































































/*----------------点击保存的按钮时间 Start  ----------------------------------------*/
$("#keep").click(function(event){
	event.stopPropagation();
	htmlSql();
	// 转为json
	content=JSON.stringify(content)
 
	// 点击保存的时候的操作
	
	// 储存json样式
	sessionStorage.setItem("content",content)
	
   	location.href="../display/index.html"
})
/*----------------点击保存的按钮时间 END  ----------------------------------------*/