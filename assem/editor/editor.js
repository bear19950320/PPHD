// 全局变量
var content=[],imgSrc="",conatent=[],log=[];

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

var textDom='<li style="width:20%;left:25%;"><div class="click-box writing" name="text" touch="flase"><div class="content" contentEditable>双击可编辑</div></div></li>'
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

/* ------- 转Base64的方法Start  -------- */
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
/* ------- 转Base64的方法End  -------- */

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
/* ------------ 添加图片的方法！ zindex是图片的层级叠加 Stasrt ------------ */
var zIndex=0;
function BackImage(imgFile) {
		zIndex++;
    
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
									/* -----转换为Base64 -------*/
								  var base64 = getBase64Image(image); 
								  imgUrl=base64;
								  $("#editor-ul").append('<li style="z-index:'+zIndex+';width:220px;height:220px;"><div class="click-box img-box" touch="flase"><div class="content" contentEditable><img style="width:100%;height:100%;" src='+imgUrl+' /></div></div></li>')
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

/* -----------音乐的input change事件 ---------------- */
function backMusic(musicfile){
	// console.log(musicfile)
	console.log(musicfile.value)
	var audio = document.createElement('audio');
audio.src =musicfile.value; //这里放音乐的地址
audio.autoplay = 'autoplay';
document.body.appendChild(audio);
//var music=window.URL.createObjectURL(musicfile.files);
//console.log(music)
	//$("#editor-ul").append('<audio id="music-body" style="display: none;" autoplay="autoplay" src="'+musicfile.value+'" controls="nodownload" controlsList="nodownload"></audio>')
}


/* --- 图片点击让其层级变高 --- 暂未实现 --- */
$("#editor-ul>li").on("click","img",function(event){
	event.stopPropagation();
	 console.log(1)
})

/* ------------------------ 点击添加音乐按钮Start ------------------ */
$("#musicAdd").click(function(event){
	event.stopPropagation();
	$("#musicInput").trigger("click");
})
/* ------------------------ 点击添加音乐按钮End ------------------ */

/* ------------------ 点击添加图片按钮Start ------------------------- */
$("#imgAdd").click(function(event){
	event.stopPropagation();
	$("#imgInput").trigger("click");
	
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


/*--------------撤回按钮事件的Start------------------------ */		
// 每1.5S判断控制面板的事件 统计撤回的数据 添加
//window.setInterval(function() {
//	if(log[log.length - 1] != $("#t").html()) {
//		log[log.length] = $("#t").html();
//	}
//}, 1500)
//// 撤回按钮的 事件ID
//$("#undo").click(function(event){
////	event.stopPropagation();
//	console.log(1)
//	log.pop();
//	$("#t").html(log[log.length - 1]).blur();
//});
/*--------------撤回按钮事件的End------------------------ */			




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
var 	page=[],Css,content,Class,Width,Height
/*---------  生成ul下面的li的json方法Start  ------------------*/ 
var test=0
function GetJsonData() {
	test++;
	var t = [];
	
	for(var k=0;k<$("#editor-body>ul").length;k++){
		var editorBody=$("#editor-body>ul").eq(k).find("li");
		var n = "[";
			for(i = 0; i < $("#editor-body>ul").eq(k).find("li").length; i++) {
				n += "{'page':'" + editorBody.eq(i).attr("num") + "',"
				n += "'Css':'" + editorBody.eq(i).attr("style") + "',"
				n += "'content':'" + editorBody.eq(i).find(".content").html() + "',"
				n += "'Class':'" + editorBody.eq(i).find(".click-box").attr('name') + "',"
				n += "'Width':'" + Number(editorBody.eq(i).width()/$('.editor-ul').width()).toFixed(2)*100+"%" + "',"
				n += "'Height':'" +  Number(editorBody.eq(i).height()/$('.editor-ul').height()).toFixed(2)*100+"%" + "'},"
				console.log(editorBody.eq(i).height())
			}
		  n = n.substr(0, n.length - 1);
		  n +="]" 
			n = eval('(' + n + ')');
		t.push(n);
	}
	//console.log(t)
	var json = {
	  id:"test"+test,
		pagaNum:$("#editor-body>ul").length,
		content:t
	};
	//console.log(json)
	return json;
}



/*---------  生成ul下面的li的json方法End  ------------------*/ 
/* --------------------翻页选项卡事件 暂时不要 ------------------ */
//$("#pageBtn li").mouseup(function() {
//	if($(this).next()){
//		 $(this).next().after($(this));
//	}
// 
//}); 
 
 // oninput 事件，输入框在用户 停止输入   一秒后再执行，不重复执行，只在每次改变值之后的1秒执行一次
// (function textCoun(textarea,num){
//  var sendTextarea     =     document.getElementById(textarea),
//      text            =    sendTextarea.value,
//      counter            =    text.length,
//      sendCount         =     document.getElementById("send-count");
//  
//  sendCount.innerHTML = num-counter;    //显示初始状态还属于多少字
//  
//  //输入以后重新计算
//  sendTextarea.oninput = function(){
//      text    =    sendTextarea.value,
//      counter    =    text.length;
//      sendCount.innerHTML = num-counter;
//  }
//
//})("send-textarea",110)
 
 
 
 
/*---------  浏览器离开事件  ------------------*/  
//	window.onbeforeunload=function(){
//		// 这里保存浏览器离开前的数据操作 //
//		console.log(1-1)
//		return "快住手！！别点下去！！";
//	};
 
var pageNum=1; 

/*-------------添加模板------------------------------------*/
$("#add").click(function(event){
	event.stopPropagation();
	pageNum++;
	$("#editor-body").find("ul").attr("id"," ")
	$("#editor-body").find("ul").removeClass("layui-show")
	$("#editor-body").find("ul").hide()
	$("#pageBtn").find("li").removeClass("layui-this");
	$("#pageBtn").append('<li class="layui-this">第'+ pageNum +'页</li>')
	$("#editor-body").append('<ul id="editor-ul" class="editor-ul layui-tab-item layui-show" num="'+pageNum+'"></ul>')
})














































































var center=[]
/*----------------点击保存的按钮时间 Start  ----------------------------------------*/
$("#keep").click(function(event){
	event.stopPropagation();
//	conatent.push(conatents())	
	conatent.push(GetJsonData())
	// 转为json

 	center=JSON.stringify(conatent)
	// 点击保存的时候的操作
	console.log(JSON.parse(center))
	// 储存json样式
	sessionStorage.setItem("content",center)
//	
	location.href="../display/index.html"
})
/*----------------点击保存的按钮时间 END  ----------------------------------------*/
