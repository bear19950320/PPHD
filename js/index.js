
layui.use('form', function(){
  var form = layui.form;
  
  //监听提交
  form.on('submit(formDemo)', function(data){
    var user=JSON.stringify(data.field)
	    user=JSON.parse(user)
	var hash = md5(user.password);
	  	user.password=hash
	  	ajax('phoneNumberLoginEnter','POST',user,'json',function(data){
			if(data.code != 10000){	
				layer.msg(data.msg);
			}else{
				var data=data.data
				console.log(data.producelist[0].slt)
			}
		})
//			  	if( $("#user").val() != "admin" ){
//			  		layer.msg("账号不存在");
//			  	}else if( $("#password").val() != "123"){
//			  		layer.msg("密码错误");
//			  	}else{
//			  		setTimeout(function(){ location.href="build/page/page.html" },3000)
//			  	}
			  	
			  //  layer.msg(JSON.stringify(data.field));
			    return false;
			  });
			});