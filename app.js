"use strict";

// voice echo bot

// records and sends audio using `proxy` mode (without decoding/encoding/saving anything)
// variable `var recordTime = 10;` controls duration of recording in seconds

// commands:
// ~!~echo - joins voice channel and records audio, then plays recorded audio back
// ~!~stop - stops recording/playing

var fs = require('fs');
var Discordie;
try { Discordie = require("discordie"); } catch(e) {}

var client = new Discordie({autoReconnect: true});

var auth = { token: "MTk3NDM2OTMwOTE5NDk3NzI4.ClRk-A.WArrWXpw9p8LmW7F91FpaZnRYfk" };
var should_send = true;
var recording_user = "";

client.connect(auth);

client.Dispatcher.on("MESSAGE_CREATE", (e) => {
    if (should_send) {
        const content = e.message.content;
        const channel = e.message.channel;
        if (content == "/record"){
            channel.sendMessage("record command working");
            e.message.member.getVoiceChannel().join();
            recording_user = e.message.member;
        }else if (content == "/stop"){
            channel.sendMessage("recording stopped");
            e.message.member.getVoiceChannel().leave();
        }
        should_send = false;
    }else{
        should_send = true;
    }
});

client.Dispatcher.on("VOICE_SPEAKING", e => {
    e.voiceConnection.getDecoder()
    
    .onPacket = (packet) =>
    {
        const user = e.voiceConnection.ssrcToMember(packet.ssrc);
        if (!user) return;
        if (user != recording_user) return;
        recording_user.guild.generalChannel.sendMessage("voice received");
        //this needs to be fixed
        fs.appendFile('output.dat', packet, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
    }
})
/*client.Dispatcher.on("VOICE_CONNECTED", e => {
    recording_user.guild.generalChannel.sendMessage("VOICE_CONNECTED");
})*/