showClock();

function showClock() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var date = new Date;
	var angle;
	var percent = Math.min(canvas.width, canvas.height)*0.40;
	var percent = percent;

	drawClock();
	setInterval(stepClock, 1000)
	
	function stepClock(){
		date = new Date;
		drawClock();
	}
	function drawClock(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = percent*0.01;

		drawDials();
		drawHourMarks();
		drawSecondMarks();
		drawHourText();

		drawSecondHand();
		drawMinuteHand();
		drawHourHand();

		drawCenterPoint();
	}

	function drawDials() {
		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.height / 2, (percent*1.2), 0, Math.PI * 2);
		ctx.strokeStyle = '#92949C';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.height / 2, (percent*1.17), 0, Math.PI * 2);
		ctx.strokeStyle = '#929BAC';
		ctx.stroke();
	}
	function drawCenterPoint() {
		ctx.beginPath();
		ctx.arc(canvas.width / 2, canvas.height / 2, percent*0.02, 0, Math.PI * 2);
		ctx.lineWidth = percent*0.04;
		ctx.fillStyle = '#353535';
		ctx.strokeStyle = '#0C3D4A';
		ctx.stroke();
	}

	function drawHourMarks() {

		for (var i = 0; i < 12; i++) {
			angle = i * (Math.PI * 2) / 12;
			ctx.lineWidth = percent*0.03;
			ctx.beginPath();

			var x1 = (canvas.width / 2) + Math.cos(angle) * (percent);
			var y1 = (canvas.height / 2) + Math.sin(angle) * (percent);
			var x2 = (canvas.width / 2) + Math.cos(angle) * (percent - (percent / 7));
			var y2 = (canvas.height / 2) + Math.sin(angle) * (percent - (percent / 7));

			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);

			ctx.strokeStyle = '#466B76';
			ctx.stroke();
		}
	}
	function drawHourText(){
	  for (var i = 0; i < 12; i++) {
		angle = i * (Math.PI * 2) / 12;
		var hour = (i+3)%12;
		hour = (hour == 0) ? 12 : hour;
		
		var xt = (canvas.width / 2) + Math.cos(angle) * (percent*1.04);
		 var yt = (canvas.height / 2) + Math.sin(angle) * (percent*1.04);
		
		switch(hour){
		  case 1:
			xt=xt-percent*0.03;
			break;
		  case 3:
			yt=yt+percent*0.04;
			break;
		  case 4:
			yt=yt+percent*0.06;
			break;
		  case 5:
			xt=xt-percent*0.02;
			yt=yt+percent*0.08;
			break;
		  case 6:
			xt=xt-percent*0.03;
			yt=yt+percent*0.09;
			break;
		  case 7:
			xt=xt-percent*0.04;
			yt=yt+percent*0.09;
			break;
		  case 8:
			xt=xt-percent*0.06;
			yt=yt+percent*0.06;
			break;
		  case 9:
			xt=xt-percent*0.06;
			yt=yt+percent*0.04;
			break;
		  case 10:
			xt=xt-percent*0.11;
			yt=yt+percent*0.03;
			break;
		  case 11:
			xt=xt-percent*0.07;
			yt=yt+percent*0.01;
			break;
		  case 12:
			xt=xt-percent*0.07;
			break;
		}
		
		
		ctx.font=(percent*0.12)+"px Arial"
		ctx.fillText(hour, xt, yt);
	  }
	}

	function drawSecondMarks() {

		for (var i = 0; i < 60; i++) {
		  if(i%5 != 0){
			angle = i * (Math.PI * 2) / 60;
			ctx.lineWidth = percent*0.02;           
			ctx.beginPath();

			var x1 = (canvas.width / 2) + Math.cos(angle) * (percent);
			var y1 = (canvas.height / 2) + Math.sin(angle) * (percent);
			var x2 = (canvas.width / 2) + Math.cos(angle) * (percent - (percent / 30));
			var y2 = (canvas.height / 2) + Math.sin(angle) * (percent - (percent / 30));

			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);

			ctx.strokeStyle = '#C4D1D5';
			ctx.stroke();
		  }
		}
	}

	function drawSecondHand() {

		var sec = date.getSeconds();
		angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
		ctx.lineWidth = percent*0.01; 
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);   
		ctx.lineTo((canvas.width / 2 + Math.cos(angle) * percent),
			canvas.height / 2 + Math.sin(angle) * percent);

		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20),
			canvas.height / 2 - Math.sin(angle) * 20);

		ctx.strokeStyle = '#586A73';
		ctx.stroke();
	}

	function drawMinuteHand() {

		var min = date.getMinutes();
		angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
		ctx.lineWidth = percent*0.02;

		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.lineTo((canvas.width / 2 + Math.cos(angle) * percent / 1.1),      
			canvas.height / 2 + Math.sin(angle) * percent / 1.1);

		ctx.strokeStyle = '#999';
		ctx.stroke();
	}

	function drawHourHand() {

		var hour = date.getHours();
		var min = date.getMinutes();
		angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
		ctx.lineWidth = percent*0.03;

		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height / 2);
		ctx.lineTo((canvas.width / 2 + Math.cos(angle) * percent / 1.5),      
			canvas.height / 2 + Math.sin(angle) * percent / 1.5);

		ctx.strokeStyle = '#000'; 
		ctx.stroke();
	}
}
