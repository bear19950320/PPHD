	function btnClick(obj){
        var id=$(obj).attr("name");
        location.href='../'+id+'/'+id+'.html';
		$("#"+id).addClass("activer").siblings().removeClass('activer');
	}
	/* 首页点击 */
	function page(obj){
		$('#section').load('build/page/page.html');
	};
	
