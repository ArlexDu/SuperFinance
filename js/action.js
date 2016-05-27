var rotation ;
var move;//点击菜单下降的距离
var time = 0.6;//设置动画移动时间
var detial = false;//第一次点击要下落按钮区域
var radius_change = 5;//每一帧半径的变化
var icon_radius = 40; //每一帧图标大小的变化
var icon_stop = false;//过渡按钮组旋转动画停止
var banks = ["#abc_bank", "#boc_bank", "#ccb_bank", "#icbc_bank"];
$(function () {
    $(".icons").click(function () {
        if(detial){

        } else {
            changestatus();
        }
    });
    $("#logo").click(function () {
        if (detial) {
            window.location = "http://localhost:62754/";
            detial = false;
        }
    })
    $("#abc_bank").click(function () {
        if (!detial) {
            getBankDetialInfo("#abc_bank");
        }
    });

    $("#boc_bank").click(function () {
        if (!detial) {
            getBankDetialInfo("#boc_bank");
        }
    });

    $("#ccb_bank").click(function () {
        if (!detial) {
            getBankDetialInfo("#ccb_bank");
        }
    });

    $("#icbc_bank").click(function () {
        if (!detial) {
            getBankDetialInfo("#icbc_bank");
        }
    });

    $("#goto_abc").click(function () {
        window.open("http://www.abchina.com/cn/");
    });

    $("#goto_boc").click(function () {
        window.open("http://www.boc.cn/");
    });

    $("#goto_ccb").click(function () {
        window.open("http://www.ccb.com/cn/home/indexv3.html");
    });

    $("#goto_icbc").click(function () {
        window.open("http://www.icbc.com.cn/icbc/");
    });
});


function changestatus() {
    //按钮区域平移下降
    detial = true;
    changey = (windows_height - 100 - ($("#inner").css("top").split("px")[0]) * 1.0) / (time / 0.03);
    changeypostion();
    changeicons();
}
//改变按钮组的位置
function changeypostion() {
    //目标减到环形圆球的半径是80 之前是440所以每一帧变化是16 半径每帧变化是8
    var newwidth = ($("#bank").css("width").split("px")[0]) * 1.0 - radius_change*2;
    var newy = $("#bank").position().top + changey + radius_change;
    var newx = ($("#bank").css("left").split("px")[0]) * 1.0 + radius_change;
    if (!icon_stop) {
        radius = radius - radius_change;
        icon_radius = icon_radius - 1;
        //console.log("radius is " + radius);
        //console.log("width is " + newwidth);
        $("#bank").css({
            "top": newy + "px",
            "left": newx + "px",
            "width": newwidth + "px",
            "height": newwidth + "px"
        });
        iconSize(abc);
        iconSize(boc);
        iconSize(ccb);
        iconSize(icbc);
    }
    newy = ($("#inner").css("top").split("px")[0]) * 1.0 + changey;
    newx = ($("#inner").css("left").split("px")[0]) * 1.0 + 3;
    newwidth = ($("#inner").css("width").split("px")[0]) * 1.0 -6;
    $("#inner").css({
        "top": newy + "px",
        "left":newx + "px",
        "width": newwidth + "px",
        "height":newwidth + "px"
    });
    newy = ($("#logo").css("top").split("px")[0]) * 1.0 + changey - 1.5;
    newx = ($("#logo").css("left").split("px")[0]) * 1.0 + 1.5;
    newwidth = ($("#logo").css("width").split("px")[0]) * 1.0 - 3;
    $("#logo").css({
        "top": newy + "px",
        "left": newx + "px",
        "width": newwidth + "px",
        "height": newwidth + "px"
    });
    //console.log("newy is "+newy);
    if (newy < (windows_height - 80)) {
        setTimeout(changeypostion, 30);
    }
}
//改变银行图标的大小
function iconSize(id) {
    var newwidth = ($(id).css("width").split("px")[0]) * 1.0 - 2;
    $(id).css({
        "width": newwidth + "px",
        "height": newwidth + "px"
    });
}
//改变按钮组内部银行图标的圆周运动
function changeicons() {
    // radius is 220
  
    //银行图片的旋转
    var angles = targetangle();
    //abc的位置变化
    var abc_step = (angles[0] - 180) / (time / 0.03);
    changeIcon(0, angles[0],180,abc_step,"abc");
    //icbc的位置变化
    var icbc_step = (angles[1] - 90) / (time / 0.03);
    changeIcon(0, angles[1], 90, icbc_step, "icbc");
    //boc的位置变化
    var boc_step = (angles[2] - 0) / (time / 0.03);
    changeIcon(0, angles[2], 0, boc_step, "boc");
    //ccb的位置变化
    var ccb_step = (angles[3] + 90) / (time / 0.03);
    //console.log("target ccb is " + angles[3]);
    //console.log("change ccb is " + abc_step);
    changeIcon(0, angles[3], -90, ccb_step, "ccb");
}
//改变银行图标的位置
function changeIcon(change,target,origin,step,name) {
    change = change + step;
    if (change > (target - origin)) {//处理最后一帧的位置
        var currentx = radius + Math.cos(degree2radians(target-origin)) * Math.cos(degree2radians(origin)) * radius - Math.sin(degree2radians(target-origin)) * Math.sin(degree2radians(origin)) * radius - icon_radius;
        var currenty = radius + Math.sin(degree2radians(origin)) * Math.cos(degree2radians(target - origin)) * radius + Math.cos(degree2radians(origin)) * Math.sin(degree2radians(target - origin)) * radius - icon_radius;
        var execute = name + ".css({\"position\": \"absolute\", \"left\": " + currentx + ", \"top\": " + currenty + " });";
   //     console.log(name + "stop radius is " + radius + " icon_radius is " + icon_radius);
        icon_stop = true;
        eval(execute);
    } else {
        var currentx = radius + Math.cos(degree2radians(change)) * Math.cos(degree2radians(origin)) * radius - Math.sin(degree2radians(change)) * Math.sin(degree2radians(origin)) * radius - icon_radius;
        var currenty = radius + Math.sin(degree2radians(origin)) * Math.cos(degree2radians(change)) * radius + Math.cos(degree2radians(origin)) * Math.sin(degree2radians(change)) * radius - icon_radius;
        var execute = name + ".css({\"position\": \"absolute\", \"left\": " + currentx + ", \"top\": " + currenty + " });";
        // console.log(execute);
        eval(execute);
  //     console.log("changeIcon(" + change + "," + target + "," + origin + "," + step + ", \"" + name + "\")");
       setTimeout("changeIcon("+change+","+target+","+origin+","+step+",\""+name+"\")", 30);
    }
}
//极端银行图标的目标角度
function targetangle() {
    var abc_angle = parseInt(radians2degree(Math.atan(-40 / radius))) + 360;
 //   console.log("angle is " + parseInt(radians2degree(Math.atan(-40 / radius))));
    var icbc_angle = 315;
    var boc_angle = 225;
    var ccb_angle = 180 - parseInt(radians2degree(Math.atan(-40 / radius)));
    return [abc_angle, icbc_angle,boc_angle,ccb_angle];
}

//获取银行的介绍信息
function getBankDetialInfo(id) {
    var bank_height = $(id).css("height").split("px")[0] * 1.0;
    var bank_width = $(id).css("width").split("px")[0] * 1.0;
    var bankx = $(id).css("left").split("px")[0] * 1.0;
    var banky = $(id).css("top").split("px")[0] * 1.0;
    var targety = (windows_height - bank_height * 1.5) / 2;
    var targetx;
    var isRight;//判断银行图片的位置
    if (bankx < windows_width / 2) {//改图片在屏幕的左侧
        isRight = false;
        targetx = (windows_width / 2 - bank_width * 1.5) / 2;
    } else {
        isRight = true;
        targetx = windows_width - (windows_width / 2 - bank_width * 1.5) / 2 - bank_width;
    }
    stepx = (targetx - bankx) / (time / 0.03);
    stepy = (targety - banky) / (time / 0.03);
    stepw = (bank_width * 0.5) / (time / 0.03);
    steph = (bank_height * 0.5) / (time / 0.03);
    //console.log("targetx : " + targetx);
    //console.log("targety : " + targety);
    //console.log("targetw : " + bank_height*1.5);
    //console.log("targeth : " + bank_width*1.5); #abc_bank
    var image = "url(\"../image/" + id.split("#")[1].split("_")[0] + "_building_after.png\")";
  //  console.log("image is " + image);
    $(id).css({
        "background-image": image,
        "cursor":"auto"
    });
    changeBankSatus(id, stepx, stepy, stepw, steph, bank_width * 1.5);
    changestatus();
    moveOtherBank(id);
    var info = id.split("_")[0] + "_info";
    //console.log("info is " + info);
    bankInfo(info, targetx, targety, bank_width * 1.5, bank_height * 1.5, isRight);
    var goto = "#goto_" + id.split("#")[1].split("_")[0];
    console.log("goto is " + goto);
    gotoBank(goto);
}

//页面中移除其他的银行图片
function changeBankSatus(id, stepx, stepy, stepw, steph, targetw) {
    var new_bank_height = $(id).css("height").split("px")[0] * 1.0 + steph;
    var new_bank_width = $(id).css("width").split("px")[0] * 1.0 + stepw;
    var new_bankx = $(id).css("left").split("px")[0] * 1.0 + stepx;
    var new_banky = $(id).css("top").split("px")[0] * 1.0 + stepy;
    $(id).css({
        "position": "absolute",
        "top": new_banky + "px",
        "left":new_bankx + "px",
        "width": new_bank_width + "px",
        "height": new_bank_height + "px"
    });
    if (targetw > new_bank_width) {
        setTimeout("changeBankSatus(\""+id+"\","+stepx+","+stepy+","+stepw+","+steph+","+targetw+")",30);
    }
}

function moveOtherBank(currentid) {
    for (var i = 0; i < 4; i++) {
        if (currentid != banks[i]) {
            id = banks[i];
  //          console.log("id is "+id);
            var banky = $(id).position().top;
            var targety;
            if (banky < windows_height / 2) {//改图片在屏幕的上侧
 //               console.log("top");
                targety = -200;
            } else {
 //               console.log("bottom");
                targety = windows_height;
            }
            stepy = (targety - banky) / (time / 0.06);
 //           console.log("targety is "+targety+" banky is "+banky+" stepy is " + stepy);
            moveOthers(id, stepy, targety);
        }
    }
}

function moveOthers(id, stepy,targety) {
    var new_banky = $(id).position().top + stepy;
    $(id).css({
        "position": "absolute",
        "top": new_banky + "px",
    });
    if ((new_banky > windows_height) || (new_banky <-200)) {
       
    } else {
        setTimeout("moveOthers(\"" + id + "\"," + stepy + "," + targety + ")", 30);
    }
}

//显示银行的具体信息
function bankInfo(id,targetx,targety,width,height,isRight) {
    var top = targety - 50;
    var left
    if (isRight) {
        //console.log("on the left")
        //console.log("target is " + targetx);
        left = targetx - 100 - 500;
    } else {
        //console.log("on the right")
        left = targetx + width + 100;
    }
    //console.log("left is "+left);
    $(id).css({
        "position": "absolute",
        "top": top + "px",
        "left": left + "px"

    });
    $(id).fadeIn(500);
}

//显示跳转到主页控件
function gotoBank(id) {
    $(id).css({
        "position": "absolute",
        "left": (windows_width - $(id).outerWidth()) / 2,
        "top": -80
    });
    var stepy = 80 / (time / 0.06);
    animationGotoBank(id,stepy);
}

function animationGotoBank(id,stepy) {
    var new_banky = $(id).css("top").split("px")[0] * 1.0 + stepy;
    $(id).css({
        "position": "absolute",
        "top": new_banky + "px",
    });
    if (new_banky < -2) {
        setTimeout("animationGotoBank(\"" + id + "\"," + stepy + ")", 30);
    }
}