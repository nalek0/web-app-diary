const isInteger = string => string / 1 !== NaN;

Vue.component('day', {
	props: ['page_client', 'year', 'month', 'day', 'text'],
	template: `
		<main id="set_day_page">
			<header v-if="this.is_today" class="page_block">Сегодня</header>
			<header v-else class="page_block">{{ this.page_str_date }}</header>
			
			<article class="beautiful_scrollbar">
				<div class="form">
					<textarea 
						class="input page_block beautiful_scrollbar" 
						name="text"
						placeholder="Текст" :value="text"
						@change = 	"change()"
						@cut = 		"delayedChange()"
						@paste = 	"delayedChange()"
						@drop = 	"delayedChange()"
						@keydown = 	"delayedChange()">
					</textarea>
				</div>
			</article>
		</main>
	`,
	data() {
		return {
			month_names: {
				1: 'Января',
				2: 'Февраля',
				3: 'Марта',
				4: 'Апреля',
				5: 'Мая',
				6: 'Июня',
				7: 'Июля',
				8: 'Августа',
				9: 'Сентября',
				10: 'Октября',
				11: 'Ноября',
				12: 'Декабря'
			},
			week_day_names: {
				1: 'Понедельник',
				2: 'Вторник',
				3: 'Среда',
				4: 'Четверг',
				5: 'Пятница',
				6: 'Суббота',
				7: 'Воскресенье'
			}
		}
	},
	methods: {
		change() {
			let text = document.querySelector("textarea[name='text']").value;

			eel.set_text(this.year, this.month, this.day, text)();
		},
		delayedChange() {
			setTimeout(this.change, 0);
		}
	},
	computed: {
		today() {
			let today = new Date();
			return {
				year: 	today.getFullYear(),
				month: 	today.getMonth() + 1,
				day: 	today.getDate()
			}
		},
		is_today() {
			return (
				this.year 	=== this.today.year &&
				this.month 	=== this.today.month &&
				this.day 	=== this.today.day
			)
		},
		page_date() {
			return new Date(this.year, this.month - 1, this.day);
		},
		page_str_date() {
			return `
				${ this.page_date.getDate() } 
				${ this.month_names[this.page_date.getMonth() + 1] } 
				${ this.page_date.getFullYear() }, 
				${ this.week_day_names[this.page_date.getDay()] }
			`;
		}
	}
});