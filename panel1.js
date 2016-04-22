
var panels = function(panels) {

    panels.makePanel1 = function(frame) {
        var panel = new createjs.Container();
        panel.width = 700;
        panel.height = 700;
        var backing = new zim.Rectangle(panel.width, panel.height, "black");
        backing.alpha = .3;
        panel.addChild(backing);
       
        //////////////////  VALUE TO GUESS /////////////

        var dialKey = panel.dialKey = zim.rand(1,4) + "" + zim.rand(1,4)+ "" + zim.rand(1,4)+ "" + zim.rand(1,4);
        console.log(dialKey);

        //////////////////  PAD  ///////////////////////

        var padKey = panel.padKey = "?" + "" + "?"+ "" + "?"+ "" + "?";

        // width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelAdjust
        pad = new zim.Pad({
            width: 270,
            cols: 2,
            keys: [1,2,3,4],
            color: frame.dark,
            rollColor: frame.blue,
            offColor: frame.grey
        });

        pad.alpha = .8;
        var margin = backing.width*.07;
        pad.x = (backing.height-pad.height-margin)/2;
        pad.y = (backing.height-pad.height-margin)/7;
        panel.addChild(pad);

        var digit = new zim.Tabs((pad.width-2)*4/3, (pad.width-2)/3, [padKey.substr(0,1), padKey.substr(1,1),padKey.substr(2,1), padKey.substr(3,1)], frame.blue, frame.blue, frame.blue, 3);
        digit.enabled = false;
        panel.addChild(digit);
        digit.x = margin
        digit.y = pad.y + pad.height *2/3 + digit.height*2 +2;
        // digit.shadow = new createjs.Shadow("rgba(0,0,0,.3)", 5, 5, 10);

        var lastPlay = new zim.Tabs((pad.width-2)*4/3, (pad.width-2)/3, [padKey.substr(0,1), padKey.substr(1,1),padKey.substr(2,1), padKey.substr(3,1)],  frame.pink, frame.pink, frame.pink, 3);
        lastPlay.enabled = false;
        panel.addChild(lastPlay);
        lastPlay.x = margin;
        lastPlay.y = backing.height-lastPlay.height-margin;

        var ok = new zim.Tabs((pad.width-2)/3, (pad.width-2)/3, [padKey.substr(0,1)],  frame.green, frame.green, frame.green, 3);
        ok.enabled = false;
        panel.addChild(ok);
        ok.x = lastPlay.x+margin+lastPlay.width;
        ok.y = backing.height-ok.height-margin;

        var soso = new zim.Tabs((pad.width-2)/3, (pad.width-2)/3, [padKey.substr(0,1)],  frame.black, frame.black, frame.black, 3);
        soso.enabled = false;
        panel.addChild(soso);
        soso.x = ok.x+ok.width;
        soso.y = backing.height-soso.height-margin;

        pad.on("change", padChange);



        function padChange(e) {
            padKey += pad.text;
            padKey = padKey.substr(-4,4);
            digit.labels[0].text = padKey.substr(0,1);
            digit.labels[1].text = padKey.substr(1,1);
            digit.labels[2].text = padKey.substr(2,1);
            digit.labels[3].text = padKey.substr(3,1);
            adjustLast();
            goodies();
            almost();
            test();
        }

        var displayLast=[-1,-1,-1,-1];
        var edit = true;
        
        function adjustLast(){

            for(var i =0;i<digit.labels.length;i++){  
                displayLast.shift();
                displayLast.push(digit.labels[i].text);

            }

            if(displayLast[0]>0 && edit==true){     
                lastPlay.labels[0].text=digit.labels[0].text;
                lastPlay.labels[1].text=digit.labels[1].text;
                lastPlay.labels[2].text=digit.labels[2].text;
                lastPlay.labels[3].text=digit.labels[3].text; 

                edit=false;
            }

            if(edit==false){  
                console.log(edit);
                padKey = "?" + "" + "?"+ "" + "?"+ "" + "?";
                edit=true; 
                   
            }
               
        }

        var yay=0;
        function goodies(){

            // console.log("last",displayLast);
            // console.log("dial",dialKey.split(""));
            if(yay<4){
                for(var k=0;k<dialKey.split("").length;k++){
                    if(displayLast[k]=="?"){
                        yay=0;
                        break;
                    }else{
                        
                        if(dialKey.split("")[k]==displayLast[k]){
                            yay++;
                        }
                    
                    }  

                }
                ok.labels[0].text=yay;
            }else{
                yay=0;
            }
        }

        var meh=0;
        var already=[];
        var copy = dialKey.split("").slice(0);

        function almost(){

            console.log("last",displayLast);
            console.log("copy",copy);
            if(meh<4){
                for(var k=0;k<copy.length;k++){
                    if(displayLast[k]=="?"){
                        meh=0;
                        break;
                    }else{
                        if(copy.indexOf(displayLast[k])>=0 && already.indexOf(displayLast[k])==-1){
                            var dataset = copy;
                            var search = displayLast[k];
                            var count = dataset.filter(function(val){
                                return val === search;
                            }).length;
                            console.log("count",count);
                            meh+=count;
                            copy[k]==-1;
                            already.push(displayLast[k])
                        }
                    }  

                } 
                  
                      soso.labels[0].text=meh-yay; 
                   
                   
            }else{
                meh=0;
            }    
        }

        function test() {
            frame.stage.update();
          
            if(dialKey.split("").toString()==displayLast.toString()){
                  panel.dispatchEvent("pass");
            }
          
        }

        panel.dispose = function() {
            
            pad.off("change", padChange);
           
            pad.dispose();
        }

        return panel;
    }
    return panels;
} (panels || {});