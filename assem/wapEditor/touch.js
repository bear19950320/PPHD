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

/* -----------音乐的input change事件 Start---------------- */
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
/* -----------音乐的input change事件 End---------------- */

/* --- 图片点击让其层级变高 --- 暂未实现 --- */
$("#editor-ul>li").on("click","img",function(event){
	event.stopPropagation(); 
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
			$(this).find("i").removeClass('icon-suoding')
			$(this).find("i").addClass('icon-qmiconsuodingkai')
		}else{
			/* 锁定状态  */
			$(this).find("i").removeClass('icon-qmiconsuodingkai')
			$(this).find("i").addClass('icon-suoding')
		}
	
})
/* -------------------锁定事件的End--------------------- */



/*------------------- 双击呼唤div的编辑  ----------------------*/
$("#editor-ul>li>.click-box>.content").dblclick(function(){
	$(this).prop('contenteditable',true);
	$(this).parents("li").siblings("li").find('.content').prop('contenteditable',false);	
})
var 	page=[],Css,content,Class,Width,Height
/*---------  生成ul下面的li的json方法Start  ------------------*/ 
var test=0,widthBU=0;
function GetJsonData() {
	console.log($('.editor-ul').width())
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
				n += "'Width':'" + Number(editorBody.eq(i).width()/$('.editor-ul').width()).toFixed(2)*100+"%"+ "',"
				n += "'Height':'" + Number(editorBody.eq(i).height()/$('.editor-ul').height()).toFixed(2)*100+"%" + "'},"
				//console.log(editorBody.eq(i).height())
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
var pageNum=1; 

/*-------------添加模板------------------------------------*/
$("#add").click(function(event){
	event.stopPropagation();
	pageNum++;
	$("#editor-body").find("ul").attr("id"," ")
	//$("#editor-body").find("ul").removeClass("swiper-slide-active").siblings(this).addClass("swiper-slide-prev")
	//$("#pageBtn").append('<li class="layui-this">第'+ pageNum +'页</li>')
	$("#editor-body").append('<ul id="editor-ul" class="editor-ul" num="'+pageNum+'"><span class="layui-badge">第'+pageNum+'页</span></ul>')
  $(".editor-ul").css({
  	width:$(window).width()*0.8+"px",
  	'margin-top':left+"px",
  	'margin-left':left+"px",
  	'margin-right':left+"px"
  });
  var Ullength=$("#editor-body>ul").length;
  console.log(Ullength+"---宽"+$(window).width())
  $("#editor-body").width($(window).width()*Ullength)
})


$("#t").on("touchstart", function(e) {
 
    startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
});
	
	var iNow=0;
$("#t").on("touchmove", function(e) {

	  e.stopPropagation();
    moveEndX = e.originalEvent.changedTouches[0].pageX,
    moveEndY = e.originalEvent.changedTouches[0].pageY,
    X = moveEndX - startX,
    Y = moveEndY - startY;
  var left=0;
    if ( X > 0 ) {
//     left+=X;
//     $("#editor-body").animate({
//		  	 "left":-left
//		  })
    }
    else if ( X <= half ) {
//  	iNow++;
//  			left+=X
//  			console.log(left)
//  	
//  	$("#editor-body").animate({
//		  	 "left":left
//		  })
    	
    }
    else if ( Y > 0) {
        alert("top 2 bottom");
    }
    else if ( Y < 0 ) {
        alert("bottom 2 top");
    }
});

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

$("#backAdd").click(function(event){
	event.stopPropagation();
	$("#backInput").trigger("click");	
})

/* 特效事件  */
$("#special").click(function(){
	$("#down-ul").css({
		"animation": "fadeOutDown 1.5s ease 0s 1 normal both",
		display:"none"
	})
//	$("#down-ul").hide()
	$("#special-body").show();
	$("#special-body").css({
		"animation": "fadeInUp 0.5s ease 0s 1 normal both"
	});

})
/* 操作栏的返回按钮 */
$(".nav-back").click(function(){
	$("#down-ul").siblings("ul").hide()
	$("#down-ul").css({
		"animation": "fadeInUp 1.5s ease 0s 1 normal both",
		display:"blick"
	})
	
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
var centern=JSON.parse(center)

// 储存json样式
sessionStorage.setItem("content",center)

//	跳转页面
	location.href="../display/index.html"
})
/*----------------点击保存的按钮时间 END  ----------------------------------------*/
