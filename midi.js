window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			console.log("Loaded");
			document.getElementById("playBtn").disabled = false;
		}
	});

	document.getElementById("playBtn").onclick = function(){
		var delay = 0; // play one note every quarter second
		var note = 60; // the MIDI note
		var velocity = 127; // how hard the note hits
		// play the note
		MIDI.setVolume(0, 127);
		for(var i = 0; i < 8; i++){
			MIDI.noteOn(0, note+i, velocity, delay);
			delay += 0.5;
			MIDI.noteOff(0, note+i, delay);
		}
	};
}
