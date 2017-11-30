// 全局变量
var content=[],imgSrc="",conatent=[],log=[],flag=0;;

layui.use('element', function(){
  var element = layui.element;
  /* 模板的选项卡 */
  element.on('tab(editor)', function(data){
    console.log(data);
    $("#editor-body>.layui-show").attr("id","editor-ul");
    $("#editor-body>.layui-show").siblings(".layui-tab-item").attr("id"," ")
    $(".layui-this").attr("id","layui-btn")
    $(".layui-this").siblings("li").attr("id"," ")
  });
});
$("#animation-name").change(function(){
		$("#editor-ul").css({
			"animation": $(this).val()+" 1.5s ease 0s 1 normal both"
		})
})
/* -------------------动画时间 Start------------------- */
var tag = false,ox = 0,left = 21,bgleft = 0;
    $('.progress_btn').mousedown(function(e) {
     ox = e.pageX - left;
     tag = true;
    });
    $(document).mouseup(function() {
     tag = false;
    });
    $('.progress').mousemove(function(e) {//鼠标移动
     if (tag) {
      left = e.pageX - ox;
      if (left <= 21) {
       left = 21;
      }else if (left > 200) {
       left = 200;
      }
      $('.progress_btn').css('left', left);
      $('.progress_bar').width(left);
      $('.text').html(parseInt((left/200)*10));
      $("#editor-ul").css({
				"animation-duration":parseInt((left/200)*10)
			})
     }
    });
    $('.progress_bg').click(function(e) {//鼠标点击
     if (!tag) {
      bgleft = $('.progress_bg').offset().left;
      left = e.pageX - bgleft;
      if (left <= 21) {
       left = 21;
      }else if (left > 200) {
       left = 200;
      }
      $("#editor-ul").css({
				"animation-duration":parseInt((left/200)*10)
			})
      $('.progress_btn').css('left', left);
      $('.progress_bar').animate({width:left},200);
      $('.text').html(parseInt((left/200)*10));
     }
    });
   
/* -------------------动画时间End------------------- */   
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
function backMusic(){
	 var file = document.getElementById('musicInput').files[0];  
   var url = URL.createObjectURL(file);   
    $("body").append('<audio src="'+url+'" autoplay="" loop="loop"></audio>')
}

/*---------------------本地视频-------------------------- */
function onInputFileChange() {  
   var file = document.getElementById('videoInput').files[0];  
   var url = URL.createObjectURL(file);  
   document.getElementById("audio_id").src = url;  
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
//$("#editor-body").on("click",".resize-panel",function(event){
//	alert(2)
//	event.stopPropagation();
//	console.log(1)
//	console.log($(this).html())
//	$(this).find(".content").addClass('text-color');
//	$(this).parents("li").siblings("li").find('.content').removeClass('text-color')
//	$(this).parents("li").siblings("li").find('.resize-panel').hide();
//	event.stopPropagation();
//	if($(this).attr("touch")=="flase"){
//		$(this).attr("touch",true);
//		 new ZResize({
//		   stage: "#editor-ul", //舞台 
//		   item: $('#editor-ul>li .click-box'), //可缩放的类名 
//		 }); 					
//	}
//});
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

/*---------  生成ul下面的li的json方法Start  ------------------*/ 

var test=0,page=[],Css,content,Class,Width,Height;
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
			}
		  n = n.substr(0, n.length - 1);
		  n +="]" 
			n = eval('(' + n + ')');
		t.push(n);
	}
	var json = {
	  id:"test"+test,
		pagaNum:$("#editor-body>ul").length,
		content:t
	};
	return json;
}

/*---------  生成ul下面的li的json方法End  ------------------*/ 
 
/* ------------------添加取色板的Start-----------------------------*/
// 添加取色板的load事件
$("#color-plate").load("../swatches/swatches.html",function(){
 	$(document).ready(function() {
// 		$('#picker').farbtastic('.text-color');
    $('#picker').farbtastic('.text-color');
  });
});

	$(".style-close").click(function(){
	 	flag++;
		if(flag%2!=0){
		 	$('.group').css({
		 		animation: "fadeOut 1s ease 0s 1 normal both"
		 	});
		 	$(".style-open").show()
		}else{
			$(".style-open").hide()
				$('.group').css({
			 		animation: "lightSpeedInDown 1s ease 0s 1 normal both"
			 	});
		}
	})
/* ------------------添加取色板的End-----------------------------*/



/* 整个身体点击一下保存一遍 */
function closeOpen(){
	
	// 转为json
	center=JSON.stringify(GetJsonData())
	// 点击保存的时候的操作
	var centern=JSON.parse(center)
	// 储存json样式
	localStorage.setItem("content",center)
}

var pageNum=1; 
/* -------------------提取localStorage的值再次填充Start---------------------------- */
$(document).ready(function(){
	var content=localStorage.getItem("content");
	if(content||content ==" " ){
		var data=JSON.parse(content);
		$("#editor-body").empty();
		$("#pageBtn").empty();
		pageNum=data.content.length;
		 for(var i=0;i<data.content.length;i++){
		 	if(data.content!="undefined"){
		 	$("#pageBtn").append('<li id="layui-tab'+i+'">第'+(i+1)+'页</li>');
		 	$("#layui-tab0").addClass('layui-this')
		 		$("#editor-body").append('<ul class="editor-ul layui-tab-item ul'+i+'" num="'+i+'" class="swiper-slide"></ul>')
		   	for(var j=0;j<data.content[i].length;j++){
		   		$(".ul0").attr("id","editor-ul");
		   		$(".ul0").addClass('layui-show')
		   		if(data.content[i][j].Class=="text"){
			 		/* 文字层级 */
			 			$(".ul"+i).append('<li style="z-index:99;'+data.content[i][j].Css+'"><div class="click-box writing" name="text"><div class="content" contenteditable>'+data.content[i][j].content+'</div></div></li>');
			 	
			 		}else{
			 		/* 图片层级 */
			 			$(".ul"+i).append('<li style="'+data.content[i][j].Css+'"><div class="click-box" ><div class="content" style="width:'+data.content[i][j].Width+'px;height:'+data.content[i][j].Height+'px;">'+data.content[i][j].content+'</div></div></li>');		
		   		}
		   	}
		 	}
		 	//判断文字定层级
		 }
	}else{
		$("#editor-body").empty();
		$("#editor-body").append('<ul class="editor-ul layui-tab-item layui-show" num="1" id="editor-ul"></ul>')
	}
	new ZResize({
		   stage: ".editor-ul", //舞台 
		   item: $('.editor-ul>li .click-box'), //可缩放的类名 
		 });
		 $(".resize-panel").css({width:"100%",height:"100%"});
})
/* -------------------提取localStorage的值再次填充End---------------------------- */

/*-------------添加模板Start------------------------------------*/
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
/* ------------------添加模板的End-----------------------------*/


var center=[]
/*----------------点击保存的按钮时间 Start  ----------------------------------------*/
$("#keep").click(function(event){
	event.stopPropagation();
	localStorage.setItem("content",' ')
	location.href="../display/index.html"
})
/*----------------点击保存的按钮时间 END  ----------------------------------------*/
