var content=sessionStorage.getItem('content');
   
var data= JSON.parse(content)
 console.log(data);
 for(var i=0;i<data.length;i++){
 	$("ul").append('<li><div style="'+data[i].Css+'">'+data[i].content+'</div></li>')
 }
