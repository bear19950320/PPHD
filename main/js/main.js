	// 注册  register
	// 首页  page
	// 素材管理 material
	// 节目管理 program
	// 终端发布 terminal
	// 系统管理 system
	// 日志统计 statistics
	// 业务模块 business
	
	/* 加载layer弹框JS与CSS  */
	document.write('<link rel="stylesheet" type="text/css" href="../../layui/css/modules/layer/default/layer.css"/>');
	document.write('<script src="../../main/layer/layer.js" type="text/javascript" charset="utf-8"></script>');
	/* 请求地址 */
	let link='http://192.168.7.104:8081/pphd/'
	/* --AJAX-- */
let ajax=function(url,type,data,json,callback){
	    $.ajax({
	        url:link+url,
	        type:type,
	        data:data,
	        dataType:json,
	        beforeSend: function(XMLHttpRequest) {
				layer.load()
			},
	        success: function(response){
	            credit = response
	            callback(credit);
	        },
	        complete: function(XMLHttpRequest, textStatus) {
	        	layer.closeAll('loading');
	        },
	        error: function(){
	           layer.msg("服务器出差");
	        }
	    });
	}
























	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/* 页面跳转点击事件 */
	function btnClick(obj){
        var id=$(obj).attr("name");
        location.href='../'+id+'/'+id+'.html';
		$("#"+id).addClass("activer").siblings().removeClass('activer');
	}
	/* 首页点击 */
	function page(obj){
		$('#section').load('build/page/page.html');
	};
	