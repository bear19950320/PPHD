
layui.use('form', function(){
  var form = layui.form;
  //监听提交
	form.on('submit(formDemo)', function(data){
	  //把form的data对象转为字符串 
	  var user=JSON.stringify(data.field)
		//把字符串转为json对象    
		  user=JSON.parse(user)
		//把密码用md5加密
		var hash = md5(user.password);
		//加密后的密码重新赋值到json 
		  user.password=hash
	  //提交
	  ajax('phoneNumberLoginEnter','POST',user,'json',function(data){
			if(data.code != 10000){	
				layer.msg(data.msg);
			}else{
				var data=data.data
			}
		})
    return false;
  });
});