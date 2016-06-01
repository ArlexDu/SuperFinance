//准备信息的载体
function setInfo() {
    $("#info").css({
        "display": "block",
        "height": windows_height * 0.6,
        "width": windows_width * 2,
        "bottom": 160,
        "left": windows_width
    });
    arrowTop = $("#arrowR").position().top;
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

//展示信心列表
function showinformation() {
    var information_list = " <table class=\"information_list\" cellspacing=\"0\" cellpadding=\"0\">" +
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
                "</tr" +
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

                    "</td>" +
                    "</tr>" +
                "<tr><td colspan=\"4\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
            "</tbody>" +
        "</table>";
    var list = $(information_list);
    list.appendTo("#information");
}