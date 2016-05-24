$(function () {
    $(".icons").mouseover(function () {
        $(".icons").css({
            "animation-play-state": "paused",
            "-webkit-animation-play-state": "paused",
            "-moz-animation-play-state": "paused",
            "-o-animation-play-state": "paused"
        });
        $("#bank").mouseover(function () {
            $("#bank").css({
                "animation-play-state": "paused",
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused",
                "-o-animation-play-state": "paused"
            });
        });
    }).mouseout(function () {
        $(".icons").css({
            "animation-play-state": "running",
            "-webkit-animation-play-state": "running",
            "-moz-animation-play-state": "running",
            "-o-animation-play-state": "running"
        });
        $("#bank").mouseover(function () {
            $("#bank").css({
                "animation-play-state": "running",
                "-webkit-animation-play-state": "running",
                "-moz-animation-play-state": "running",
                "-o-animation-play-state": "running"
            });
        });
    });
});