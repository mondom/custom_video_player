const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const toggleBtn = document.querySelector('.toggle')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const skipBtns = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')
const fullScreenBtn = document.querySelector('.full__screen')

function togglePlay() {
	if (video.paused) {
		video.play()
	} else {
		video.pause()
	}
	// inny zapis
	// const method = video.paused ? 'play' : 'pause'
	// video[method]()
}

function updateButton() {
	console.log(this)
	const icon = this.paused ? '▶' : '⏸'
	toggleBtn.textContent = icon
}

function skip() {
	console.log(this.dataset.skip)
	video.currentTime += parseInt(this.dataset.skip)
}

function handleRangeUpdate() {
	video[this.name] = this.value
	// Nawiasy kwadratowe ([]) są używane w JavaScript do dostępu do właściwości obiektu za pomocą zmiennej jako klucza. W przypadku linii kodu video[this.name] = this.value, używane są nawiasy kwadratowe, ponieważ this.name jest zmienną, która przechowuje nazwę właściwości, do której chcemy się odwołać w obiekcie video. Dla przykładu, jeśli this.name zawierałoby wartość "volume", linia kodu video[this.name] = this.value byłaby równoważna video["volume"] = this.value, co oznaczałoby przypisanie wartości this.value do właściwości volume obiektu video.
}

function handleProgress() {
	// flex-basis - właściwość ustawiona w css

	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
	console.log(e)
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

toggleBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
// te listenery są nadane na akcję play i pause, a nie tylko na klik, ponieważ użytkownik może zastopować czy włączyć play w różny sposób, na przykład, może używać wtyczki, która po zminimalizowaniu karty stopuje film - wtedy również chcemy aby nasza funkcja się wykonała

skipBtns.forEach(btn => {
	btn.addEventListener('click', skip)
})

ranges.forEach(range => {
	range.addEventListener('change', handleRangeUpdate)
})
ranges.forEach(range => {
	range.addEventListener('mousemove', handleRangeUpdate)
})
video.addEventListener('timeupdate', handleProgress)

let mousedown = false;

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

fullScreenBtn.addEventListener('click', toggleFullScreen)
