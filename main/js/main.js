	/* 各文件的意思   */
	// 注册  register
	// map地图
	// 首页  page
	// 素材管理 material
	// 节目管理 program
	// 终端发布 terminal
	// 系统管理 system
	// 日志统计 statistics
	// 业务模块 business
	// lng代表经度 
	// lat代表维度
	/*  加载layer弹框JS与CSS  */
	document.write('<link rel="stylesheet" type="text/css" href="../../main/layer/mobile/need/layer.css" />');
	document.write('<script src="../../main/layer/layer.js" type="text/javascript" charset="utf-8"></script>');
	/* 请求地址 */
	let link='http://192.168.7.102:8081/pphd/';
	/* --AJAX--(地址,请求类型,data传参,json的type类型,方法) */
let ajax=function(url,type,data,json,callback){
	    $.ajax({
	        url : link+url,
	        type : type,
	        data : data,
	        timeout : 10000,
	        dataType : json,
	        beforeSend : function(XMLHttpRequest) {
	        	// 请求接口--Start--添加--loading--的动态图标 
				layer.load();
			},
	        success : function(response){
	            /* data赋值  */
	            credit = response
	            // 方法的回调
	            callback(credit);
	        },
	        complete : function(XMLHttpRequest,textStatus) {
	        	layer.closeAll('loading');
	        },
	        error : function(){
	           layer.msg("服务器出差");
	        }
	    });
	}

/*---------------------------页面点击相互跳转-------------------------------*/
	/* 页面跳转点击事件 */
	function btnClick(obj){
        
        var id=$(obj).attr("name");
        
        location.href='../'+id+'/'+id+'.html';
		
		$("#"+id).addClass("activer").siblings().removeClass('activer');
	}
	/* 首页点击  */
//	function page(obj){
//		$('#section').load('build/page/page.html');
//	};
	