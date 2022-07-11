class NodeClass {
    insArray = ["wood","glass","stone","gold_block","clay","packed_ice","bone","iron_block","soul_sand","pumpkin","emerald_block","hay_block","glowstone","wool","sand","other"];
    nodearray = ["c", "cp", "d", "dp", "e", "f", "fp", "g", "gp", "a", "ap", "b"];
    constructor (instrument, pitch, node, time){
        this.instrument = this.insArray.indexOf(instrument);
        this.pitch = pitch;
        this.node = node;
        this.time = time;
        this.audio = $(`#${instrument}_o${pitch}${this.nodearray.at(node)}`).get()[0].cloneNode();
        this.audio.volume = $("#volume").val()/100;
    }
    biggerthan(node){
        if (this.time != node.time){
            return this.time > node.time;
        }
        if (this.instrument != node.instrument){
            return this.instrument > node.instrument;
        }
        if (this.pitch != node.pitch){
            return this.pitch > node.pitch;
        }
        return this.node > node.node;
    }
    play(time){
        var realTime = new Date().getTime();
        setTimeout(()=>{
            console.log("play", this.toString())
            this.audio.play();
        }, this.time*50-(realTime-time));
    }
    toString(){
        return `${this.insArray.at(this.instrument)}_o${this.pitch}${this.nodearray.at(this.node)} delay:${this.time}`;
    }
}