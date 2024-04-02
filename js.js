const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const toggleBtn = document.querySelector('.toggle')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const skipBtns = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')

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



toggleBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
// te listenery są nadane na akcję play i pause, a nie tylko na klik, ponieważ użytkownik może zastopować czy włączyć play w różny sposób, na przykład, może używać wtyczki, która po zminimalizowaniu karty stopuje film - wtedy również chcemy aby nasza funkcja się wykonała