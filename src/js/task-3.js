;(function(){

	// httpGet promise
	function httpGet(url) {
		return new Promise(function(resolve, reject){

			let req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = function(){
				if (req.status === 200){
					resolve(req.response);
				} else {
					reject(Error(req.statusText));
				}
			};

			req.onerror = function() {
				reject(Error('Network Error'));
			};

			req.send();
		});
	}



	// какая-то функция, которую надо выполнить, когда пришли оба ответа
	function tryToSayHello(){
		if (!results[0] || !results[1]) return;
		fillResponseField(`${results[0].text} ${results[1].text} !`);
		console.log('Оба ответа получены')
	}

	// какая-то функция, которую надо выполнить, когда один из запросов выполнился с ошибкой
	function onError(error){
		fillResponseField(`<span class="error">${error}</span>`);
	}

	function fillResponseField(html) {
		responseField.innerHTML = html;
	}




	let results = [];
	let requestButtons = document.querySelectorAll('.request');
	let responseField = document.querySelector('.response');

	if (!requestButtons) return;

	window.addEventListener('click', (e) => {
		let target = e.target;


		if (target.classList.contains('request')) {
			target.disabled = true;
			let url = target.getAttribute('data-url');
			let index = target.getAttribute('data-index');

			httpGet(url).then((response) => {
				results[index] = JSON.parse(response);
				tryToSayHello();

			}, (error) => {
				onError(error);
				target.disabled = false;
			});

		}


	});


}())