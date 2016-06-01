var currentbankName;
//准备信息的载体
function setInfo() {
    $("#info").css({
        "display": "block",
        "height": windows_height * 0.6,
        "width": windows_width ,
        "top": (windows_height * 0.4-160),
        "left": windows_width
    });
    arrowTop = (windows_height - $("#arrowLDiv").outerHeight() * 2) / 2;
    for (var i = 0; i < 14; i++) {
        setProduct(i);
    }
    var stepx = windows_width / (time / 0.03);
    setTimeout(function () { changePage(0, -stepx) }, 500);
}

//加入农行产品的信息
function setProduct(number) {
    //整个项目的承载体
    var detial = $("<div></div>");
    detial.attr("id", number);
    detial.addClass("detailProduction");
    // console.log("top is " + ((parseInt(number / 7) * (184 + 70)) + (arrowTop - 184) - (windows_height * 0.4 - 160)));
    detial.css({
        "top": ((parseInt(number / 7) * (184 + 70)) + (arrowTop - 184) - (windows_height * 0.4 - 160)),
        "left": ((number % 7) * 200)
    });
    //理财产品的系列名称
    var detialTitle = $("<div>安心得利如意</div>");
    detialTitle.addClass("detailTitle");
    //理财产品的名称
    var detialSmallTitle = $("<div>“农银私行·如意组合”2016年第1020期看涨黄金理财产品</div>");
    detialSmallTitle.addClass("detailTitleS");
    //理财产品的利润
    var detialBalance = $("<div>3%-5%</div>");
    detialBalance.addClass("detailBanlance");
    var end = $("<div>预期年化收益率</div>");
    end.addClass("detailTitleS");
    detialTitle.appendTo(detial);
    detialSmallTitle.appendTo(detial);
    detialBalance.appendTo(detial);
    end.appendTo(detial);
    detial.appendTo("#info");
}

//点击按钮翻页查看理财产品
function changePage(change, stepx) {
    var position = $("#info").css("left").split("px")[0] * 1.0 + stepx;
    $("#info").css({
        "left": position + "px",
    });
    change = change + stepx;
    if (Math.abs(change) >= (windows_width / 2)) {
        if (stepx > 0) {//实现逐渐变慢
            stepx = stepx / (1.1) > 1 ? stepx / (1.1) : 1;
        } else {
            stepx = stepx / (1.1) < -1 ? stepx / (1.1) : -1;
        }
    }
    //console.log("change is " + change);
    //console.log("stepx is " + stepx);
    if (Math.abs(change) >= windows_width) {
        //console.log("change is " + change);
        //console.log("windows_width is "+windows_width);
    } else if (Math.abs(change + stepx) >= windows_width) {//最后一帧保证位置
        //   console.log("last frame");
        if (stepx > 0) {
            stepx = windows_width - change;
        } else {
            stepx = (windows_width - Math.abs(change)) * (-1);
        }
        setTimeout("changePage(" + change + "," + stepx + ")", 30);
    } else {
        setTimeout("changePage(" + change + "," + stepx + ")", 30);
    }
}

//初始化产品信息列表
function showinformation(id) {
    if ($("#show").length!=0) {
        console.log("remove");
        $("#show").remove();
    } 
        console.log("build");
    var information_list = " <table id = \"show\" class=\"information_list\" cellspacing=\"0\" cellpadding=\"0\">" +
            "<tbody>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                    "<th>产品名称</th>" +
                    "<td colspan=\"3\" style=\"background-color:#fafafa;width:750px;\">“金钥匙·安心得利”2016年第2059期美元理财产品</td>" +
                "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                    "<th>产品系列</th>" +
                    "<td>安心得利</td>" +
                    "<th>币种</th>" +
                    "<td>美元</td>" +
                "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                    "<th>认购起始日期</th>" +
                    "<td style=\"background-color:#fafafa;\">2016/06/01</td>" +
                    "<th>认购结束日期</th>" +
                    "<td style=\"background-color:#fafafa;\">2016/06/07</td>" +
                "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>起息日</th>" +
                "<td>2016/06/08</td>" +
                "<th>到期日</th>" +
                "<td>2016/12/05</td>" +
                "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                    "<tr>" +
                "<th>投资期限</th>" +
                    "<td style=\"background-color:#fafafa;\">180天</td>" +
                "<th>预期年化收益率</th>" +
                    "<td style=\"background-color:#fafafa;\">1.3%</td>" +
                "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>产品开封闭类型</th>" +
                "<td>封闭</td>" +
                    "<th>销售状态</th>" +
                    "<td><span style=\"color:#000;\" id=\"SaleStatusSpan\">可售</span></td>" +
                    "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>风险等级</th>" +
                    "<td style=\"background-color:#fafafa;\">中低</td>" +
                    "<th>收益类型</th>" +
                    "<td style=\"background-color:#fafafa;\">非保本浮动收益</td>" +
                    "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>发行区域</th>" +
                    "<td><span titlle=\"全国发行\">全国发行</span></td>" +
                    "<th>起购金额</th>" +
                    "<td>" +
                    "10000"+
                    "</td>" +
                    "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
            "</tbody>" +
        "</table>";
    var list = $(information_list);
    var top = $(("#" + id)).position().top;
    console.log("top is " + top);
    var step;
    if (top < 200) {//在上半面
        $("#information").css({
            "position": "absolute",
            "left": (windows_width - $("#information").outerWidth()) / 2,
            "top": (windows_height - $("#information").outerHeight()) / 2 +windows_height,
        });
        step = -windows_height / (time / 0.03);
    } else { 
        $("#information").css({
            "position": "absolute",
            "left": (windows_width - $("#information").outerWidth()) / 2,
            "top": (-windows_height - $("#information").outerHeight()) / 2,
        });
        step = windows_height / (time / 0.03);
    }
    list.appendTo("#information");
    changeProductInfomation("#info", "#information", step, 0);
}

function changeProductInfomation(List, Detial, stepy, change) {
    var newy = $(List).css("top").split("px")[0] * 1.0 + stepy;
    $(List).css({
        "position": "absolute",
        "top": newy ,
    });
    //console.log("list top is " + newy);
    newy = $(Detial).css("top").split("px")[0] * 1.0 + stepy;
    $(Detial).css({
        "position": "absolute",
        "top": newy ,
    });
    //console.log("detial top is " + newy);
    change = change + stepy;
    if (Math.abs(change) >= (windows_height / 2)) {
        if (stepy > 0) {//实现逐渐变慢
            stepy = stepy / (1.1) > 1 ? stepy / (1.1) : 1;
        } else {
            stepy = stepy / (1.1) < -1 ? stepy / (1.1) : -1;
        }
    }
    //console.log("change is " + change);
    if (Math.abs(change) >= windows_height) {
        //console.log("change is " + change);
        //console.log("windows_width is "+windows_width);
    } else if (Math.abs(change + stepy) >= windows_height) {//最后一帧保证位置
        //   console.log("last frame");
        if (stepy > 0) {
            stepy = windows_height - change;
        } else {
            stepy = (windows_height - Math.abs(change)) * (-1);
        }
        setTimeout("changeProductInfomation(\"" + List + "\",\"" + Detial + "\"," + stepy + "," + change + ")", 30);
    } else {
        setTimeout("changeProductInfomation(\"" + List + "\",\"" + Detial + "\"," + stepy + "," + change + ")", 30);
    }
}

//显示顶部返回
function showBackArrow(id) {
    $("#arrowBDiv").css({
        "display": "block",
        "top": -70,
        "left":(windows_width - $("#arrowBDiv").outerWidth())/2
    });
    var top = $(("#"+id)).position().top;
    var url;
    if (top>200) {//列表将向下走
        url = "url(\"../image/" + currentbankName + "_arrowU.png\")";
    } else {
        url = "url(\"../image/" + currentbankName + "_arrowD.png\")";
    }
    $("#arrowB").css({
        "background-image":url
    });
    var step = 60 / (time / 0.06);
    changeBackArrow(step,0);
}

function changeArrow(step,change) {
    var left = $("#arrowLDiv").position().left + step;
    $("#arrowLDiv").css({
        "position": "absolute",
        "left":left
    });
    left = $("#arrowRDiv").position().left - step;
    $("#arrowRDiv").css({
        "left": left
    });
    change = change + step;
    //console.log("change is " + change);
    if (Math.abs(change) >= 60) {
        //console.log("change is " + change);
        //console.log("windows_width is "+windows_width);
    } else if (Math.abs(change + step) >= 60) {//最后一帧保证位置
        //   console.log("last frame");
        if (step > 0) {
            step = 60 - change;
        } else {
            step = (60 - Math.abs(change)) * (-1);
        }
        setTimeout("changeArrow(" + step + "," + change + ")", 30);
    } else {
        setTimeout("changeArrow(" + step + "," + change + ")", 30);
    }
}

function changeBackArrow(step, change) {
    var top = $("#arrowBDiv").position().top + step;
    $("#arrowBDiv").css({
        "position": "absolute",
        "top": top
    });
    change = change + step;
    //console.log("top is " + top);
    //console.log("change is " + change);
    if (Math.abs(change) >= 60) {
        //console.log("change is " + change);
        //console.log("windows_width is "+windows_width);
    } else if (Math.abs(change + step) >= 60) {//最后一帧保证位置
        //   console.log("last frame");
        if (step > 0) {
            step = 60 - change;
        } else {
            step = (60 - Math.abs(change)) * (-1);
        }
        setTimeout("changeBackArrow(" + step + "," + change + ")", 30);
    } else {
        setTimeout("changeBackArrow(" + step + "," + change + ")", 30);
    }
}