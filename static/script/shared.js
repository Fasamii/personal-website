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

const my_age = new Date(new Date() - new Date(2008, 12, 5)).getFullYear() - 1970;
document.querySelectorAll(`#age`).forEach(item => {
	item.textContent = my_age > 0 ? my_age : "not born yet wtf";
});

// const languageColors = {
// 	'JavaScript': '#f1e05a',
// 	'TypeScript': '#2b7489',
// 	'Python': '#3572A5',
// 	'Java': '#b07219',
// 	'C++': '#f34b7d',
// 	'C': '#555555',
// 	'C#': '#239120',
// 	'PHP': '#4F5D95',
// 	'Ruby': '#701516',
// 	'Go': '#00ADD8',
// 	'Rust': '#dea584',
// 	'Swift': '#ffac45',
// 	'Kotlin': '#F18E33',
// 	'Dart': '#00B4AB',
// 	'HTML': '#e34c26',
// 	'CSS': '#1572B6',
// 	'SCSS': '#c6538c',
// 	'Vue': '#2c3e50',
// 	'React': '#61DAFB',
// 	'Shell': '#89e051',
// 	'PowerShell': '#012456',
// 	'Dockerfile': '#384d54',
// 	'YAML': '#cb171e',
// 	'JSON': '#292929',
// 	'Markdown': '#083fa1',
// 	'Lua': '#093fa1',
// };
//
// document.querySelectorAll(`#langsp`).forEach(item => {
// 	["C", "Lua", "Rust"].forEach(element => {
// 		const langdiv = document.createElement(`div`);
// 		langdiv.style.backgroundColor = languageColors[element];
// 		langdiv.style.width = "33%"
// 		langdiv.appendChild(document.createTextNode(element.toUpperCase()));
// 		item.appendChild(langdiv);
// 	});
// 	console.log(item);
// });
