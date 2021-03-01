// TODO Needs to be implemented in React

$(window).on("load", function () {
    const audio = $("audio")[0];

    const alert_elem = document.querySelector(".alert");
    if (audio) {
        audio.muted = true;

        audio
            .play()
            .then(() => {
                alert_elem.remove();
                resetAudio();
            })
            .catch(() => {
                // need user interaction
                alert_elem.addEventListener("click", ({ target }) => {
                    if (target.matches("button")) {
                        const allowed = target.value === "1";
                        if (allowed) {
                            audio.play().then(resetAudio);
                        }
                        alert_elem.remove();
                    }
                });
            });
    } else {
        alert_elem.remove();
    }

    function resetAudio() {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
        audio.volume = 0.2;
        audio.play();
    }
});
