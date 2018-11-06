$(function () {

    setTimeout('$("#loading_bar2").show();', 400);
    setTimeout('$("#loading_bar3").show();', 1000);
    setTimeout('$("#loading_bar4").show();', 2500);
    setTimeout('$("#loading").fadeOut(1000);', 2700);
    setTimeout('$(".title").fadeIn(1000);', 3500);
    setTimeout('$(".start_page").fadeIn(1000);', 3500);

    function isStuNum(v){
        var reg=/((1[5678])\d{6})/i;
        if(reg.test(v)){
            return true;
        }else{
            return false;
        }
    };

    function isChinese(o){
        var reg=/^[\u4E00-\u9FA5]+$/;
        return reg.test(o);
    };

    $("#b1").click(function () {
        var name=document.getElementById("name").value;
        var studentnumber=document.getElementById("studentnumber").value;
        if (!isStuNum(studentnumber)){
            alert("请输入正确的学号！");
        }
        else if (!isChinese(name)){
            alert("请输入正确的姓名！");
        }
        else{
            setTimeout('$("#index").fadeOut(100);', 100);
            setTimeout('$("#shuoming").fadeIn(1000);', 100); 
            var audio= document.getElementById("audio");
            audio.play();   
            setTimeout('audio.pause();', 1);        
        };              
    });

    $("#b2").click(function () {
        setTimeout('$("#shuoming").fadeOut(1);', 1); 
        setTimeout('$("#game").fadeIn(1);', 1); 
        var audio= document.getElementById("audio");
        audio.play();
        setTimeout('game();', 3);         
    });

    $("#b3").click(function () {
                    setTimeout('$("#index").fadeOut(1);', 1);
            setTimeout('$("#game").fadeIn(1);', 1);   
        var audio= document.getElementById("audio");
        audio.play();
        setTimeout('game();', 3);           
    });

    $("#b12").click(function () {



        var name=document.getElementById("name").value;
        var studentnumber=document.getElementById("studentnumber").value;
        var Scores = AV.Object.extend("score");
        var formObject = new Scores();
        formObject.save({
            score:sc,
            check:1,
            name:name,
            studentnumber:studentnumber,
        }, {
            success: function(object) {
                alert("success！");
            }
        });    
        var query = new AV.Query('score');
        query.equalTo('check', 1);
        query.count().then(function (count) {
            var StatA = document.getElementById("paiming")
            StatA.innerHTML = count;
        }, function (error) {
        });
    });
});



