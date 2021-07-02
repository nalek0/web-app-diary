const isInteger = string => string / 1 !== NaN;

Vue.component('set-day', {
	props: [],
	template: `
		<div id="set_day_page">
			<header class="page_block">Сделать запись:</header>
			<article>
				<div class="form">
					<div><input class="input page_block" type="text" placeholder="Год" name="year"></div>
					<div><input class="input page_block" type="text" placeholder="Месяц" name="month"></div>
					<div><input class="input page_block" type="text" placeholder="День" name="day"></div>
					<div><textarea class="input page_block" name="text" style="height: 100px; resize: none;" placeholder="Текст"></textarea></div>
					<div class="buttons">
						<div class="button update-btn" @click="set_today()">Сегодня</div>
						<div class="button submit-btn" @click="send_data()">Отправить</div>
					</div>
				</div>
			</article>
		</div>
	`,
	methods: {
		send_data() {
			$(".input").removeClass('wrong');
			let year 	= document.querySelector("input[name='year']").value;
			let month 	= document.querySelector("input[name='month']").value;
			let day 	= document.querySelector("input[name='day']").value;
			let text 	= document.querySelector("textarea[name='text']").value;

			if (isInteger(year) && isInteger(month) && isInteger(day) && text !== "") {
				eel.set_text(year, month, day, text)();
				$(".input").addClass('good');
			}
			else {
				$(".input").addClass('wrong');
			}
		},
		set_today() {
			let today = new Date();
			document.querySelector("input[name='year']").value 	= today.getFullYear();
			document.querySelector("input[name='month']").value = today.getMonth() + 1;
			document.querySelector("input[name='day']").value 	= today.getDate();
		}
	}
});