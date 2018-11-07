$(function () {
    //载入动画
    setTimeout('$("#loading_bar2").show();', 400);
    setTimeout('$("#loading_bar3").show();', 1000);
    setTimeout('$("#loading_bar4").show();', 2500);
    setTimeout('$("#loading").fadeOut(1000);', 2700);
    setTimeout('$(".title").fadeIn(1000);', 3500);
    setTimeout('$(".start_page").fadeIn(1000);', 3500);
    
    //判定学号是否输入正确
    function isStuNum(v){
        var reg=/((1[5678])\d{6})/i;
        if(reg.test(v)){
            return true;
        }else{
            return false;
        }
    };

    //判定姓名是否输入正确
    function isChinese(o){
        var reg=/^[\u4E00-\u9FA5]+$/;
        return reg.test(o);
    };

    $("#b1").click(function () {
        name=document.getElementById("name").value;
        studentnumber=document.getElementById("studentnumber").value;
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

    $("#b4").click(function () {
        setTimeout('$("#score1").fadeOut(100);', 100);
        setTimeout('$("#ranking").fadeIn(100);', 100);
        var query1 = new AV.Query('score');
        query1.greaterThan('score', 0);
        query1.limit(3);
        query1.descending('score');
        query1.find().then(function (results) {
            //拉取第一名
            var no1 = results[0];
            var name1 = document.getElementById("No1");
            var gaofen1 = document.getElementById("No1score");
            name1.innerHTML = no1.get('name');
            gaofen1.innerHTML = no1.get('score');
            //拉取第二名
            var no2 = results[1];
            var name2 = document.getElementById("No2");
            var gaofen2 = document.getElementById("No2score");
            name2.innerHTML = no2.get('name');
            gaofen2.innerHTML = no2.get('score');
            //拉取第三名
            var no3 = results[2];
            var name3 = document.getElementById("No3");
            var gaofen3 = document.getElementById("No3score");
            name3.innerHTML = no3.get('name');
            gaofen3.innerHTML = no3.get('score');
        }, function (error) {
        });
        //拉取当前玩家排名
        var query3 = new AV.Query('score');
        query3.greaterThan('score', realscore);
        query3.count().then(function (count){
            var abcde = count + 1;
            var ownranking1 = document.getElementById("ownranking");
            ownranking1.innerHTML = abcde;
        },function (error){
        });

    });   

    $("#b5").click(function () {
        setTimeout('$("#ranking").fadeOut(100);', 100);
        setTimeout('$("#score1").fadeIn(100);', 100);
    });

    $("#b12").click(function () {
        setTimeout('$("#index").fadeOut(100);', 100);
        setTimeout('$("#ranking").fadeIn(100);', 100);
        var query1 = new AV.Query('score');
        query1.greaterThan('score', 0);
        query1.limit(3);
        query1.descending('score');
        query1.find().then(function (results) {
            var no1 = results[0];
            var name1 = document.getElementById("No1")
            name1.innerHTML = no1.get('name');
            var no2 = results[1];
            var name2 = document.getElementById("No2")
            name2.innerHTML = no2.get('name');
            var no3 = results[2];
            var name3 = document.getElementById("No3")
            name3.innerHTML = no3.get('name');
        }, function (error) {
        });

        /*var name=document.getElementById("name").value;
        var studentnumber=document.getElementById("studentnumber").value;
        var ckb;
        var query1 = new AV.Query('score');
        query1.equalTo('studentnumber',studentnumber);
        query1.count().then(function (count) {
            if (count > 0) {
                query1.find().then(function (results) {
                    no1 = results[0];
                    no1id = no1.id;
                    var scr = no1.get('score');
                    if (scr < score){
                        var todo = AV.Object.createWithoutData('score', no1id);
                        todo.set('score', score);
                        todo.save();
                    };
                }, function (error) {
                });
            }
            else {
                var Scores = AV.Object.extend("score");
                var formObject = new Scores();
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
            }
        }, function (error) {
        });

        /*var no1;
        var no1id;
        query2 = new AV.Query('score');
        query2.greaterThan('score', 0);
        query2.limit(3);
        query2.descending('score');
        query2.find().then(function (results) {
            no1 = results[0];
            no1id = no1.id;
            var todo = AV.Object.createWithoutData('score', no1id);
            todo.set('score', 100);
            todo.save();
        }, function (error) {
            alert('abc');
        });
        var abcid = '5be2d7b7ee920a006634f88f';*/

    });   
});



