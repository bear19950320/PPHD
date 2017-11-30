// 全局变量
var content=[],imgSrc="",conatent=[],log = [];;

layui.use('element', function(){
  var element = layui.element;
});

var textDom='<li style="width:100px;left:25%;"><div class="click-box writing" name="text" touch="flase"><div class="content" contentEditable>双击可编辑</div></div></li>'
/*---------------------- 点击选择文字添加Start ---------------------- */
$("#textAdd").click(function(){
		$(this).parents("li").siblings("li").find('.resize-panel').hide();
	  $("#editor-ul").append(textDom);
	  $("#editor-ul").find(".resize-panel").remove();
		$(this).parents("li").siblings("li").find('.content').attr("id"," ");
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
$("#prompt").css({
	top:$("#head-nav").height()
});

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
/* ---- 图片显示到div里面的方法End --------  */

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
function onInputFileChange() {  
   var file = document.getElementById('videoInput').files[0];  
   var url = URL.createObjectURL(file);  
   console.log(url);  
   document.getElementById("audio_id").src = url;  
}
/* -----------音乐的input change事件 Start---------------- */
function backMusic(musicfile){
	 var file = document.getElementById('musicInput').files[0];  
   var url = URL.createObjectURL(file);  
   console.log(url);  
 // $("body").append('<audio src="'+url+'" autoplay="" loop="loop"></audio>')

}
/* -----------音乐的input change事件 End---------------- */

/* --- 图片点击让其层级变高 --- 暂未实现 --- */
$("#editor-ul>li").on("click","img",function(event){
	event.stopPropagation(); 
})

/* ------------------------ 点击添加音乐按钮Start --------------- */
$("#musicAdd").click(function(event){
	event.stopPropagation();
	$("#musicInput").trigger("click");
})
/* ------------------------ 点击添加音乐按钮End ------------------ */

/*-----------------------视频点击事件Start----------------------- */
$("#videoAdd").click(function(event){
	event.stopPropagation();
	$("#videoInput").trigger("click");
})
/*-----------------------视频点击事件End------------------------- */
/* ------------------ 点击添加图片按钮Start ---------------------- */
$("#imgAdd").click(function(event){
	event.stopPropagation();
	$("#imgInput").trigger("click");
})
/* ------------------ 点击添加图片按钮end ------------------------- */

/* ------------------ 点击添加背景按钮Start ----------------------- */
$("#backAdd").click(function(event){
	event.stopPropagation();
	$("#backInput").trigger("click");	
})
/* ------------------ 点击添加背景按钮End ------------------------- */


/*------------------- 点击输入框呼唤拉动Start  ----------------------*/
$("#editor-ul>li").on("click",".click-box",function(event){
	$(this).parents("li").siblings("li").find('.resize-panel').hide();
	$(this).find('.content').attr("id","t");
	$(this).parents("li").siblings("li").find('.content').attr("id"," ");
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
window.setInterval(function() {
	if(log[log.length - 1] != $("#t").html()) {
		log[log.length] = $("#t").html();
	}
}, 1500)
// 撤回按钮的 事件ID
$("#undo").click(function(event){
	event.stopPropagation();
	log.pop();
	$("#t").html(log[log.length - 1]).blur();
});

/*--------------撤回按钮时间的End------------------------ */			

/* -------------------锁定事件的Start--------------------- */
var flag=0;
$("#lock").click(function(event){
	event.stopPropagation();
		flag++;
		if(flag%2!=0){
			/* 开锁状态  */
			$(this).find("i").removeClass('icon-suoding').addClass('icon-qmiconsuodingkai');
			$(".swiper-slide-active>.editor-ul").attr("id","editor-ul");
			$(".swiper-slide-active").siblings('.swiper-slide').find('.editor-ul').attr("id","")
		}else{
			/* 锁定状态  */
			$(this).find("i").removeClass('icon-qmiconsuodingkai').addClass('icon-suoding');
		}
	
})
/* -------------------锁定事件的End--------------------- */

/* -----------------帮助事件的点击Start------------------ */
$("#helpBtn").click(function(event){
	event.stopPropagation();
	flag++;
	if(flag%2!=0){
		/* 开锁状态  */
		$("#prompt").hide();
	}else{
		/* 锁定状态  */
		$("#prompt").show();
	}
})
/* -------------------帮助事件的End--------------------- */

/*------------------- 双击呼唤div的编辑  ----------------------*/
$("#editor-ul>li>.click-box>.content").dblclick(function(){
	$(this).prop('contenteditable',true);
	$(this).parents("li").siblings("li").find('.content').prop('contenteditable',false);	
})

/*---------  生成UL下面的li的json方法Start  ------------------*/ 
var page=[],Css,content,Class,Width,Height;
var test=0,widthBU=0;
function GetJsonData() {
	test++;
	var t = [];
	for(var k=0;k<$("#editor-body>.swiper-slide").length;k++){
		var editorBody=$("#editor-body>.swiper-slide>ul").eq(k).find("li");
		if($("#editor-body>.swiper-slide li").length >= 1){
			var n = "[";
			for(i = 0; i < $("#editor-body>.swiper-slide>ul").eq(k).find("li").length; i++) {
				n += "{'page':'" + editorBody.eq(i).attr("num") + "',"
				n += "'Css':'" + editorBody.eq(i).attr("style") + "',"
				n += "'animation':'"+$("#editor-body>.swiper-slide>ul").eq(k).css('animation')+ "',"
				n += "'style':'"+$("#editor-body>.swiper-slide>ul").eq(k).attr('style')+ "',"
				n += "'content':'" + editorBody.eq(i).find(".content").html() + "',"
				n += "'Class':'" + editorBody.eq(i).find(".click-box").attr('name') + "',"
				n += "'Width':'" + Number(editorBody.eq(i).width()/$('.editor-ul').width()).toFixed(2)*100+"%"+ "',"
				n += "'Height':'" + Number(editorBody.eq(i).height()/$('.editor-ul').height()).toFixed(2)*100+"%" + "'},"
			}
		  n = n.substr(0, n.length - 1);
		  n +="]" 
			n = eval('(' + n + ')');
			t.push(n);
		}
		
	}
	var json = {
	  id:"test"+test,
		pagaNum:$("#editor-body>ul").length,
		content:t
	};
		console.log(json)
	return json;
}
/*---------  生成UL下面的li的json方法End  ------------------*/ 

 
/*---------  浏览器离开事件  ------------------*/  
//	window.onbeforeunload=function(){
//		// 这里保存浏览器离开前的数据操作 //
//		console.log(1-1)
//		return "快住手！！别点下去！！";
//	};

var left=$(window).width()*0.1;
var half=$(window).width()*0.5;
 $(".editor-ul").css({
  	width:$(window).width()*0.8+"px",
  	'margin-top':left+"px",
  	'margin-left':left+"px",
  	'margin-right':left+"px"
  })




/*----------------------背景图片Start----------------------------*/
function back(imgFile) {
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
								  $("#editor-ul").attr("back",base64)
								  $("#editor-ul").css({
								  	background:"url("+base64+")",
								  	"background-size":"100% 100%"
								  })
									
									
								}                
            }
        }
        $("#img li").eq(0).before(str);
    }
}
/*----------------------背景图片End----------------------------*/


/* ---------------特效点击事件Start--------------- */
$("#special-body>li").each(function(){
	$(this).click(function(event){
		event.stopPropagation();
		$("#editor-ul").css({
			"animation": $(this).attr("class")+" 1.5s ease 0s 1 normal both"
		})
	})
});
/* ---------------特效点击事件End--------------- */

/* 特效框显示事件  */
$("#special").click(function(){
	$("#down-ul").css({display:"none"})
	$("#special-body").show();
	
	$("#special-body").css({
		"animation": "fadeInUp 0.5s ease 0s 1 normal both"
	});
})
/* 操作栏的返回按钮 */
$(".nav-back").click(function(){
	
	$("#down-ul").siblings("ul").hide();
	$("#down-ul").show();
	$("#down-ul").css({
		"animation": "fadeInUp 1.5s ease 0s 1 normal both"
	});
	
});

var pageNum=1; 
var Ullength=$("#editor-body>ul").length;
/* 刷新的时候 */
$(document).ready(function(){
	var content=localStorage.getItem("content");
	if(content||content ==" " ){
		var data=JSON.parse(content);
		pageNum=data.content.length;
		$("#editor-body").empty();
		for(var i=0; i<data.content.length;i++){
			$("#editor-body").append('<div class="swiper-slide">\
						<ul id="" class="editor-ul editor-ul'+i+'" num='+i+' style="width: 300px; margin-top: 37.5px; margin-left: 37.5px; margin-right: 37.5px;">\
							<span class="layui-badge">第'+(i+1)+'页</span>\
						</ul>\
					</div>');
				/* 二次循环 */
				for(var j=0;j<data.content[i].length;j++){
					$(".editor-ul"+i).attr("style",data.content[i][j].style);
		   		if(data.content[i][j].Class=="text"){
			 		/* 文字层级 */
			 			$(".editor-ul"+i).append('<li style="z-index:99;'+data.content[i][j].Css+'"><div class="click-box writing" name="text"><div class="content" contenteditable>'+data.content[i][j].content+'</div></div></li>');
			 		}else{
			 		/* 图片层级 */
			 			$(".editor-ul"+i).append('<li style="'+data.content[i][j].Css+'"><div class="click-box img-box" ><div class="content" style="width:'+data.content[i][j].Width+'px;height:'+data.content[i][j].Height+'px;">'+data.content[i][j].content+'</div></div></li>');		
		   		}
		   	}
		}
	}
	new ZResize({
	   stage:".editor-ul", //舞台 
	   item: $('.editor-ul>li .click-box'), //可缩放的类名 
	});
		var mySwiper = new Swiper ('.swiper-container-editor', {
			//followFinger : false,
			  //定位到那一夜的轮播
			//initialSlide :$("#editor-body>div").length,
			effect : 'fade',
			observer:false,
			onTouchEnd:function(swiper){
				$('.resize-panel').hide();
				// console.log(swiper)
				$('.swiper-slide-active').siblings('.swiper-slide').removeClass('swiper-slide-active');
				$('#editor-body').on("click",".editor-ul",function(event){
					event.stopPropagation();
					$(this).attr("id",'editor-ul');
					$(this).parents('.swiper-slide').siblings('.swiper-slide').find("ul").attr("id"," ")
				})
			}
		})  
})
//$("#editor-body").on("focus",".img-box",function(){
//	document.activeElement.blur();
//})

/*---------------------添加模板事件Start----------------------------*/
$("#add").click(function(event){
	event.stopPropagation();
	pageNum++;
	$("#editor-body").find("ul").attr("id"," ")
	$("#editor-body").append('<div class="swiper-slide"><ul id="editor-ul" class="editor-ul" num="'+pageNum+'"><span class="layui-badge">第'+pageNum+'页</span></ul></div>')
  $(".editor-ul").css({
  	width:$(window).width()*0.8+"px",
  	'margin-top':left+"px",
  	'margin-left':left+"px",
  	'margin-right':left+"px"
  });
 $("#editor-body>div").removeClass('swiper-slide-active');
	var mySwiper = new Swiper ('.swiper-container-editor', {
			//followFinger : false,
			initialSlide :$("#editor-body>div").length,
			effect : 'fade',
			observer:false,
			onTouchEnd:function(swiper){
				$('.resize-panel').hide();
				// console.log(swiper)
				$('.swiper-slide-active').siblings('.swiper-slide').removeClass('swiper-slide-active');
				$('#editor-body').on("click",".editor-ul",function(event){
					event.stopPropagation();
					$(this).attr("id",'editor-ul');
					$(this).parents('.swiper-slide').siblings('.swiper-slide').find("ul").attr("id"," ")
				})
			}
		}) 

})
/*---------------------添加模板事件End----------------------------*/

/*  ----离开事件的保存内容Start----   */
function closeOpen(){
	// 转为json
	center=JSON.stringify(GetJsonData())
	// 点击保存的时候的操作
	var centern=JSON.parse(center)
	
	// 储存json样式
	localStorage.setItem("content",center)
}
/*  ----离开事件的保存内容End----   */




var center=[]
/*----------------点击保存的按钮时间 Start  ----------------------------------------*/
$("#keep").click(function(event){
event.stopPropagation();
localStorage.setItem("content",' ')
//	跳转页面
	location.href="../display/index.html"
})
/*----------------点击保存的按钮时间 END  ----------------------------------------*/
