
$("#obtainCode").click(function(e){
	e.stopPropagation();
	if($("#phoneNumber").val()==" " || $("#password").val()== ""){
		layer.msg('账号密码不能为空')
	}else if(!(/^1[34578]\d{9}$/.test($("#phoneNumber").val()))){
		layer.msg('手机号码不正确')
	}else if($("#againPassword").val()!=$("#password").val()){
		layer.msg('两次密码不一样')
	}else{
		ajax('verifyEnter','POST',{phoneNumber:$("#phoneNumber").val(),type:"0"},'json',function(data){
			if(data.code==10000){
				 	var Tnum=60;
					var myTimer=setInterval(daojishi,1000);
					function daojishi(){
						Tnum--;
						//获取并替换提交按钮的value值
						$("#obtainCode").text(Tnum+"s后获取")
						if(Tnum<1){
							Tnum=0;
							$("#obtainCode").attr("z-index","10")
							$("#obtainCode").text("获取验证码")
							clearInterval(myTimer);
						}else if( Tnum>=1&&Tnum<=60 ){
							$("#obtainCode").css("z-index","-1")
						}
					}
			}
		});
	}
})







layui.use('form', function(){
  var form = layui.form;
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    return false;
  });
});