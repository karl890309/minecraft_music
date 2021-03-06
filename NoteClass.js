class NoteClass {
    insArray = ["wood","glass","stone","gold_block","clay","packed_ice","bone_block","iron_block","soul_sand","pumpkin","emerald_block","hay_block","glowstone","sand","other","wool"];
    pitchArray = [1,    3.5,    3.5,    5,           4,     5,           5,           3,           4,          1,        3,              3,          3,          3.5,   3,      2];
    notearray = ["c", "cp", "d", "dp", "e", "f", "fp", "g", "gp", "a", "ap", "b"];
    constructor (instrument, pitch, note, time){
        this.instrument = this.insArray.indexOf(instrument);
        if (this.instrument == 15){
            this.limit = [5,15];
        }else if (this.instrument == 14){
            this.limit = [0,20];
        }else if (this.instrument == 13){
            this.limit = [7,20];
        }else {
            this.limit = [5,20];
        }
        this.pitch = pitch;
        this.note = note;
        this.time = time;
        this.audio = $(`#${instrument}_o${pitch}${this.notearray.at(note)}`).get(0);
        this.posnum = 0;
        this.saveTimeout = null;
        if (this.audio == undefined){
            return ;
        }
        this.noteBlock = (pitch*12+note) - (this.pitchArray.at(this.instrument)*12+6);
    }
    changeins(){
        var order = [14, 15, 0, 3];
        var savenotenum;
        $.each(order, (i, value)=>{
            savenotenum = (this.pitch*12+this.note) - (this.pitchArray.at(value)*12+6);
            if (savenotenum <= 24 && savenotenum >= 0 && !this.canplay()){
                this.instrument = value;
                if (this.instrument == 15){
                    this.limit = [5,15];
                }else if (this.instrument == 14){
                    this.limit = [0,20];
                }else if (this.instrument == 13){
                    this.limit = [7,20];
                }else {
                    this.limit = [5,20];
                }
                this.noteBlock = savenotenum;
                this.audio = $(`#${this.insArray.at(value)}_o${this.pitch}${this.notearray.at(this.note)}`).get(0);
            }
        })
    }
    canplay(){
        return this.audio != undefined;
    }
    biggerthan(note){
        if (this.time != note.time){
            return this.time > note.time;
        }
        if (this.instrument != note.instrument){
            return this.instrument > note.instrument;
        }
        if (this.pitch != note.pitch){
            return this.pitch > note.pitch;
        }
        return this.note > note.note;
    }
    play(time){
        var realTime = new Date().getTime();
        this.saveTimeout = setTimeout(()=>{
            this.audio = this.audio.cloneNode();
            this.audio.volume = $("#volume").val()/100;
            this.saveTimeout = setTimeout(()=>{
                this.audio.play();
                this.audio.onended = ()=>{
                    delete this.audio;
                };
            }, 1000);
        }, this.time*50-(realTime-time)-1000);
    }
    toString(){
        return `${this.insArray.at(this.instrument)}_o${this.pitch}${this.notearray.at(this.note)} delay:${this.time}`;
    }
    setposnum(num){
        this.posnum = num;
    }
    kill_timeout(){
        if (this.saveTimeout){
            delete this.audio;
            clearTimeout(this.saveTimeout);
        }
    }
}