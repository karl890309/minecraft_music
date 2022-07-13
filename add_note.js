$(()=>{ //$(document).ready(function(){
    var jqbody = $("body");
    append_node(jqbody, "other", 3);
    append_node(jqbody, "glowstone", 3);
    append_node(jqbody, "hay_block", 3);
    append_node(jqbody, "emerald_block", 3);
    append_node(jqbody, "iron_block", 3);
    append_node(jqbody, "wood", 1);
    append_node(jqbody, "gold_block", 5);
    append_node(jqbody, "clay", 4);
    append_node(jqbody, "packed_ice", 5);
    append_node(jqbody, "wool", 2);
    append_node(jqbody, "bone_block", 5);
    append_node(jqbody, "soul_sand", 4);
    append_node(jqbody, "pumpkin", 1);
    jqbody.append(`<audio id='sand_o4c' preload='auto' src='sound/sand_o4c.wav' type='audio/wav'></audio>`);
    jqbody.append(`<audio id='glass_o4c' preload='auto' src='sound/glass_o4c.wav' type='audio/wav'></audio>`);
    jqbody.append(`<audio id='stone_o4c' preload='auto' src='sound/stone_o4c.wav' type='audio/wav'></audio>`);

})

function append_node(element, name, height){
    var node = ["fp","g","gp","a","ap","b","c","cp","d","dp","e","f"];
    for (var i = 0; i < 25; i++){
        var id = `${name}_o${(parseInt(0.5 + 1/12 * i)+height)}${node.at(i%12)}`;
        element.append(`<audio id='${id}' preload='auto' src='sound/${id}.wav' type='audio/wav'></audio>`);
    }
}