
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
        console.log("code to decipher:",dialKey);

        

        //////////////////  PAD  ///////////////////////

        var padKey = panel.padKey = "?" + "" + "?"+ "" + "?"+ "" + "?";

        // width, cols, rows, keys, color, rollColor, offColor, spacing, currentEnabled, corner, labelAdjust
        pad = new zim.Pad({
            width: 270,
            cols: 2,
            rows:2,
            keys: [1,2,3,4],
            color: frame.dark,
            rollColor: frame.blue,
            offColor: frame.grey
        });

        pad.alpha = .8;
        var margin = backing.width*.07;
        pad.x = (backing.width-pad.width-margin)/2;
        pad.y = (backing.height-pad.height)/4;
        panel.addChild(pad);

        var title = new zim.Tabs(608, 67, ["CIPHER> Tap 4 numbers,decipher the code"],  "#7a797a", "#7a797a", "#7a797a", 3,false,0,"white");
        title.enabled = false;
        panel.addChild(title);
        title.x = (backing.width-title.width)/2;
        title.y = (backing.height-pad.height-margin)/25;

        ////moves ///

        //current play
        var played = new zim.Tabs((pad.width-2)*4/3, (pad.width-2)/4, ["Current Move"], frame.black, frame.black, frame.black, 3);
        played.enabled = false;
        panel.addChild(played);
        played.x = margin;
        played.y = pad.y + pad.height *2/3+ played.height*2;

        //current play
        var digit = new zim.Tabs((pad.width-2)*4/3, (pad.width-2)/4, [padKey.substr(0,1), padKey.substr(1,1),padKey.substr(2,1), padKey.substr(3,1)], frame.blue, frame.blue, frame.blue, 3);
        digit.enabled = false;
        panel.addChild(digit);
        digit.x = margin;
        digit.y = played.y+digit.height;

        //last play label
        var moved = new zim.Tabs((pad.width-2)*4/3, (pad.width-2)/4, ["Last Move"], frame.black, frame.black, frame.black, 3);
        moved.enabled = false;
        panel.addChild(moved);
        moved.x = margin;
        moved.y = digit.y +moved.height;

        // last play
        var lastPlay = new zim.Tabs((pad.width-2)*4/3, (pad.width-2)/4, [padKey.substr(0,1), padKey.substr(1,1),padKey.substr(2,1), padKey.substr(3,1)],  frame.pink, frame.pink, frame.pink, 3);
        lastPlay.enabled = false;
        panel.addChild(lastPlay);
        lastPlay.x = margin;
        lastPlay.y = moved.y+lastPlay.height;

        //ok label
        var ok = new zim.Tabs((pad.width-2)/3, (pad.width-2)/4, ["☺"],  frame.black, frame.black, frame.black, 3);
        ok.enabled = false;
        panel.addChild(ok);
        ok.x = lastPlay.x+margin+lastPlay.width;
        ok.y = moved.y;
        //ok
        var ok = new zim.Tabs((pad.width-2)/3, (pad.width-2)/4, [padKey.substr(0,1)],  "seagreen", "seagreen", "seagreen", 3,false,0,"white");
        ok.enabled = false;
        panel.addChild(ok);
        ok.x = lastPlay.x+margin+lastPlay.width;
        ok.y = moved.y+lastPlay.height;

        //so so label
        var soso = new zim.Tabs((pad.width-2)/3, (pad.width-2)/4, ["meh"],  frame.black, frame.black, frame.black, 3);
        soso.enabled = false;
        panel.addChild(soso);
        soso.x = ok.x+ok.width+margin/25;
        soso.y = moved.y;
        //so so
        var soso = new zim.Tabs((pad.width-2)/3, (pad.width-2)/4, [padKey.substr(0,1)],  "yellow", "yellow", "yellow", 3,false,0,"black");
        soso.enabled = false;
        panel.addChild(soso);
        soso.x = ok.x+ok.width+margin/25;
        soso.y = moved.y+lastPlay.height;

        // instructions
        // var key = new zim.Tabs((pad.width-2)/3, (pad.width-2)/4, ["key->"],  frame.black , frame.black, frame.black, 3);
        // key.enabled = false;
        // panel.addChild(key);
        // key.x = margin;
        // key.y = soso.y+key.height*5/3;

        var instructions = new zim.Tabs((pad.width*9/4), (pad.width-2)/4, ["☺ = numbers in their real postion"],  "#aeadae" , "#aeadae", "#aeadae", 3,false,0,"black");
        instructions.enabled = false;
        panel.addChild(instructions);
        instructions.x = margin;
        instructions.y = soso.y+instructions.height*2;

        var instructions2 = new zim.Tabs((pad.width*9/4), (pad.width-2)/4, ["meh = numbers in a wrong position"],  "#aeadae" , "#aeadae", "#aeadae", 3,false,0,"black");
        instructions2.enabled = false;
        panel.addChild(instructions2);
        instructions2.x = margin;
        instructions2.y = instructions.y+instructions.height;

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
                padKey = "?" + "" + "?"+ "" + "?"+ "" + "?";
                edit=true; 
                   
            }
               
        }

        var yay=0;
        function goodies(){
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
        //saves each integer in the code just once
        var uniqueInCode= []; 
        //counts the times each integer in the code has been pressed by the user
        var countUnique=[];
        //counts the times each integer in the code appears in the code
        var countUniqueInCode=[];
        //temp variable to compare to substract the correct inputs from the total inputs and know which ones are off place
        var totalCount=0;

        function almost(){

            for(var k=0;k<dialKey.split("").length;k++){
                
                if(uniqueInCode.indexOf(dialKey.split("")[k])==-1){
                    uniqueInCode.push(dialKey.split("")[k]);
                }
            }
            console.log("unique in code:",uniqueInCode);


            for(var l = 0; l<uniqueInCode.length;l++){
                
                for(var m =0; m<displayLast.length;m++){
                    var unique = countUnique[l];
                    if(displayLast[m]=="?"){
                        totalCount=0;
                        countUnique[l]=0;
                        break;
                    }else if(uniqueInCode[l]==displayLast[m]){
                        unique++;
                        countUnique[l]=unique;
                    }
                }

            }
            console.log("count unique",countUnique);

            for(var o = 0; o<uniqueInCode.length;o++){

                for(var p =0; p<dialKey.split("").length;p++){
                    var unique2 = countUniqueInCode[o];
                   
                    if(displayLast[p]=="?"){
                        totalCount=0;
                        countUniqueInCode[o]=0;
                        break;
                    }else if(uniqueInCode[o]==dialKey.split("")[p]){
                        unique2++;
                        countUniqueInCode[o]=unique2;
                    }
                }

            }
            console.log("count unique in code:",countUniqueInCode);

            for(var n=0; n<uniqueInCode.length;n++){
                if(countUnique[n]>countUniqueInCode[n]){
                    totalCount+=countUniqueInCode[n];
                }else{
                    totalCount+=countUnique[n];
                }
            }

            meh=totalCount-yay;
            
            soso.labels[0].text=meh;

              
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