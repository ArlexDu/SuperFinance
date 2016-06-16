var currentbankName;
var page;
var num = 0;
var baseurl = "/SuperFinance";
var banktoid = { "icbc": 1, "abc": 2, "ccb": 3, "bocom": 4 };
var mdata;
var wholepages;//记录页面的总数
var currentpage;//当前页
//获得服务器的数据
function GetList(ajaxid) {
    $.ajax({
        type:"GET",
        url: baseurl+"/bank/check_bank/"+ajaxid+"/",
        dataType: "json",
        async:false,
        success: function (num) {
        	 wholepages = Math.ceil(num.count*1.0/(windows_width/200*2));
        	 $.ajax({
        	        type:"GET",
        	        url: baseurl+"/bank/get_records/"+ajaxid+"/1/"+num.count+"/",
        	        dataType: "json",
        	        async:false,
        	        success: function (data) {
        	            setInfo(data,num.count);
        	            if(wholepages > 1){
        	            	  setTimeout(function () { 
              	            	var div ="#arrowRDiv";
              	            	showSingleArrow(div); 
              	            	}, 300);
        	            }
        	        },
        	        error: function () {
        	            console.log("failed");
        	        }
        	    });

        },
        error: function () {
            console.log("failed");
        }
    });
}

//获得具体的产品信息
function GetDetail(id,ID) {
    $.ajax({
        type:"GET",
        url: baseurl+"/bank/get_detail/"+ID+"/",
        dataType: "json",
        async:false,
        success: function (data) {
        	var info = data;
        	showinformation(id, info.product_name, info.currenices, info.interest_rate,
        			info.start_amount, info.duration, info.type, info.url);
            showBackArrow(id);
            var step = 60 / (time / 0.06);
            changeArrow(-step,0);
        },
        error: function () {
            console.log("failed");
        }
    });
}

function GetPlan(url) {
    $.ajax({
        type:"GET",
        url: baseurl+url,
        dataType: "json",
        async:false,
        success: function (data) {
        	    setPlanInfo(data);
	            if(wholepages > 1){
	            	  setTimeout(function () { 
   	            	var div ="#arrowRDiv";
   	            	showSingleArrow(div); 
   	            	}, 300);
	            }
        },
        error: function () {
            console.log("failed");
        }
    });
}

//准备信息的载体
function setInfo(data,number) {
    $("#info").css({
        "display": "block",
        "height": windows_height * 0.6,
        "width": windows_width ,
        "top": (windows_height * 0.4-160),
        "left": windows_width
    });
    arrowTop = (windows_height - $("#arrowLDiv").outerHeight() * 2) / 2;
    //需要获得当前银行的总的产品数量
//    console.log("data is "+data[0]);
    for (var i = 0; i < number; i++) {
        setProduct(i, data[i].product_name,data[i].ID,data[i].rate);
    }
    var stepx = windows_width / (time / 0.03);
    setTimeout(function () { changePage(0, -stepx) }, 500);
    productPage = true;
    currentpage = 1;
    num = number;
}

//删除前一个银行的信息
function removeProduction(){
    for(var i= 0;i<num;i++){
        $(("#" + i)).remove();
    //    console.log("remove #"+i);
    }
}

//加入农行产品的信息
function setProduct(number,Title,ID,Rate) {
    //整个项目的承载体
    var detial = $("<div></div>");
    detial.attr("id", number);
    detial.addClass("detailProduction");
    // console.log("top is " + ((parseInt(number / 7) * (184 + 70)) + (arrowTop - 184) - (windows_height * 0.4 - 160)));
    detial.css({
        "top": ((parseInt(number % 2) * (184 + 70)) + (arrowTop - 184) - (windows_height * 0.4 - 160)),
        "left": (parseInt(number / 2) * 200)
    });
    //理财产品的名称
    if(Title.length>10){
    	Title = Title.substring(0,9)+"...";
    }
    var detialTitle = $("<div>"+Title+"</div>");
    detialTitle.addClass("detailTitle");
    //理财产品的ID
    var detialSmallTitle = $("<div>"+ID+"</div>");
    detialSmallTitle.addClass("detailTitleS");
    detialSmallTitle.attr("id", "ID");
    //理财产品的利润
    var detialBalance = $("<div>"+Rate+"</div>");
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
function showinformation(id, Title, Currency, Rate, Startamount,Duration,Type,Url) {
    if ($("#show").length!=0) {
//        console.log("remove");
        $("#show").remove();
    } 
    //    console.log("title is "+Title);
    var information_list = " <table id = \"show\" class=\"information_list\" cellspacing=\"0\" cellpadding=\"0\">" +
            "<tbody>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                    "<th>产品名称</th>" +
                    "<td style=\"background-color:#fafafa;\">"+Title+"</td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                    "<th>币种</th>" +
                    "<td>"+Currency+"</td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                    "<th>收益率</th>" +
                    "<td style=\"background-color:#fafafa;\">"+Rate+"</td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>起投金额</th>" +
                "<td>"+Startamount+"</td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>理财周期</th>" +
                    "<td style=\"background-color:#fafafa;\">"+Duration+"</td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>是否保本</th>" +
                "<td>"+Type+"</td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
                "<tr>" +
                "<th>购买链接</th>" +
                    "<td><a href=\""+Url+"\" target=\"_blank\">点击购买</a></td>" +
                "</tr>" +
                "<tr><td colspan=\"2\" style=\"height:8px; background-color:#fff;\"></td></tr>" +
            "</tbody>" +
        "</table>";
    var list = $(information_list);
    var top = $(("#" + id)).position().top;
  //  console.log("top is " + top);
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
        url = "url(\"image/" + currentbankName + "_arrowU.png\")";
    } else {
        url = "url(\"image/" + currentbankName + "_arrowD.png\")";
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

function changeSingleArrow(div,step,change) {
    var left = $(div).position().left + step;
    $(div).css({
        "position": "absolute",
        "left":left
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
        setTimeout("changeSingleArrow(\""+div+"\"," + step + "," + change + ")", 30);
    } else {
        setTimeout("changeSingleArrow(\""+div+"\"," + step + "," + change + ")", 30);
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

//单独显示左右切换箭头
function showSingleArrow(div){
	var step;
	if(div == "#arrowRDiv"){
	    $("#arrowRDiv").css({
	        "display":"block",
	        "top": (windows_height - $("#arrowRDiv").outerHeight() * 2) / 2,
	        "left": windows_width 
	    });
	    step = -60 / (time / 0.03);
	}

	if(div =="#arrowLDiv"){
	    $("#arrowLDiv").css({
	        "display": "block",
	        "top": (windows_height - $("#arrowLDiv").outerHeight() * 2) / 2,
	        "left": -70
	    });
	    step = 60 / (time / 0.03);
	}
    changeSingleArrow(div,step, 0);
}

//放置填写信息的dialog
function setdialogbackground() {
    var top = 100;
    var opacity = 0.5;
    var overlay = $("<div id='lean_overlay'></div>");
    $("body").append(overlay);
    $("#lean_overlay").css({
        "display": "block",
        "opacity": 0
    });
    $("#lean_overlay").fadeTo(200, opacity);
}

function removedialog(dialog) {
    $("#lean_overlay").fadeTo(200, 0, function () {
        $("#lean_overlay").remove();
    });
    dialog.remove();
}
function setdialog() {
    var father;
    var h1;
    var color;
    var animation;
    father = "body";
    h1 = "请填写理财信息";
    color = "blue";
    animation = "scaledialog";
    var dialog = $("<div></div>");
    dialog.addClass(animation);
    dialog.appendTo(father);
    var width = windows_width/5;
    var top = ($(father).height() - width) / 2;
    var left = ($(father).width() - width) / 2;
    dialog.css({
        "position": "absolute",
        "top": top,
        "left": left,
        "height":width,
        "width": width,
    });
    //标题
    var title = $("<h2 style=\"width:100%\">"+h1+"</h2>");
    title.appendTo(dialog);
    $("<label style=\"width:100%\">银行</label>").appendTo(dialog);
    //输入框
    var bank = $("<select id=\"selectone\" data-placeholder=\"选择银行\" multiple class=\"chosen-select\">" +
    		"<option></option>" +
    		"<option value=\"1\">工商银行</option>" +
    		"<option value=\"2\">农业银行</option>" +
    		"<option value=\"3\">建设银行</option>" +
    		"<option value=\"4\">交通银行</option>" +
    		"</select>");
    bank.css({
        "margin-top": 10,
        "width": "100%",
        "width": width
    });
    bank.appendTo(dialog);
    bank.chosen();
    $("<label style=\"width:100%\">金额</label>").appendTo(dialog);
    $("<input id =\"money\" style=\"width:100%\"></input>").appendTo(dialog);
    $("<label style=\"width:100%\">期限(天)</label>").appendTo(dialog);
    $("<input id =\"day\" style=\"width:100%\"></input>").appendTo(dialog);
    $("<label style=\"width:100%\">币种</label>").appendTo(dialog);
    var currency = $("<select id=\"selecttwo\" data-placeholder=\"币种\" class=\"chosen-select\">" +
    		"<option></option>" +
    		"<option >人民币</option>" +
    		"<option >美元</option>" +
    		"</select>");
    currency.css({
        "margin-top": 10,
        "width": "100%",
        "width": width
    });
    currency.appendTo(dialog);
    currency.chosen();
    //按钮
    var button  = $("<div>Done</div>");
    button.addClass("button");
    button.addClass(color);
    button.css({
        "margin-top":"5px"
    });
    button.appendTo(dialog);
    button.click(function(){
        if (detial) {//是否还是主页状态
            var step = 60 / (time / 0.06);
            changeArrow(-step, 0);
            if (productPage || planPage) {//银行产品界面之间的转换
                if ($("#show").length != 0) {
                    //        console.log("remove");
                    $("#show").remove();
                }
                removeProduction();
                if($("#benefit").length!=0){
                	$("#benefit").attr("id","oldbenefit");
                	$("#oldbenefit").addClass("benefit-moveout").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
                    	benefitdiv.off("webkitTransitionEnd otransitionend transitionend");
                    	benefitdiv.removeClass("benefit-moveout");
                    	$("#oldbenefit").remove();
                    });
                }
            }else {//银行信息界面到产品界面的转换
                bankToproduct();
            }
            getplandata();
        } else {
            moveOtherBank("ALL");
            changestatus();
            getplandata();
        }
        removedialog(dialog);
    });
}

function getplandata(){
	planPage = true;
	var selectbanks = $("#selectone").val();
	var money = $("#money").val(); 
	var day = $("#day").val();
	var currency = $("#selecttwo option:selected").text();
	var url ="/bank/get_plan/[";
	for(var i = 0;i<selectbanks.length;i++){
		url =url+selectbanks[i]+","
	}
	url = url.substring(0,url.length-1)+"]/"+money+"/"+day+"/"+currency+"/";
//	console.log(url);
	GetPlan(url);
//	var data = {
//		    "plan_details":[
//		                    {
//		                        "bank_name":"中国农业银行",
//		                        "ID":"ABC123",
//		                        "day":"50",
//		                        "url":"http://xxxx",
//		                        "product_name":"xxxx"
//		                    },
//		                    {
//		                        "bank_name":"中国建设银行",
//		                        "ID":"CCB123",
//		                        "day":"50",
//		                        "url":"http://xxxx",
//		                        "product_name":"xxxx"
//		                    }
//		                ],
//		                "income":5000.0
//		            }
//	setPlanInfo(data);
//    if(wholepages > 1){
//    	  setTimeout(function () { 
//       	var div ="#arrowRDiv";
//       	showSingleArrow(div); 
//       	}, 300);
//    }
}   

//准备信息的载体
function setPlanInfo(data) {
	var benefit = data.income;
	var products = data.plan_details;
    $("#info").css({
        "display": "block",
        "height": windows_height * 0.6,
        "width": windows_width ,
        "top": (windows_height * 0.4-160),
        "left": windows_width
    });
    var benefitdiv = $("<div></div>");
    benefitdiv.attr("id","benefit");
    benefitdiv.addClass("benefit")
    var width = benefitdiv.width();
    var left = (windows_width-width)/2;
    benefitdiv.css({
    	"position":"absolute",
    	"left":left,
    	"top":-20
    });
    benefitdiv.addClass("benefit-movein").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
    	benefitdiv.off("webkitTransitionEnd otransitionend transitionend");
    	benefitdiv.removeClass("benefit-movein");
    });
    benefitdiv.appendTo("body");
    var title = $("<div>可获利</div>");
    title.css({
    	"position":"absolute",
    	"top":60,
        "left":0,
        "width":"100%",
        "font-family": "微软雅黑",
        "line-height": "20px",
        "font-size": "16px",
        "text-align":"left"
    });
    title.appendTo(benefitdiv);
    var content = $("<div>"+benefit+"元</div>");
    content.css({
    	"position":"absolute",
    	"top":80,
        "left":0,
        "width":"100%",
        "font-family": "微软雅黑",
        "line-height": "20px",
        "font-size": "16px",
        "color":"#ff0000",
        "text-align":"right"
    });
    content.appendTo(benefitdiv);
    arrowTop = (windows_height - $("#arrowLDiv").outerHeight() * 2) / 2;
    //需要获得当前银行的总的产品数量
//    console.log("data is "+data[0]);
    for (var i = 0; i < products.length; i++) {
        setPlanProduct(i,products[i].bank_name,products[i].product_name,products[i].day);
    }
    var stepx = windows_width / (time / 0.03);
    setTimeout(function () { changePage(0, -stepx) }, 500);
    planPage = true;
    currentpage = 1;
    num = products.length;
}

//加入产品的信息
function setPlanProduct(number,bank_name,product_name,day,url) {
    //整个项目的承载体
    var detial = $("<div></div>");
    detial.attr("id", number);
    detial.addClass("detailProduction");
    // console.log("top is " + ((parseInt(number / 7) * (184 + 70)) + (arrowTop - 184) - (windows_height * 0.4 - 160)));
    detial.css({
        "top": ((parseInt(number % 2) * (184 + 70)) + (arrowTop - 184) - (windows_height * 0.4 - 160)),
        "left": (parseInt(number / 2) * 200)
    });
    //理财产品的银行
    if(product_name.length>10){
    	product_name = product_name.substring(0,9)+"...";
    }
    var bankname = $("<div>"+bank_name+"</div>");
    bankname.addClass("detailTitle");
    //理财产品的名字
    var product = $("<div>"+product_name+"</div>");
    product.addClass("detailTitleS");
    //理财产品的天数
    var day = $("<div>"+day+"天</div>");
    day.addClass("detailBanlance");
    day.css({
    	"color":"#0119fd",
        "font-size":"18px"
    });
    var url = $("<div><a href=\""+url+"\" target=\"_blank\">查看详情</a></td></div>");
    url.addClass("detailTitleS");
    bankname.appendTo(detial);
    product.appendTo(detial);
    day.appendTo(detial);
    url.appendTo(detial);
    detial.appendTo("#info");
}

