document.addEventListener('DOMContentLoaded', () => {
	const cookieBlock = document.getElementById('coockie_block');
	const cookieButton = cookieBlock.querySelector('button');

	const cookiesAccepted = document.cookie.includes('cookies_accepted=true');

	if (!cookiesAccepted) {
		cookieBlock.style.display = 'flex';
	}

	cookieButton.addEventListener('click', () => {
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);
		document.cookie = `cookies_accepted=true; path=/; expires=${expires.toUTCString()}`;

		cookieBlock.style.display = 'none';
	});
});