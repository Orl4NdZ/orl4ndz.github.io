


const gradient = ctx.createLinearGradient(0, 0, 0, 150)
gradient.addColorStop(0, 'rgb(200, 0, 200)')
gradient.addColorStop(0.7, 'rgb(100, 0, 100)')
gradient.addColorStop(1, 'rgb(0, 0, 0)')




var wavesurfer = WaveSurfer.create({
    container: "#audiowave",
    waveColor: gradient,
    progressColor: "#1e594f",
    height: 150,
    responsive: true,
    hideScrollbar: true,
    cursorColor: "#5df9de",
    cursorWidth: 2,
    barWidth: 3,
    barGap: 1.5,
    skipLength: 5
});

wavesurfer.load('https://github.com/Orl4NdZ/orl4ndz.github.io/raw/refs/heads/main/docs/mischluft.mp3');

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
