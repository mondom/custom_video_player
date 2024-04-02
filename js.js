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

function skip() {
	console.log(this.dataset.skip)
	video.currentTime += parseInt(this.dataset.skip)
}

function handleRangeUpdate() {
	console.log(this.value)
	console.log(this.name)
    video[this.name] = this.value
// Nawiasy kwadratowe ([]) są używane w JavaScript do dostępu do właściwości obiektu za pomocą zmiennej jako klucza. W przypadku linii kodu video[this.name] = this.value, używane są nawiasy kwadratowe, ponieważ this.name jest zmienną, która przechowuje nazwę właściwości, do której chcemy się odwołać w obiekcie video. Dla przykładu, jeśli this.name zawierałoby wartość "volume", linia kodu video[this.name] = this.value byłaby równoważna video["volume"] = this.value, co oznaczałoby przypisanie wartości this.value do właściwości volume obiektu video.
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
