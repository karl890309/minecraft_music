$(()=>{ //$(document).ready(function(){

    $("#playsound").click(()=>{
        $("#errormsg").html("");
        var time = new Date().getTime();
        
        var str = remove_space($("#code_input").val());
        var str = string_times(str);
        var array = [];
        
        if (!compile(array, str)){
            console.log("error return 3", array);
            return;
        }
        playnode(array);
        console.log(array);
    });
    $("#volume").get()[0].oninput = function(){
        $("#show_volume").html("volume: "+$("#volume").val());
    }
});
function error(errormsg){
    $("#errormsg").html(errormsg);
}
function compile(array, str){
    var returnval = true;
    var strarr = str.split(" ");
    var instrument = "other";
    var pitch = 4;
    var length = 8;
    var isaddTime = 0;
    var time = 0;
    $.each(strarr, (index, value)=>{
        isaddTime--;
        if (!value.search(/other|wood|sand|glass|stone|gold_block|clay|packed_ice|wool|bone|iron_block|soul_sand|pumpkin|emerald_block|hay_block|glowstone/)){
            instrument = value;
        }else if (!value.search(/[abcdefgr]/)){
            var pointnum = 0;
            var sharp = 0;
            var nodearray = ["c", "cp", "d", "dp", "e", "f", "fp", "g", "gp", "a", "ap", "b"];
            while(value.slice(-1) === "."){
                pointnum++;
                value = value.slice(0,-1);
            }
            while(value.match(/\+/)){
                sharp++;
                value = value.replace(/\+/,"");
            }
            while(value.match(/\-/)){
                sharp--;
                value = value.replace(/\-/,"");
            }
            var len = value.match(/[123456789]+(\.[\d]+)?|0\.[\d]+/);
            if (len){
                length = Math.round(32/parseFloat(len));
                var half = Math.round(length/2);
                length += pointnum*half;
            }
            var ptr = nodearray.indexOf(value.at(0));
            if (ptr != -1){
                var localPitch = pitch;
                ptr += sharp;
                if (ptr < 0 || ptr > 11){
                    localPitch += Math.floor(ptr/12);
                    ptr = ((ptr % 12) + 12) % 12;
                }
                insert_node(array, new NodeClass(instrument, pitch, ptr, time));
            }
            time += length;

        }else if (!value.search("o")){
            pitch = parseInt(value.match(/[123456789]/));
        }else if (!value.search("V")){
            time = 0;
        }else if (!value.search(":")){
            return;
        }else if (!value.search(">")){
            pitch++;
        }else if (!value.search("<")){
            pitch--;
        }else if (!value.search("/")){
            time -= length;
        }else if (!value.search("~")){
            isaddTime = 1;
        }else {
            if (!isaddTime){
                var toFloat = parseFloat(value);
                if (toFloat){
                    length += Math.round(32/parseFloat(value));
                }else{
                    error(`${value} isn't float`);
                    returnval = false;
                    console.log("error return 1");
                    return;
                }
                
            }else{
                error(`compile error at ${value}`);
                returnval = false;
                console.log("error return 2");
                return;
            }
        }
        
    });
    return returnval;
}
function insert_node(array, node){
    var ptr = 0;
    while (array.at(ptr) && node.biggerthan(array.at(ptr))){
        ptr++;
    }
    array.splice(ptr, 0, node);
}
function string_times(str){
    var matchStr = str.match(/(\[[^\*\[\]]*\]|[\w+-.]+) \* [\d]+/);
    if (matchStr){
        matchStr = matchStr[0];
        var copyStr = matchStr.match(/((?<=\[ )[^\[\]]*(?= \])|[\w+-.]+)/)[0] + " ";
        var copyTimes = parseInt(matchStr.match(/(?<=\* )[\d]+/)[0]);
        var ans = copyStr.repeat(copyTimes);
        ans = ans.slice(0,-1);
        str = str.replace(/(\[[^\*\[\]]*\]|[\w+-.]+) \* [\d]+/, ans);
        return string_times(str);
    }
    if (str.indexOf("*") == -1){
        str = str.replace(/( \[)|( \])]/g, "");
        return str;
    }
    str = str.replace(/\[[^\*\[\]]*\]/, str.match(/(?<=\[ )[^\*\[\]]*(?= \])/)[0]);
    return string_times(str);
}
function playnode(array){
    var time = new Date().getTime();
    console.log(array);
    $.each(array, (index, value)=>{
        console.log(value);
        value.play(time);
    });
}
function remove_space(str){
    var newStr = "";
    var lastIsSpace = false;
    var iscomment = false;
    var isquter = false;
    for (var i = 0; i < str.length; i++){
        if (str[i] === "#"){
            iscomment = true;
        }
        else if (str[i] === "\n") {
            iscomment = false;
        }
        if (iscomment){
            continue;
        }
        if (str[i] === "("){
            isquter = true;
        }
        else if (str[i] === ")") {
            isquter = false;
        }
        if (isquter){
            continue;
        }
        if (str[i]===" " || str[i]==="\r" || str[i]==="\n" || str[i]==="\t" || str[i]==="|"){
            if (!lastIsSpace){
                lastIsSpace = true;
                newStr += " ";
            }
        }
        else {
            lastIsSpace = false;
            if ((str[i] === ">" || str[i] === "<" || str[i] === "/" || str[i] === "~" || 
            str[i] === ":"|| str[i] === "["|| str[i] === "]"|| str[i] === "*") 
            && !(newStr[i-1] === " ")){
                newStr += " " + str[i] + " ";
                lastIsSpace = true;
            }
            else {
                newStr += str[i];
            }
        }
        
    }
    return newStr;
}

