$(function() {
	
	var SIZE = 4;
	var countNum;
	var cardArray;
	var time;
	var timer;
	
	init();
	
	function init(){
		countNum = 1;
		cardArray = [];
		time = 0;
		
		for(var i = 0; i < SIZE * SIZE; i++){
			cardArray.push(i);
		}
		
		for(var i = 0; i < cardArray.length; i++){
			var tmpNum = cardArray[i];
			var r = Math.floor(Math.random()*cardArray.length);
					
			cardArray[i] = cardArray[r];
			cardArray[r] = tmpNum;
		}
		
		$("#numbers").html("");
		
		for(var i = 0; i < SIZE * SIZE; i++){
		var cardNum = cardArray[i]+1;
			$("#numbers").prepend("<div>"+ cardNum +"</div>");
		}

	}
	
	
	$("button").click(function(){
		$("#startScene").hide();
		$("#numbers div").click(function(){
			
			var num = $(this).html();
			
			if(num == countNum){
				$(this).addClass("hit");
				countNum++;				
				if(countNum == 17){
					clearInterval(timer);
					
					$("#startScene p").html("Your Record : " + $("#timer span").html());
			
					$("button").html("PLAY AGAIN");
									
					$("#startScene").show();
			
					if($("#record span").html() - $("#timer span").html()> 0 || $("#record span").html() == 0){
						$("#record span").html($("#timer span").html());
					}
					
					init();

				}
			}
		});
		
		timerFunc();
		timer = setInterval(timerFunc, 10);

	});
	
	function timerFunc(){
		time++;
		$("#timer span").html(((time) / 100).toFixed(2));
	}

});