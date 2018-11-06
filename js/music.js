var score=0;

function game(){

    //data init
    var height=$('.button').height();//方块大小
    var width=$('#div1').width();
    var LineLength=$('.line').height();
    var ButtonLength=$('.button').height();
    var font_size=$('#score').height()*0.6;
    $('.button').css('line-height',ButtonLength+'px');
    var num=0;
    var leftsize=0;
    var heightjudge=LineLength+ButtonLength/2;
    //该四个数组用于记录是第几个方块
    var line1target=new Array(50);
    var line2target=new Array(50);
    var line3target=new Array(50);
    var line4target=new Array(50);
    var position=new Array(200);
    var crack_array=new Array(200);
    var line1firstindex=1;
    var line1lastindex=0;
    var line2firstindex=1;
    var line2lastindex=0;
    var line3firstindex=1;
    var line3lastindex=0;
    var line4firstindex=1;
    var line4lastindex=0;
    //status：-1代表miss，0代表没有触发，1代表perfect
    var line1status=0;
    var line2status=0;
    var line3status=0;
    var line4status=0;
    var line1colorstatus=0;
    var line2colorstatus=0;
    var line3colorstatus=0;
    var line4colorstatus=0;
    var gamestatus=0;
    var perfectdistance=ButtonLength/4;
    var gooddistance=ButtonLength/2;
    var distance;
    var audio= document.getElementById("audio");
    var looptimes=0;
    //var flag=1;
    var scorechangeflag=0;
    var timeschangeflag=0;
    //游戏进程时间，单位为s
    var times=0;
    //circletimes单位为ms
    var circletimes=25;
    var circle_looptimes=1000/circletimes;
    var color_times=circle_looptimes/2;
    var speed=LineLength/(circle_looptimes*3);

    var is_pause=0;
    var pause_change_flag=0;
    var pause_flag=0;
    var play_flag=1;
    var dis;
    var toppx=11*height/10;

    /*
    //canvas init
    var canvasheight=$('#myCanvas1').height();
    var canvaswidth=$('myCanvas1').width();
    var d=document.getElementById("myCanvas2");
    var dtx=d.getContext("2d");
    var gradient=dtx.createLinearGradient(0,0,d.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    dtx.strokeStyle=gradient;
    dtx.font="30px Verdana";
    */


    //Wrapper为一个类
    var Wrapper = {
        //产生多个指定轨道的方块（参数不能重复）
        cracks_make:function(line_num1,line_num2=0,line_num3=0,line_num4=0){
            if(line_num1) {
                 crack_make(line_num1);
            }
            if(line_num2) {
                crack_make(line_num2);
            }
            if(line_num3) {
                crack_make(line_num3);
            }
            if(line_num4) {
                crack_make(line_num4);
            }
        },

        //产生指定轨道的方块
        crack_make:function(line_number){
            num++;
            var number=line_number;
            if(number==1) {
                line1target[line1lastindex]=num;line1lastindex++;
            }
            else if(number==2) {
                line2target[line2lastindex]=num;line2lastindex++;
            }
            else if(number==3) {
                line3target[line3lastindex]=num;line3lastindex++;
            }
            else {
                line4target[line4lastindex]=num;line4lastindex++;
            }
            position[num-1]=0;
            var myline=$('#button'+number);
            if(number==1){
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            else if(number==2){
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            else if(number==3){
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            else {
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            var target=$('#target'+num);
            target.css({
                'position':'absolute',
                'left':leftsize+'px',
                'top':-toppx+'px',
                'width':width+'px',
                'height':height*2+'px',
                'z-index':1,
                'text-align': 'center',
                'line-height':height+'px',
                'font-size': 30 +'px',
                'background-image':"url('./game_picture/crack.png')",
                'background-size':"100% 100%",
            });
        },

	      //randoms函数实现随机产生一块方块
        randoms:function(){
            num++;
            var number=(1 + Math.random() * (4 - 1)).toFixed(0);
            if(number==1) {
                line1target[line1lastindex]=num;line1lastindex++;
            }
            else if(number==2) {
                line2target[line2lastindex]=num;line2lastindex++;
            }
            else if(number==3) {
                line3target[line3lastindex]=num;line3lastindex++;
            }
            else {
                line4target[line4lastindex]=num;line4lastindex++;
            }
            position[num-1]=0;
            var myline=$('#button'+number);
            if(number==1){
                myline.after('<div class="target"  data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            else if(number==2){
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            else if(number==3){
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            else {
                myline.after('<div class="target" data-acton="'+number+'" id="target'+num+'" ></div>');
            }
            var target=$('#target'+num);
            target.css({
	              'position':'absolute',
                'left':leftsize+'px',
                'top':-toppx+'px',
                'width':width+'px',
                'height':height*2+'px',
                'z-index':1,
                'text-align': 'center',
                'line-height':height+'px',
                'font-size': 30 +'px',
                'background-image':"url('./game_picture/crack.png')",
                'background-size':"100% 100%",
            });
        },

        line1check:function(){
            if(line1lastindex>=line1firstindex){
                if(position[line1target[line1firstindex-1]-1]>heightjudge){
 		                $('#target' + line1target[line1firstindex-1]).remove();
 		                line1status=-1;
 		                line1firstindex++;
 	              }
            }
        },

        line2check:function(){
            if(line2lastindex>=line2firstindex){
                if(position[line2target[line2firstindex-1]-1]>heightjudge){
 		                $('#target' + line2target[line2firstindex-1]).remove();
 		                line2status=-1;
 		                line2firstindex++;
 	              }
            }
        },

        line3check:function(){
            if(line3lastindex>=line3firstindex){
                if(position[line3target[line3firstindex-1]-1]>heightjudge){
 		                $('#target' + line3target[line3firstindex-1]).remove();
 		                line3status=-1;
 		                line3firstindex++;
 	              }
            }
        },

        line4check:function(){
            if(line4lastindex>=line4firstindex){
                if(position[line4target[line4firstindex-1]-1]>heightjudge){
 		                $('#target' + line4target[line4firstindex-1]).remove();
 		                line4status=-1;
 		                line4firstindex++;
 	              }
            }
        },

        move:function(){
		    	  for(var i=line1firstindex;i<=line1lastindex;i++){
		    		    position[line1target[i-1]-1]+=speed;
                dis=position[line1target[i-1]-1];
		    		    $('#target'+line1target[i-1]).css({
                    'top':dis-toppx+'px', 
                });
                if(dis>heightjudge){
                    $('#target' + line1target[line1firstindex-1]).remove();
                    line1status=-1;
                    line1firstindex++;
                }
		    	  }

            for(var i=line2firstindex;i<=line2lastindex;i++){
                position[line2target[i-1]-1]+=speed;
                dis=position[line2target[i-1]-1];
                $('#target'+line2target[i-1]).css({
                    'top':dis-toppx+'px', 
                });
                if(dis>heightjudge){
                    $('#target' + line2target[line2firstindex-1]).remove();
                    line2status=-1;
                    line2firstindex++;
                }
            }

            for(var i=line3firstindex;i<=line3lastindex;i++){
                position[line3target[i-1]-1]+=speed;
                dis=position[line3target[i-1]-1];
                $('#target'+line3target[i-1]).css({
                    'top':dis-toppx+'px', 
                });
                if(dis>heightjudge){
                    $('#target' + line3target[line3firstindex-1]).remove();
                    line3status=-1;
                    line3firstindex++;
                }
            }

            for(var i=line4firstindex;i<=line4lastindex;i++){
                position[line4target[i-1]-1]+=speed;
                dis=position[line4target[i-1]-1];
                $('#target'+line4target[i-1]).css({
                    'top':dis-toppx+'px', 
                });
                if(dis>heightjudge){
                    $('#target' + line4target[line4firstindex-1]).remove();
                    line4status=-1;
                    line4firstindex++;
                }
            }

            /*var moveNum=Wrapper.randoms();
			      var idNum=num;
			      var y=0;
            var time=setInterval (function(){
                y+=speed;$('#target'+idNum).css({'top':y+'px', });
            	  if(y>heightjudge){
                    var shortT=setTimeout(function(){
                        $('#target' + idNum).remove();
                        clearInterval(time);
                        shortT=null;
                    },200);
                    clearInterval(time);
                }
                time=null;
            },40);*/			
        },     

        linecheck:function(){
            this.line1check();
            this.line2check();
            this.line3check();
            this.line4check();
        },

        scorecheck:function(){
            if(line1status==-1) {
                gamestatus=-1;
                line1status=0;
                this.colorprocess(1,-1);
            }
            else if(line1status==1) {
                score+=5;
                gamestatus=1;
                line1status=0;
                this.colorprocess(1,1);
                scorechangeflag=1;
            }
            else if(line1status==2) {
                score+=3;
                gamestatus=1;
                line1status=0;
                this.colorprocess(1,1);
                scorechangeflag=1;
            }
            else {
                gamestatus=0;
                this.colorprocess(1,0)
            }


            if(line2status==-1) {
                gamestatus=-1;
                line2status=0;
                this.colorprocess(2,-1);
            }
            else if(line2status==1) {
                score+=5;gamestatus=1;
                line2status=0;
                this.colorprocess(2,1);
                scorechangeflag=1;
            }
            else if(line2status==2) {
                score+=3;gamestatus=1;
                line2status=0;
                this.colorprocess(2,1);
                scorechangeflag=1;
            }
            else {
              gamestatus=0;
              this.colorprocess(2,0);
            }

            if(line3status==-1) {
                gamestatus=-1;
                line3status=0;
                this.colorprocess(3,-1);
            }
            else if(line3status==1) {
              score+=5;
              gamestatus=1;
              line3status=0;
              this.colorprocess(3,1);
              scorechangeflag=1;
            }
            else if(line3status==2) {
              score+=3;
              gamestatus=1;
              line3status=0;
              this.colorprocess(3,1);
              scorechangeflag=1;
            }
            else {
                gamestatus=0;
                this.colorprocess(3,0);
            }


            if(line4status==-1) {
                gamestatus=-1;
                line4status=0;
                this.colorprocess(4,-1);
            }
            else if(line4status==1) {
                score+=5;
                gamestatus=-1;
                line4status=0;
                this.colorprocess(4,1);
                scorechangeflag=1;
            }
            else if(line4status==2) {
                score+=3;
                gamestatus=-1;
                line4status=0;
                this.colorprocess(4,1);
                scorechangeflag=1;
            }
            else {
                gamestatus=0;
                this.colorprocess(4,0);
            }
        },


        colorprocess:function(line_num,color_status){
            if(color_status==-1){
                $('#button'+line_num).css('background-image',"url('./game_picture/miss.png')").css('opacity',0.5);
            }
            else if (color_status==1) {
                $('#button'+line_num).css('background-image',"url('./game_picture/perfect.jpg')").css('opacity',0.5);
            }

            if(line1colorstatus==color_times){
                $('#button'+1).css('background-image',"url('./game_picture/button.png')").css('opacity',0.5);
                line1colorstatus=0;
            }
            if(line2colorstatus==color_times){
                $('#button'+2).css('background-image',"url('./game_picture/button.png')").css('opacity',0.5);
                line2colorstatus=0;
            }
            if(line3colorstatus==color_times){
                $('#button'+3).css('background-image',"url('./game_picture/button.png')").css('opacity',0.5);
                line3colorstatus=0;
            }
            if(line4colorstatus==color_times){
                $('#button'+4).css('background-image',"url('./game_picture/button.png')").css('opacity',0.5);
                line4colorstatus=0;
            }

            if(color_status!=0){
    	          if(line_num==1) {
                    line1colorstatus=0;
                }
    	          else if(line_num==2) {
                    line2colorstatus=0;
                }
    	          else if(line_num==3) {
                    line3colorstatus=0;
                }
    	          else {
                    line4colorstatus=0;
                }
            }
            else{
    	          if(line_num==1) {
                    line1colorstatus++;
                }
    	          else if(line_num==2) {
                    line2colorstatus++;
                }
    	          else if(line_num==3) {
                    line3colorstatus++;
                }
    	          else {
                    line4colorstatus++;
                }
            }
        },

        scoreprocess:function(){
            if(scorechangeflag==1){
            //擦除
            //dtx.clearRect(150,60,150,50);
            //print
            //dtx.strokeText(score,150,100);
              $('#score').css('font-size',font_size+'px').text(score);
            }
            scorechangeflag=0;
            /*if(timeschangeflag==1){
            //擦除
                dtx.clearRect(150,60,150,50);
                //print
                dtx.strokeText(times,150,100);
            }
            timeschangeflag=0;*/
           /* if(timeschangeflag==1){
                $('#score').css('font-size',font_size+'px').text(times/2);
                timeschangeflag=0;
            }*/
        },

        buttoninit:function(){
            $('#button1').click(function(){
                if(line1lastindex>=line1firstindex){
                    distance=Math.abs(position[line1target[line1firstindex-1]-1]-LineLength);
	                  if(distance<=perfectdistance) {
                        line1status=1;
                        $('#target' + line1target[line1firstindex-1]).remove();
                        line1firstindex++;
                    }
                }
            });

            $('#button2').click(function(){
                if(line2lastindex>=line2firstindex){
                    distance=Math.abs(position[line2target[line2firstindex-1]-1]-LineLength);
	                  if(distance<=perfectdistance) {
                        line2status=1;
                        $('#target' + line2target[line2firstindex-1]).remove();
                        line2firstindex++;
                    }
                      else if(distance<=gooddistance) {
                        line2status=2;
                        $('#target' + line2target[line2firstindex-1]).remove();
                        line2firstindex++;
                    }                  
                }
            });

            $('#button3').click(function(){
                if(line3lastindex>=line3firstindex){
                    distance=Math.abs(position[line3target[line3firstindex-1]-1]-(LineLength+height/5));
	                  if(distance<=perfectdistance) {
                        line3status=1;
                        $('#target' + line3target[line3firstindex-1]).remove();
                        line3firstindex++;
                    }
                      else if(distance<=gooddistance) {
                        line3status=2;
                        $('#target' + line3target[line3firstindex-1]).remove();
                        line3firstindex++;
                    }
                }
            });

            $('#button4').click(function(){
                if(line4lastindex>=line4firstindex){
                    distance=Math.abs(position[line4target[line4firstindex-1]-1]-LineLength);
	                  if(distance<=perfectdistance) {
                        line4status=1;
                        $('#target' + line4target[line4firstindex-1]).remove();
                        line4firstindex++;
                    }
                      else if(distance<=gooddistance) {
                        line4status=2;
                        $('#target' + line4target[line4firstindex-1]).remove();
                        line4firstindex++;
                    }
                }
            });

            $('#pause_button').click(function(){
                pause_change_flag=1;
            });
        },

        canvasinit:function(){
            var c=document.getElementById("myCanvas1");
            var ctx=c.getContext("2d");
            ctx.font="20px Georgia";
            ctx.strokeText("祝中山大学：",0,20);
            ctx.font="40px Georgia"
            ctx.strokeText("94岁生日快乐!",30,100);
            dtx.strokeText("Your score:",10,40);
            dtx.strokeText(score,150,100);
        },

        musicinit:function(){
	          $(document).ready(function () {           
                audio= document.getElementById("audio");
	          })
        },

        pausecheck:function(){
            if(pause_change_flag){
                if(is_pause){
                    is_pause=0;
                    $('#pause_button').css('background-image',"url('./game_picture/pause.png')");
                    play_flag=1;
                }
                else {
                    is_pause=1;
                    $('#pause_button').css('background-image',"url('./game_picture/play.png')");
                    pause_flag=1;
                }
                pause_change_flag=0;
            }
        },

        //游戏运算，数据处理
        gamecheck:function(){
            //this.linecheck();
            this.scorecheck();
            this.scoreprocess();
            this.pausecheck();
        },

        init:function(){
	          //this.canvasinit();
	          this.buttoninit();
	          //this.musicinit();
            $('#score').css('font-size',font_size+'px').text(score);
            this.crack_array_init();
        },

        crack_array_init:function(){
            for(i=0;i<200;i++){
                crack_array[i]=0;
            }
            for(i=32;i<148;i+=1){
                crack_array[i]=1;
            }
            crack_array[35]=0;
            crack_array[41]=0;
            crack_array[45]=0;
            crack_array[51]=0;
            crack_array[55]=0;
            crack_array[61]=0;
            crack_array[65]=0;
            crack_array[71]=0;
            crack_array[76]=0;
            crack_array[78]=0;
            crack_array[86]=0;
            crack_array[88]=0;
            crack_array[96]=0;
            crack_array[98]=0;
            crack_array[100]=0;
            crack_array[103]=0;
            crack_array[104]=0;
            crack_array[105]=0;
            crack_array[106]=0;
            crack_array[110]=0;
            crack_array[116]=0;
            crack_array[120]=0;
            crack_array[126]=0;
            crack_array[127]=0;
            crack_array[136]=0;
            crack_array[140]=0;
            crack_array[143]=0;
            crack_array[145]=0;

        }
            
    }


    //游戏初始化
    Wrapper.init();
    //游戏进程，50ms为一个周期
    var timer=setInterval(function(){
        if(!is_pause){
            if(play_flag){
                play_flag=0;
                audio.play();
            }
            //if(times%2==0)
            //{if(flag)
            //{Wrapper.randoms();}}
            looptimes++;
            //flag=0;
            //if(looptimes%circle_looptimes==0){flag=1}
            if((looptimes*2)%circle_looptimes==0){
                times+=1;
                timeschangeflag=1;
                if(crack_array[times]){
                    Wrapper.randoms();
                }
            }
            Wrapper.move();
            Wrapper.gamecheck();
            //if(times==188){clearInterval(timer);}
            audio.addEventListener('ended', function () {  
                clearInterval(timer);
                game_out();
            }, false);
        }
        else{
            if(pause_flag){
                pause_flag=0;
                audio.pause();
            }
            Wrapper.pausecheck();
        }

    },circletimes);

}


function game_hide(){
    $('#game').hide();
}

function game_begin(){
    $('#game').show();
    game();
}

function game_out(){
    var fenshu = document.getElementById("fenshu");
    fenshu.innerHTML = score;
    setTimeout('$("#game").fadeOut(100);', 100);
    setTimeout('$("#score1").fadeIn(1000);', 100);  
}




