const isInteger = string => string / 1 !== NaN;

Vue.component('set-day', {
	props: ['page_client'],
	template: `
		<div id="set_day_page" class="standart_page">
			<nav-block :page_client="page_client"></nav-block>
			<main class="beautiful_scrollbar">
				<header class="page_block">Сделать сегодняшнюю запись:</header>
				<article>
					<div class="form">
						<div>
							<textarea 
								class="input page_block beautiful_scrollbar" 
								name="text"
								placeholder="Текст">
							</textarea>
						</div>
						<div class="buttons">
							<div class="button submit-btn" @click="send_data()">Отправить</div>
						</div>
					</div>
				</article>
			</main>
		</div>
	`,
	methods: {
		send_data() {
			$(".input").removeClass('wrong');
			let today = new Date();
			let year 	= today.getFullYear();
			let month 	= today.getMonth() + 1;
			let day 	= today.getDate();
			let text 	= document.querySelector("textarea[name='text']").value;

			if (isInteger(year) && isInteger(month) && isInteger(day) && text !== "") {
				eel.set_text(year, month, day, text)();
				$(".input").addClass('good');
			}
			else {
				$(".input").addClass('wrong');
			}
		}
	}
});