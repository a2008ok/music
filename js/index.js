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
            setTimeout('$("#game").fadeIn(1000);', 100);
            setTimeout('$("#shuoming").fadeIn(1000);', 100);
            var audio= document.getElementById("audio");
            audio.play();
            setTimeout('audio.pause();', 3);         
        };              
    });

    $("#b2").click(function () {
        setTimeout('$("#shuoming").fadeOut(1);', 1); 
        var audio= document.getElementById("audio");
        audio.play();
        setTimeout('game();', 1);   
    });

    $("#b3").click(function () {
        window.location.reload();          
    });

    $("#b12").click(function () {



        var name=document.getElementById("name").value;
        var studentnumber=document.getElementById("studentnumber").value;
        var Scores = AV.Object.extend("score");
        var formObject = new Scores();
        var abc;
        formObject.save({
            check:1,
            name:name,
            studentnumber:studentnumber,
            score:score,
        }, {
            success: function(object) {
                alert("success！");
            }
        });    
        var query = new AV.Query('score');
        query.equalTo('studentnumber', studentnumber);
        query.count().then(function (count) { 
            abc = count;
        }, function (error) {
        });
        if(abc=1){
            query.equalTo('studentnumber', studentnumber);
            query.find().then(function (results) { 
                abc = count;
            }, function (error) {
            });
        }
    });
});



