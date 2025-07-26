document.querySelectorAll('.glitch').forEach(item => {
	const originalText = item.textContent;
	let glitchInterval = null;
	let isGlitching = false;

	item.addEventListener('mouseenter', function() {
		if (isGlitching) return;

		isGlitching = true;
		let glitchCount = 0;

		glitchInterval = setInterval(() => {
			const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
			let glitched = '';

			for (let i = 0; i < originalText.length; i++) {
				if (Math.random() < 0.2) {
					glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
				} else {
					glitched += originalText[i];
				}
			}

			this.textContent = glitched;
			glitchCount++;

			if (glitchCount > Math.min(originalText.length, 4)) {
				this.textContent = originalText;
				clearInterval(glitchInterval);
				glitchInterval = null;
				isGlitching = false;
			}
		}, 50);
	});

	item.addEventListener('mouseleave', function() {
		if (glitchInterval) {
			clearInterval(glitchInterval);
			glitchInterval = null;
		}
		isGlitching = false;
		this.textContent = originalText;
	});
});
