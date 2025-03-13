var wavesurfer = WaveSurfer.create({
    container: "#audiowave",
    waveColor: "#5df9de",
    progressColor: "#1e594f",
    height: 150,
    responsive: true,
    hideScrollbar: true,
    cursorColor: "#5df9de",
    cursorWidth: 2,
    barWidth: 5,
    barGap: 1.5,
    skipLength: 5
});

wavesurfer.load('https://store2.gofile.io/download/web/8bc6ee33-ab61-43f0-a0a2-ba835678b850/mischluft.mp3');

$(".btn-toggle-pause").on("click", function() {
    wavesurfer.playPause();
});

$(".btn-backward").on("click", function() {
    wavesurfer.skipBackward();
});

$(".btn-forward").on("click", function() {
    wavesurfer.skipForward();
});

$(".btn-toggle-mute").on("click", function() {
    wavesurfer.toggleMute();
});

$(".btn-stop").on("click", function() {
    wavesurfer.stop();
});
