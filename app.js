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

client.connect(auth);

client.Dispatcher.on("MESSAGE_CREATE", (e) => {
    if (should_send) {
        const content = e.message.content;
        const channel = e.message.channel;
        channel.sendMessage("Message Received");
        should_send = false;
    }else{
        should_send = true;
    }
});

client.Dispatcher.on("VOICE_CONNECTED", e => {
    e.voiceConnection.getDecoder()
    .onPacket = (packet) =>
{
    const user = e.voiceConnection.ssrcToMember(packet.ssrc);
    if (!user) return;
    if (user.id != recordingUser) return;
}})
