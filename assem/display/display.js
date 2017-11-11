var content=sessionStorage.getItem('content');

$(".swiper-wrapper,.swiper-wrapper>.swiper-slide,.swiper-container").css({
	height:$(window).height()
})
var data= JSON.parse(content)
    data=data[0];
console.log(data)
$(".swiper-wrapper").empty();
 for(var i=0;i<data.content.length;i++){
 	$(".swiper-wrapper").append('<ul num="'+i+'" class="swiper-slide" id="ul'+i+'" ></ul>')
   	for(var j=0;j<data.content[i].length;j++){
   		
   		if(data.content[i][j].Class=="text"){
	 		/* 文字层级 */
	 		$("#ul"+i).append('<li style="z-index:99;'+data.content[i][j].Css+'"><div>'+data.content[i][j].content+'</div></li>');
	 	
	 	}else{
	 		/* 图片层级 */
	 		console.log(data.content[i][j].Height)
	 		
	 		$("#ul"+i).append('<li style="'+data.content[i][j].Css+'"><div style="width:'+data.content[i][j].Width+'px;height:'+data.content[i][j].Height+'px;">'+data.content[i][j].content+'</div></li>');		
   		}
   	}
 	
 	//判断文字定层级
 	
 	
 }
