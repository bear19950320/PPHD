$(document).ready(function(){
	$("section").css({
		height:$(window).height()-80+"px"
	});
});

$("#phoneNumber").change(function(){
	if(!(/^1[34578]\d{9}$/.test($("#phoneNumber").val()))){
		layer.msg('手机号码不正确');
		$("#phoneNumber").css({borderColor:"red"});
	}else{
		$("#phoneNumber").css({borderColor:"#e6e6e6"});
	}
});
$("#againPassword").change(function(){
	if($("#againPassword").val()!=$("#password").val()){
		layer.msg('两次密码不一样');
		$("#againPassword,#password").css({borderColor:"red"});
	}else{
		$("#againPassword,#password").css({borderColor:"#e6e6e6"});
	}
});

$("#obtainCode").click(function(e){
	e.stopPropagation();
	if($("#phoneNumber").val()== ""){
		layer.msg('手机不能为空');
	}else{
		ajax('verifyEnter','POST',{phoneNumber:$("#phoneNumber").val(),type:"0"},'json',function(data){
			if(data.code == 10000){
			 	var Tnum = 60;
				var myTimer = setInterval(daojishi,1000);
				function daojishi(){
					Tnum--;
					//获取并替换提交按钮的value值
					$("#obtainCode").text(Tnum+"s后获取");
					if(Tnum < 1){
						// 倒计时重新赋值
						Tnum = 0;
						
						$("#obtainCode").text("获取验证码");
						// 清除定时器
						clearInterval(myTimer);
					}else if( Tnum >= 1 && Tnum <= 60 ){
						// 在倒计时的准备事件
					}
				}
			}
		});
	}
});

ajax('getAdOrderlistadorderapi','POST','','JSON',function(data){
	console.log(data)
})

layui.use('form', function(){
  var form = layui.form;
  //监听提交
  form.on('submit(formDemo)', function(data){
  	var data=JSON.stringify(data.field);
		data=JSON.parse(data);
		console.log(data)
//	var hash = md5(data.password);
//	  	data.password=hash
	   	ajax('registerEnter','POST',data,'json',function(){
			if(data.code == 10000){
				layer.msg("注册成功");
			}else{
				layer.msg("暂时为空--"+data.msg)
			}
	   	})
	   
    return false;
  });
});