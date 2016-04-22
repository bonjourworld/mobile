
var panels = function(panels) {

    panels.makePanel2 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .8;
        panel.addChild(backing);


        var sound = frame.asset("zim.mp3").play();
        sound.volume = .3;
        sound.loop = -1;

        //////////////////  MESSAGE  ///////////////////////

        var message = frame.asset("end.png");
        zim.scaleTo(message, panel, 100, 100);
        panel.addChild(message);
        panel.cursor = "pointer";
        panel.on("click", function(){zgo("http://zimjs.com/code/", "_blank")});

        return panel;
    }
    return panels;
} (panels || {});
