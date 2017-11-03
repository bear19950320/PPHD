var content=sessionStorage.getItem('content');
   
var data= JSON.parse(content)
 console.log(data);
 for(var i=0;i<data.length;i++){
 	if(data[i].Class=="text"){
 		$("ul").append('<li style="z-index:99;'+data[i].Css+'"><div>'+data[i].content+'</div></li>');
 	}else{
 		
 		$("ul").append('<li style="z-index:1;'+data[i].Css+'"><div>'+data[i].content+'</div></li>');
 		
 	}
 }
