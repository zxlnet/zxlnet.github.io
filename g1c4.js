var students = ["张钧溪","姚宸凯","陈涵阳","李易谦","史翔宇","李易凡",
"冯研几","徐淳霆","姜峻豪","王嘉铭","毛信烨","张毅腾",
"成易鸿","张鸣谦","奚逸尘","陶羿霖","张承扬","唐凯文",
"王涵麟","周奕萌","姜和","赖谷畋","朱思远","李浚睿",
"翟璟铭","屈昊然","金晓涵","张瑷荟","张熠格","张喆然",
"李薏如","纪麟","张雨鑫","胡敬昀","张悠游","胡敬婷",
"卢陈玥","苏乐昕","文一伊","许馨文","陈殷蕊","曹紫议",
"韩子墨","余佳苗","唐悠然","徐汪语","林婉清","张恬钥"]

$(function() {
    $("#btnStat").click(function(){
        calc();
    });

    $("#btnReset").click(function(){
        resetUI();
    });
});  

function resetUI(){
    $.confirm('确定要重新填写吗?', function () {
        $("input[id]").each(function () { 
            $(this).val("");
        });
    });
}

function calc(){
    var arrResult = new Array();

    for(var i=0;i<students.length;i++){
        arrResult.push(5);
    }

    if (!checkBeforeCalc()) return;
    $("input[id]").each(function () { 
        var section = $(this).val();
        if ($.trim(section)=="") {
            return true;
        } else {
            var arrSplit = section.split(",");
            jq.unique(arrSplit.sort());  

            for (var j=0;j<arrSplit.length;j++){
                arrResult[arrSplit[j]-1]--;
                if (arrResult[arrSplit[j]-1]<0)
                    arrResult[arrSplit[j]-1]=0;
            }
        }
    }); 
    
    show(arrResult);
}

function checkBeforeCalc(){
    var errCnt=0;
    $("input[id]").each(function () { 
        var section = $(this).val();
        section=$.trim(section);
        
        var reg = new RegExp("，","g");//g,表示全部替换。
        section = section.replace(reg,",");
        $(this).val(section);

        if (section=="") {
            return true;
        } else {
            var arrSplit = section.split(",");
            if (!checkInput(arrSplit)) {
                jq(this).css({"background-color":"red"});  
                errCnt++;
            } else {
                jq(this).css({"background-color":"lightgreen"});  
            }
        }
    }); 

    if (errCnt>0) {
        $.toast("共有" + errCnt + "处输入错误，已标红色" );
        return false;
    }

    return true;
}

function checkInput(arrSplit){
    for (var i=0;i<arrSplit.length;i++){
        var b = isInterger(arrSplit[i]);
        if (!b)
            return false;

        if (arrSplit[i]<=0 || arrSplit[i]>(students.length+1))
            return false;
    }

    return true;
}

function show(arrResult){
    var html="<table class='result-table'><tr><th>学生</th><th>结果</th><th>学生</th><th>结果</th><th>学生</th><th>结果</th></tr>";
    for (var i=1;i<=students.length;i++){
        if (i % 3 == 1) html+="<tr>";
        html+="<td>" + (i) + ":" + students[i-1] + "</td>";
        
        var tdstyle="";
        if (arrResult[i-1]==5)
            tdstyle="color:green;"
        else
            tdstyle="color:red;"
        html+="<td style='" + tdstyle + "'>" + arrResult[i-1] + "</td>";
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
