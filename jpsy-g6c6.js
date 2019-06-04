var students = ["贲忻悦","陈文珺","陈映佳","董钰","黄怿依","金悦恬",
"李昕奕","梁思涵","刘瑞嘉","马一心","马子登","钱栩安",
"张楚儿","张书涵","张艺嘉","赵佳淇","钟嫄","周雨萱",
"朱薏全","曾琦辰","陈羿铭","桂冠骐","姜昱昊","陆正好",
"鹿皓宇","罗天佑","孟祥泽","庞士俊","钱程","任思宇",
"邵宸之","申少寒","沈童","沈怡君","汪兴华","吴泽辰",
"夏锦桢","徐捷华","袁逸嘉","张景云","张欣平","张阳",
"张震宇","周哲愚"]

let maxVoteCnt = 10;

$(function() {
    $("#btnStat").click(function(){
        $.prompt('输入班主任密码?', function (value) {
            if (value!="991015") {
                $.toast("密码错误哦!" );
                return;
            } else {
                calc();
            }
        });
    });

    $("#btnReset").click(function(){
        $.confirm('确定要重新填写吗?', function () {
            resetUI();
        });
    });

    $("#btnSubmit").click(function(){
        $.confirm('提交后不能修改，确定继续吗?', function () {
            submit();
        });
    });

    $("#btnRevote").click(function(){
        $.prompt('输入班主任密码?', function (value) {
            if (value!="991015") {
                $.toast("密码错误哦!" );
                return;
            } else {
                revote();
            }
        });
    });

    showStudents();
});  

function submit(){
    var voted = $("input[name='chkStudent']:checked");
    if (voted.size() < maxVoteCnt) {
        $.toast("未选足" + maxVoteCnt + "位同学" );
        return;
    }
    if (voted.size() > maxVoteCnt) {
        $.toast("不能选择超过" + maxVoteCnt + "位" );
        return;
    }

    var strCached = window.localStorage.getItem("votedList");
    if (strCached==null || strCached==""){        
        var mapVoted = new Map();
        for(var i=0;i<students.length;i++){
            mapVoted.set(students[i],0);
        }
        var strToCache = JSON.stringify(strMapToObj(mapVoted));
        window.localStorage.setItem("votedList",strToCache);
    } 
    
    strCached = window.localStorage.getItem("votedList");
    var mapVoted = JSON.parse(strCached);
    voted.each(function(){
        var rec = mapVoted[$(this).val()];
        if (rec!=null) {
            mapVoted[$(this).val()] = parseInt(rec) + 1;
        } else {
            mapVoted[$(this).val()] = 1;
        }
    })
    var strToCache = JSON.stringify(mapVoted);
    window.localStorage.setItem("votedList",strToCache);

    $.toast("投票成功");
    resetUI();
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

function resetUI(){
    $("input[name='chkStudent']").each(function(){
        $(this).prop('checked',false)
    }); 
}

function revote(){
    window.localStorage.removeItem("votedList");
}

function showStudents(){
    var html = "";

    for(var i=0;i<15;i++){
        html +="<li>";
        html +="<div class=\"item-inner\">";
        for (var j=0;j < 3;j++){
            html += "<div class=\"item-input\">";
            html += "<label class=\"label-switch\">";
            html += "    <input type=\"checkbox\" name=\"chkStudent\" value=\"" + students[i*3+j] + "\">";
            html += "    <div class=\"checkbox\"></div>";
            html += "</label>";
            html += "</div>";
            html += "<div class=\"item-title label\">" + students[i*3+j] + "</div>";
        }
        html +="</div>";
        html +="</li>";
    }
    $("#ulStudents").html(html);
}

function calc(){
    var arrResult = new Array();

    var strCached = window.localStorage.getItem("votedList");
    if (strCached==null || strCached==""){
        var mapVoted = new Map();
        for(var i=0;i<students.length;i++){
            mapVoted.set(students[i],0);
        }
        var strToCache = JSON.stringify(strMapToObj(mapVoted));
        window.localStorage.setItem("votedList",strToCache);
    } 

    strCached = window.localStorage.getItem("votedList");
    var mapVoted = JSON.parse(strCached);
    
    for(var i=0;i<students.length;i++){
        var rec = mapVoted[students[i]];
        if (rec!=null) {
            arrResult[students[i]] = rec;
        } 
    }

    show(arrResult);
}

function show(arrResult){
    var html="<table class='result-table'><tr><th>学生</th><th>结果</th><th>学生</th><th>结果</th><th>学生</th><th>结果</th></tr>";
    for (var i=1;i<=students.length;i++){
        if (i % 3 == 1) html+="<tr>";
        html+="<td>" + students[i-1] + "</td>";
        
        var tdstyle="";
        html+="<td style='" + tdstyle + "'>" + arrResult[students[i-1]] + "</td>";
        if (i % 3 == 0) html+="</tr>";
    }    
    html+="</table>"

    $("#divResult").html(html);
    $.popup('.popup-result');
}

function isInterger(input)
{
    var r = /^\+?[1-9][0-9]*$/;
    if (r.test(input)) 
        return true;
    else
        return false;
}
