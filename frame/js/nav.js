$(function(){
	$("li img").hover(function(){
		$(this).attr("src",($(this).attr("src").slice(0,12) + "_hover.gif")); 
		//0から数える○番目から,1から数える○個目までをsliceしてる
	}, function(){  //ここはhoveroutした時。 ※hoverメソッドは間にカンマがいる！
		$(this).attr("src",($(this).attr("src").slice(0,12) + ".gif")); 
	});
});