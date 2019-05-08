$(function() {
	window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

$( '#window' ).get( 0 ).width = $( window ).width();// canvasをフルサイズに
$( '#window' ).get( 0 ).height = $( window ).height();// canvasをフルサイズに

var canvas = document.querySelector('#window');// canvasを設定
var ctx = canvas.getContext('2d');

var numParticles = 200;  // パーティクルの個数
var particles = []; // パーティクルをまとめる配列

var mouseX;// マウスX座標
var mouseY;// マウスY座標

var flag = false;// フラグ
var angle = 0;// 回転角度のカウント

var flightParticles = 0;// 目標にアニメーションするパーティクルの情報

var Particle = function(color) {
	this.color = color; // 色
	this.alpha = 1;// 透明度
	this.scale = 1; // 大きさ
	this.initSclae = 1; // 最初の大きさ
	this.speed = { // 速度
		x: 1,
		y: 1
	};
	this.position = { // 現在位置
		x: 100,
		y: 100
	};
	this.to = { // 目標位置
		x: 100,
		y: 100
	};
	this.angle = -1;// 角度
	this.radius = 1;// 半径
	this.flightmode = false;// フラグ
};

var nowTimeA;
var nowTimeB;
var second;
var milli;
var timeFlag = true;
setInterval(function(){
	var date = new Date();
	second = date.getSeconds();
	milli = date.getMilliseconds()
	
	if (second < 10) {
		nowTimeA = 0;
		nowTimeB = second;
	} else {
		nowTimeA = parseInt(second / 10);
		nowTimeB = second - nowTimeA * 10;
	}
},10);

Particle.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.position.x, this.position.y, this.scale, 0, 2*Math.PI, false);// 円を描画
	ctx.fillStyle = this.color;
	ctx.globalAlpha = this.alpha;
	ctx.fill();
};

for (var i=0; i<numParticles; i++) {// 最初のパーティクルを設定
	var colorRnd = "rgb("+(Math.floor(Math.random()*(200)+55))+","+(Math.floor(Math.random()*(200)+55))+","+Math.floor((Math.random()*(200)+55))+")";// ランダムな色を生成
	particles[i] = new Particle(colorRnd);// 配列開始、色を設定
	particles[i].alpha = 0.7;// 透明度を設定
	particles[i].scale = particles[i].initScale = Math.random()*(3)+1;// 大きさを設定
	particles[i].speed.x = Math.random()*(0.8) - 0.4;// Xスピードを設定
	particles[i].speed.y = Math.random()*(0.8) - 0.4;// Yスピードを設定
	particles[i].position.x = Math.random()*canvas.width;// X出現位置を設定
	particles[i].position.y = Math.random()*canvas.height;// Y出現位置を設定
	particles[i].draw();// 描画
}

loop();

function loop() {// アニメーションさせるために1/60秒毎にする処理を以下に記述
    requestAnimFrame(loop);
	
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);// 描画をクリアー
    
    for (var i=0; i<numParticles; i++) {// パーティクルの数だけループ処理

		if (flag) {// マウスクリックされているとき
			particles[i].flightmode = false;
			particles[i].position.x += ((mouseX + (Math.random()*400-200)) - particles[i].position.x) / 20;
			particles[i].position.y += ((mouseY + (Math.random()*400-200)) - particles[i].position.y) / 20;
		} else {// マウスクリックされてないとき
			if ((mouseX - particles[i].position.x) * (mouseX - particles[i].position.x) + (mouseY - particles[i].position.y) * (mouseY - particles[i].position.y) <= (80 * 80) && particles[i].flightmode == false) {// マウスの半径80pix以内に入っている場合
				//particles[i].flightmode = false;
				if (particles[i].angle == -1) {
					particles[i].angle = Math.atan2(particles[i].position.y - mouseY,particles[i].position.x - mouseX);// マウスとの角度を求める
					particles[i].radius = Math.sqrt((particles[i].position.x - mouseX) * (particles[i].position.x - mouseX) + (particles[i].position.y - mouseY) * (particles[i].position.y - mouseY));// マウスとの距離を求める
				}
				var toX = Math.cos(particles[i].angle) * particles[i].radius + mouseX;
				particles[i].position.x += (toX - particles[i].position.x) / (particles[i].scale * 3);
				var toY = Math.sin(particles[i].angle) * particles[i].radius + mouseY;
				particles[i].position.y += (toY - particles[i].position.y) / (particles[i].scale * 3);
				particles[i].angle += particles[i].scale / 100;// 角度をカウントアップ
			} else {
				if (particles[i].flightmode) {
					particles[i].position.x += (particles[i].to.x - particles[i].position.x) / 10;
					particles[i].position.y += (particles[i].to.y - particles[i].position.y) / 10;
					particles[i].alpha = 1;
				} else {
       				particles[i].position.x += particles[i].speed.x;
       				particles[i].position.y += particles[i].speed.y;
					particles[i].alpha = 0.7;
				}
				particles[i].angle = -1;

        		if (particles[i].position.x > canvas.width) {// 画面の左右端に来た時反対側に出す処理
					particles[i].position.x = 0;
				} else if (particles[i].position.x < 0) {
					particles[i].position.x = canvas.width;
				}

        		if (particles[i].position.y > canvas.height) {// 画面の上下端に来た時反対側に出す処理
					particles[i].position.y = 0;
				} else if (particles[i].position.y < 0) {
					particles[i].position.y = canvas.height;
				}
			}
		}
	particles[i].scale += (particles[i].initScale - particles[i].scale) / 5;
	particles[i].draw();// 描画
    }
	var bigSize = Math.floor(Math.random() * 400);// 時々またたく処理
	if (bigSize < numParticles) {
		particles[bigSize].scale = Math.random()*5+10;
	}
}

$("canvas").mouseup(function() {// マウスが離されたイベント
	flag = false;
});
$("canvas").mousedown(function() {// マウスクリックイベント
	flag = true;
});

var secondParticles;
$("#watch").hover(function() {// 時計がホバーしたイベント
	flightParticles = parseInt(Math.random() * (numParticles - 40));
	secondParticles = setInterval(secondParticlesPosition,10);
}, function() {
	clearInterval(secondParticles);
	for (var i=0; i<numParticles; i++) {
		particles[i].flightmode = false;
	}
});
function secondParticlesPosition(){
	for (var i=flightParticles; i<(flightParticles+20); i++) {
		particles[i].flightmode = particles[i+20].flightmode = true;
		if (second == 0) {// 0秒の時処理
			particles[i].to.x = num[10][i - flightParticles][0] + ($(window).width() / 2 - 110);
			particles[i].to.y = num[10][i - flightParticles][1] + ($(window).height() / 2 - 130);
			particles[i+20].to.x = num[10][i - flightParticles + 20][0] + ($(window).width() / 2 - 110);
			particles[i+20].to.y = num[10][i - flightParticles + 20][1] + ($(window).height() / 2 - 130);
		} else if (second == 30) {//30秒の時処理
			particles[i].to.x = (num[11][i - flightParticles][0]) * 0.7 + ($(window).width() / 2 - 70);
			particles[i].to.y = (num[11][i - flightParticles][1]) * 0.7 + ($(window).height() / 2 - 120);
			particles[i+20].to.x = (num[11][i - flightParticles + 20][0]) * 0.7 + ($(window).width() / 2 - 70);
			particles[i+20].to.y = (num[11][i - flightParticles + 20][1]) * 0.7 + ($(window).height() / 2 - 120);
		} else {//通常の秒数処理
			particles[i].to.x = num[nowTimeA][i - flightParticles][0] + ($(window).width() / 2 - 80);
			particles[i].to.y = num[nowTimeA][i - flightParticles][1] + ($(window).height() / 2 - 100);
			particles[i+20].to.x = num[nowTimeB][i - flightParticles][0] + ($(window).width() / 2 + 10);
			particles[i+20].to.y = num[nowTimeB][i - flightParticles][1] + ($(window).height() / 2 - 100);
		}
	}
	if (second == 0 && milli > 900 && timeFlag) {//0秒踏んだ後、パーティクルの解散処理
		timeFlag = false;
		for (var i=0; i<numParticles; i++) {
			particles[i].flightmode = false;
		}
		if (flightParticles < 80) {//新しい秒数カウント集団を乱数で決定
			flightParticles = parseInt(Math.random() * 80 + 80);
		} else {
			flightParticles = parseInt(Math.random() * 80);
		}
	}
	if (second > 2) {
		timeFlag = true;
	}
};

$(document).mousemove(function(e) {// マウスの位置を取得
	mouseX = e.pageX;
	mouseY = e.pageY;
});

var num =[];
num[0] = [[34,0],[48,5],[56,15],[62,28],[64,43],[65,57],[64,71],[62,84],[56,96],[48,106],[34,109],[20,106],[11,96],[6,84],[4,71],[2,57],[4,43],[6,28],[11,15],[20,5]];
num[1] = [[10,9],[18,6],[27,3],[35,1],[35,10],[35,19],[35,28],[35,37],[35,46],[35,55],[35,63],[35,72],[35,81],[35,90],[35,99],[15,108],[25,108],[35,108],[44,108],[54,108]];
num[2] = [[10,9],[19,2],[30,0],[42,1],[53,6],[58,17],[59,29],[57,41],[52,52],[45,62],[38,71],[30,80],[22,89],[13,97],[5,107],[16,107],[28,107],[39,107],[51,107],[62,107]];
num[3] = [[9,9],[19,2],[32,0],[45,2],[54,11],[56,23],[53,35],[43,44],[32,50],[20,50],[44,54],[54,61],[59,72],[60,84],[56,95],[49,104],[39,109],[27,110],[14,108],[3,102]];
num[4] = [[52,2],[41,16],[34,27],[26,38],[17,50],[7,62],[0,74],[13,74],[26,74],[39,74],[52,74],[65,74],[52,85],[52,96],[52,107],[52,14],[52,26],[52,38],[52,50],[52,62]];
num[5] = [[57,1],[45,1],[33,1],[21,1],[18,12],[16,23],[14,34],[12,45],[25,43],[37,44],[48,48],[55,57],[59,68],[60,79],[58,90],[50,98],[41,105],[29,108],[17,107],[7,101]];
num[6] = [[44,1],[31,6],[20,14],[11,26],[5,39],[2,53],[2,67],[3,80],[8,93],[17,104],[31,110],[46,106],[58,98],[63,86],[65,72],[62,59],[54,48],[39,42],[25,43],[13,50]];
num[7] = [[0,1],[10,1],[20,1],[30,1],[39,1],[49,1],[59,1],[69,1],[65,10],[61,19],[56,28],[52,37],[48,46],[43,55],[39,63],[34,72],[30,81],[26,90],[21,99],[17,108]];
num[8] = [[34,0],[19,5],[9,15],[8,30],[18,44],[34,50],[50,59],[61,69],[63,84],[57,100],[42,109],[22,109],[8,99],[3,84],[6,69],[17,59],[50,44],[58,31],[59,16],[50,5]];
num[9] = [[49,61],[35,67],[20,66],[9,57],[3,44],[3,29],[9,15],[18,5],[32,0],[46,4],[57,14],[63,28],[64,43],[64,57],[60,71],[55,84],[47,95],[37,103],[25,108],[11,109]];
num[10] = [[106,180],[97,169],[88,158],[79,147],[69,137],[59,127],[46,117],[34,108],[21,99],[10,87],[2,73],[0,58],[1,43],[7,28],[19,14],[35,4],[54,0],[74,3],[90,12],[98,26],[106,39],[114,26],[122,12],[138,3],[158,0],[177,4],[193,14],[205,28],[211,43],[212,58],[210,73],[202,87],[191,99],[178,108],[166,117],[153,127],[143,137],[133,147],[127,158],[115,169]];
num[11] = [[65,49],[125,49],[60,66],[71,66],[120,66],[131,66],[66,82],[126,82],[44,117],[48,129],[59,129],[61,144],[73,139],[75,152],[88,144],[90,155],[104,144],[104,155],[118,152],[121,139],[132,144],[134,130],[146,130],[149,118],[96,2],[52,13],[26,35],[9,62],[2,95],[10,130],[32,160],[59,178],[96,185],[132,178],[162,160],[181,130],[188,95],[182,62],[166,35],[139,13]];
});
