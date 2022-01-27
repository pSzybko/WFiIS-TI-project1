var xmlHttp;
//Tworzymy cztery zmienne czasowe aby równocześnie rysujące się wykresy nie wpływały na siebie oraz można by im było nadawać różne "prędkości"
var time=0;
var time2=0;
var time3=0;
var time4=0;
//Interwał odpowiadający za rysowanie wykresu funkcji ruchu harmonicznego w zakładce teoria
var myInterval;
//Interwał odpowiadający za rysowanie wykresu funkcji ruchu harmonicznego w zakładce symulacje
var myInterval1;
//Interwał odpowiadający za symulację korelacji ruchu harmonicznego i ruchu po okręgu
var myInterval2;
//Interwał odpowiadający za symulację ruchu klocka na sprężynie
var myInterval3;
function getRequestObject(){
    if(window.ActiveXObject){
        return (newActiveXObject("Microsoft.XMLHTTP"));
    } else if(window.XMLHttpRequest){
        return (new XMLHttpRequest());
    } else{
        return(null);
    }
}
//Wyświetlanie odpowiedniej treści
function showContent(evt, tabName){
  let MyDivElement = document.getElementsByClassName("MyDivElement");
  for (let i = 0; i < MyDivElement.length; i++) {
    MyDivElement[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
//Funkcja rozpoczynająca interwał rysowania funkcji ruchu harmonicznego przy przy stałej amplitudzie oraz okresie
function initDraw(){
    document.getElementById("draw1").hidden = true;
    myDiv=document.getElementById("myCanvas");
    myDiv.hidden = false;
    drawLines(myDiv, 8, true);
    myInterval=setInterval(function(){drawHarmonic(myDiv,8, 5);},50);
}
//Funkcja rysująca podpisane osie wraz z wyświetlaniem amlitudy 
function drawLines(myDiv, A, flag){
    var context=myDiv.getContext('2d');
    if(myDiv.getContext){
        if(flag){
            context.beginPath();
        }
        context.moveTo(30, myDiv.height-50);
        context.lineTo(30, 75);
        context.lineTo(25, 75);
        context.lineTo(30, 50);
        context.lineTo(35, 75);
        context.lineTo(30, 75);
        context.font = "bold 12px sans-serif";
        context.fillStyle = 'lightpink';
        context.fillText('x',10, 75);
        context.fillText('A',10, myDiv.height*0.5+10*A);
        context.fillText('A',10, myDiv.height*0.5-10*A);
        context.moveTo(15,0.5*myDiv.height);
        context.lineTo(550, myDiv.height*0.5);
        context.lineTo(550, myDiv.height*0.5+5);
        context.lineTo(575, myDiv.height*0.5);
        context.lineTo(550, myDiv.height*0.5-5);
        context.lineTo(550, myDiv.height*0.5);
        context.fillText('t',560, myDiv.height*0.5-15);
        context.strokeStyle='lightpink';
        if(flag){
            context.stroke();
        }
    }
}
//Funkcja odpowiadająca za rysowanie wykresu ruchu harmonicznego w zależności od Amplitudy i Okresu
function drawHarmonic(myDiv, A, T){
    var context=myDiv.getContext('2d');
    if(myDiv==document.getElementById("myCanvas")) 
        time+=0.2;
    else time3+=0.2;
    if(myDiv.getContext){
        context.clearRect(0,0,600,myDiv.height);
        drawLines(myDiv, A, true);
        context.beginPath();
        for(let i=32; i<=600-50; i++){
            if(myDiv==document.getElementById("myCanvas")) 
                context.lineTo(i, myDiv.height*0.5-Math.cos(time+i*0.01*(10-T))*10*A);
            else
                context.lineTo(i, myDiv.height*0.5-Math.cos(time3+i*0.01*(10-T))*10*A);
        }
        context.strokeStyle='lightpink';
        context.stroke();
    }
}
//Funkcja wyświetlająca suwaki do wprowadzenia danych potrzebnych do stworzenia wykresu ruchu harmonicznego
function initNewDraw(){
    document.getElementById("circMove").hidden=false;
    document.getElementById("draw2").hidden=true;
}
//Funkcja rozpoczynająca interwał rysowania wykresu ruchu harmonicznego na bazie wprowadzonych danych
function initDraw1(){
    clearInterval(myInterval1);
    var myDiv=document.getElementById("myCanvas2");
    var amp=document.getElementById("amplituda");
    var okr=document.getElementById("okres");
    drawLines(myDiv, parseInt(amp.value), true);
    myInterval1=setInterval(function(){drawHarmonic(myDiv, parseInt(amp.value), parseInt(okr.value));},50);
}
//Funkcja zatrzymująca interwał - konieczne przy przerysowywaniu funkcji po zmienieniu danych
function stopMyInterval(){
    clearInterval(myInterval1);
}
//Funkcja rysująca okrąg
function drawCircle(){
    var myDiv=document.getElementById("myCanvas3");
    var context=myDiv.getContext('2d');
    if(myDiv.getContext){
        context.clearRect(600,0,400,myDiv.height);
        context.beginPath();
        context.arc(700,200,80,0, 2*Math.PI);
        context.strokeStyle='lightpink';
        context.stroke();
    }
}
//Funkcja rysująca punkt obrazujący ruch po okręgu
function circlePoint(i, A, T){
    var myDiv=document.getElementById("myCanvas3");
    var x=700-Math.sin(time2+i*0.01*(10-T))*10*A;
    var y=myDiv.height*0.5-Math.cos(time2+i*0.01*(10-T))*10*A;
    var context=myDiv.getContext('2d');
    if(myDiv.getContext){
        context.arc(x,y,7, 0, 2*Math.PI);
    }
}
//Funkcja rozpoczynająca interwał rysowania zależności ruchu harmonicznego i ruchu po okręgu
function initDraw2(){
    var myDiv=document.getElementById("myCanvas3");
    myDiv.hidden=false;
    document.getElementById("draw3").hidden=true;
    drawLines(myDiv, 8, true);
    myInterval2=setInterval(function(){drawHarmonicCircle(myDiv,8, 5);},50);
    drawCircle();
}
//Funkcja rysująca zależność ruchu harmonicznego i ruchu po okręgu
function drawHarmonicCircle(myDiv, A, T){
    var context=myDiv.getContext('2d');
    time2+=0.1;
    if(myDiv.getContext){
        context.clearRect(0,0,600,myDiv.height);
        drawLines(myDiv, A, true);
        context.beginPath();
        for(let i=32; i<=600-50; i++){
            context.lineTo(i, myDiv.height*0.5-Math.cos(time2+i*0.01*(10-T))*10*A);
            if(i==550){
                context.moveTo(550, myDiv.height*0.5-Math.cos(time2+i*0.01*(10-T))*10*A);
                context.lineTo(700-Math.sin(time2+i*0.01*(10-T))*10*A, myDiv.height*0.5-Math.cos(time2+i*0.01*(10-T))*10*A);
                circlePoint(i, A, T);
                context.clearRect(550,0,1000,myDiv.height);
                drawLines(myDiv, A, false);
                context.moveTo(i, myDiv.height*0.5-Math.cos(time2+i*0.01*(10-T))*10*A);
                context.moveTo(780, 200);
                context.arc(700,200,80,0, 2*Math.PI);
            }
        }
        context.strokeStyle='lightpink';
        context.stroke();
    }
}
//Funkcja rysująca osie dla przykładu z klockiem na sprężynie 
function drawLines2(myDiv){
    var context=myDiv.getContext('2d');
    if(myDiv.getContext){
        context.moveTo(30, 210);
        context.lineTo(30, 75);
        context.lineTo(25, 75);
        context.lineTo(30, 50);
        context.lineTo(35, 75);
        context.lineTo(30, 75);
        context.font = "bold 12px sans-serif";
        context.fillStyle = 'lightpink';
        context.fillText('A',50, myDiv.height*0.5+15);
        context.fillText('A',450, myDiv.height*0.5+15);
        context.moveTo(15,0.5*myDiv.height);
        context.lineTo(550, myDiv.height*0.5);
        context.lineTo(550, myDiv.height*0.5+5);
        context.lineTo(575, myDiv.height*0.5);
        context.lineTo(550, myDiv.height*0.5-5);
        context.lineTo(550, myDiv.height*0.5);
        context.fillText('x',560, myDiv.height*0.5-15);
        context.strokeStyle='lightpink';
        context.stroke();
    }
}
//Funkcja rozpoczynająca interwał rysowania ruchu klocka na sprężynie
function initDraw3(){
    var myDiv=document.getElementById("myCanvas4");
    myDiv.hidden=false;
    document.getElementById("draw4").hidden=true;
    drawLines2(myDiv);
    var context=myDiv.getContext('2d');
    context.beginPath();
    context.clearRect(0, 0, 1000, myDiv.height);
    myInterval2=setInterval(function(){drawBox(myDiv);},50);
    context.stroke();
}
//Funkcja rysująca klocek i sprężyne w zależności od czasu
function drawBox(myDiv){
    time4+=0.05;
    var x=250+Math.sin(time4*Math.PI)*175;
    var context=myDiv.getContext('2d');
    context.beginPath();
    if(myDiv.getContext){
        context.clearRect(0, 0, 1000, myDiv.height);
        drawLines2(myDiv);
        context.moveTo(30, 150);
        for(var i=30; i<x-25; i++){
            context.lineTo(i, 175-Math.sin(i*(100./x))*10);
        }
        context.moveTo(x-25, 200);
        context.lineTo(x-25, 150);
        context.lineTo(x+25, 150);
        context.lineTo(x+25, 200);
        context.strokeStyle='lightpink';
        context.stroke();
    }
}