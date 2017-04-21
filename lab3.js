window.addEventListener('load', function() {

	let canvas = document.getElementById('canvas');
	let ct = canvas.getContext('2d');

	
function clearCanvas(){
    let canvas = document.getElementById('canvas');
    let ct = canvas.getContext("2d");
    ct.clearRect(0, 0, canvas.width, canvas.height);
	clickPositions=[];
       myDrawing=[];
}
	
	var menybutton1 = document.getElementById('menybutton');

	function meny(){
		var menylista1 = document.getElementById('menylista');
		if(menylista1.style.display=='none'){
		   menylista1.style.display='block';
		} 
		else{
			menylista1.style.display='none';
		}
	}
	menybutton1.addEventListener('click', meny);
	//meny();

	//ett select-element för att välja färg på linjerna man ritar

	function select(){
		var x = document.getElementById("sel").value;
		document.getElementById("canvas").style.color=x;
	}
console.log("change color exists!");
	
	let color = document.getElementById('color');
	color.addEventListener('click',changeColor);
	
	
	function changeColor(){
		let color1 = document.getElementById('skriva');
		let color2 = document.getElementsByName('color')[0];
		color2.value=color1.value;
	}
	
	
	//lägga till färge i listan
	
	color.addEventListener('click', function(){
		if(skriva.value.length==7){
			let colorCho=document.createElement('option');
			sel.appendChild(colorCho);
			colorCho.innerHTML=skriva.value;
			colorCh.style.background=skriva.value;
			
		}
	});
	sel.addEventListener('click', function()
						{
		colorPicker.value=sel.value;
	})
	
	

     let rensa=document.getElementById("rensa");
	rensa.addEventListener('click', clearCanvas);

	
	

	
	
	let avbryta=document.getElementById("avbryta");
	let clickAvbryta= false;
	avbryta.addEventListener('click', function(){
		clickPositions=[];
       myDrawing=[];
		
							 
							 });
	
	
	//point list
	function insertPoints() {
    let result = ' ';

    for (let i = 0; i < myDrawing.length; i++) {
        let x = myDrawing[i].x;
        let y = myDrawing[i].y;

        result += '// Point ' + [i+1] + ': ' + [(x),(y)] + ' ';
        document.getElementById ("status").value = result;
      }
}
	
	
	
	
	//skapa en tom lista för att spara alla former som besökaren skaper
	
	
	let myDrawing = [];
	
	

		//skapa en satusbar


	let statustext = document.getElementById("statustext");
	statustext.innerHTML = "Testar";
	console.log(statustext);
	
	

//vi sätter alla knapper till false för att dom inte ska vara aktverade
	var clickPositions = [];
	let userHasClickedCircle = false;
	let userHasClickedTriangel = false;
	let userHasClickedRegtangel = false;
	
	let circleButton = document.getElementById('cir');
	circleButton.addEventListener('click', function(event) {
		userHasClickedCircle = true;
	    userHasClickedTriangel = false;
	    userHasClickedRegtangel = false;
	
		clickPositions = [];
	});
	
	
	let triangelButton = document.getElementById('tri');
	triangelButton.addEventListener('click', function(event) {
		userHasClickedCircle = false;
		userHasClickedTriangel = true;
	    userHasClickedRegtangel = false;
	
		clickPositions = [];
	});
	
	let rectangleButton = document.getElementById('rek');
	rectangleButton.addEventListener('click', function(event) {
		userHasClickedCircle = false;
		userHasClickedTriangel = false;
	    userHasClickedRegtangel = true;
	
		clickPositions = [];
	});
	
	
	
function getMousePos(canvas, evt) {
   let rect = canvas.getBoundingClientRect();
   return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top
   };
}

	
	// expotera json
	let exJson=document.getElementById("exjson")
	let expoteraJson=document.getElementById("json");
	expoteraJson.addEventListener('click',function(){
		let json=JSON.stringify(myDrawing);
		exJson.innerHTML=json;
	});

	
	//hämtar positionerna på mus-klick o skriver ut dem i input fältet
	canvas.addEventListener('click', function(event) {
		let mouse = getMousePos(canvas, event);
		clickPositions.push(mouse);

		console.log(clickPositions[0].x);
		console.log(clickPositions[0].y);
/*
		document.getElementById("status3").value =
		'X:' + x + ',' + 'Y:'+ y ;
	*/	
		if( userHasClickedCircle) {
			statustext.innerHTML = "clicking to make a circle";
			// se till att vi har 2 koordinater
			if( clickPositions.length == 2 ) {
				//börja rira circle
				let crclRadius = 
               Math.sqrt(((clickPositions[0].x - clickPositions[1].x)*(clickPositions[0].x - clickPositions[1].x))+
               ((clickPositions[0].y - clickPositions[1].y)*(clickPositions[0].y - clickPositions[1].y)));
               
               let newCircle = new Circle(clickPositions[0].x,clickPositions[0].y,crclRadius);
               newCircle.draw();
               myDrawing.push(newCircle);
			   clickPositions=[];
				
			
}
			else if (clickAvbryta) {
             inbox.value = "Du har avbyrta din ritning"
               

       }
			}
		
		// börja rita triangel
		else if (userHasClickedTriangel){
			statustext.innerHTML = "clicking to make a tringel";
			
			if(clickPositions.length === 1) {
             statustext.innerHTML = "Choose your second point."
           }
            else if (clickPositions.length === 2) {
             statustext.innerHTML = "Choose your third point."
          }
           else if (clickPositions.length === 3){
             let newTriangle = new Triangle (clickPositions[0].x, clickPositions[0].y, clickPositions[1].x, clickPositions[1].y, clickPositions[2].x, clickPositions[2].y);
       
           newTriangle.draw();
           myDrawing.push(newTriangle);
           clickPositions=[];
           }
			else if (clickAvbryta) {
             inbox.value = "Du har avbyrta din ritning"
       		}
		}
		
		
		
		//börja rita rectangle
		
		else if (userHasClickedRegtangel){
			 statustext.innerHTML = "clicking to make a Regtangel";
			
			if(clickPositions.length === 1) {
             statustext.innerHTML = "Choose your second point."
           }
            else if (clickPositions.length === 2) {
		let newRectangle = new Rectangle (clickPositions[0].x, clickPositions[0].y, clickPositions[1].x, clickPositions[1].y);
				newRectangle.draw();
				myDrawing.push(newRectangle);
           clickPositions=[];
           }
			else if (clickAvbryta) {
             inbox.value = "Du har avbyrta din ritning"
               

       }
			
		}
       
		 else 
		 {
			statustext.innerHTML = "clicking, no circle"
		}
							
	});
	
	
	
	
	
	
	
	
	//lab2
	
	// rita circle
	
	function Circle(centerX, centerY, radius){
    this.centerX = centerX; 
    this.centerY = centerY; 
    this.radius = radius;
	this.color = colorPicker.value;
    
    this.area = function(){
        return     Math.PI * this.radius * this.radius;
    };
    
    this.move = function(dx,dy){
        this.centerX =     this.centerX + dx;
        this.centerY =     this.centerY + dy;
    };
    
    this.points = function(){
        return [{x:this.centerX, y:this.centerY}];
    };
    
    this.distanceTo = function(otherCircle){
        let x1 = this.centerX;
        let x2 = otherCircle.centerX;
        let y1 = this.centerY;
        let y2 = otherCircle.centerY;
        let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        let distance = d - this.radius - otherCircle.radius;
        if(distance <= 0){
            return 0;
        }
        return distance;
    };
    
    this.boundingBox = function(){
        let x1 = this.centerX - this.radius;
        let y1 = this.centerY + this.radius;
        let x2 = this.centerX + this.radius;
        let y2 = this.centerY - this.radius;
        let rectangle = new Rectangle(x1,y1,x2,y2);
        return rectangle;
    };
    
    this.toString = function(){
        return "Jag är en cirkel med mittpunkt (" + this.centerX + "," + this.centerY + ") och radie" + this.radius + ".";
    };
		
		this.draw = function() {
           ct.beginPath();
           ct.strokeStyle = this.color;
           ct.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI);
           ct.stroke();
           clickPositions = [];
       };
}
	
	
	
	
	// rita triangle
	
	function Triangle(x1, y1, x2, y2, x3, y3){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
	this.color = colorPicker.value;
    
    this.area = function(){
        let area = (1/2)*(this.x1 * this.y2 + this.x2 * this.y3 + this.x3*this.y1-this.x1*this.y3-this.x2*this.y1-this.x3*this.y2);
        return area;
    };
    
    this.move = function(dx, dy){
        this.x1 = this.x1 + dx;
        this.y1 = this.y1 + dy;
        this.x2 = this.x2 + dx;
        this.y2 = this.y2 + dy;
        this.x3 = this.x3 + dx;
        this.y3 = this.y3 + dy;
    };
    
    this.points = function(){
        let points = [{x: this.x1, y:this.y1},{x: this.x2, y:this.y2},{x: this.x3, y:this.y3}];
        return points;
    };
    
    this.boundingBox = function(){
        let minX = Math.min(this.x1,this.x2,this.x3);
        let maxY = Math.max(this.y1,this.y2,this.y3);
        let maxX = Math.max(this.x1,this.x2,this.x3);
        let minY = Math.min(this.y1,this.y2,this.y3);
        let rectangle = new Rectangle(minX,maxY,maxX,minY);
        return rectangle;
    };
		
		
		this.draw = function() {
             ct.beginPath();
             ct.strokeStyle = this.color;
             ct.moveTo(this.x1, this.y1);
             ct.lineTo(this.x2, this.y2);
             ct.lineTo(this.x3, this.y3);
             ct.closePath();
             ct.stroke();
       };
}
	
	
	//rita rectangle
	
	function Rectangle(x1, y1, x2, y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
	
	this.color = colorPicker.value;
    this.area = function(){
        let area = (this.y2 - this.y1) * (this.x2 - this.x1);
        return area;
    };
    
    this.move = function(dx,dy){
        this.x1 = this.x1 + dx;
        this.y1 = this.y1 + dy;
        this.x2 = this.x2 + dx;
        this.y2 = this.y2 + dy;
    };
    
    this.points = function(){
        let points = [
            {x: this.x1, y: this.y1},
            {x: this.x2, y: this.y2},
            {x: this.x2, y: this.y1},
            {x: this.x1, y: this.y2}
        ];
        return points;
    };
    
    this.distanceTo = function(otherRectangle){
        let mx1 = 0.5 * (this.x2 + this.x1) ;
        let my1 = 0.5 * (this.y2 + this.y1) ;
        let mx2 = 0.5 * (otherRectangle.x2 + otherRectangle.x1) ;
        let my2 = 0.5 * (otherRectangle.y2 + otherRectangle.y1) ;
        let distance = Math.sqrt((mx2-mx1)*(mx2-mx1) + (my2-my1)*(my2-my1));
        if(distance < 0){
            return 0;
        }
        return distance;
    };
		
		
       this.draw = function() {
         ct.strokeStyle = this.color;
        ct.strokeRect( this.x1, this.y1, (this.x2 - this.x1), (this.y2 - this.y1) );
        }
}

	
	
	
	

	});

	




