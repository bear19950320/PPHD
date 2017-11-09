var content=sessionStorage.getItem('content');
   
var data= JSON.parse(content)
 console.log(data);
 for(var i=0;i<data.length;i++){
 	//判断文字定层级
 	if(data[i].Class=="text"){
 		/* 文字层级 */
 		
 		$("ul").append('<li style="z-index:99;'+data[i].Css+'"><div>'+data[i].content+'</div></li>');
 	
 	}else{
 		/* 图片层级 */
 		
 		$("ul").append('<li style="'+data[i].Css+'"><div style="width:'+data[i].Width+'px;height:'+data[i].Height+'px;">'+data[i].content+'</div></li>');
 		
 	}
 	
 }
