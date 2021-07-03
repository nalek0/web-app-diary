const isInteger = string => string / 1 !== NaN;

Vue.component('day', {
	props: ['page_client', 'year', 'month', 'day', 'text'],
	template: `
		<div v-if="year && month && day" id="set_day_page" class="standart_page">
			<nav-block :page_client="page_client"></nav-block>
			<main class="beautiful_scrollbar">
				<header v-if="this.is_today" class="page_block">Сегодняшняя запись</header>
				<header v-else class="page_block">Запись {{ this.page_str_date }}</header>
				
				<article>
					<div class="form">
						<div>
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
					</div>
				</article>
			</main>
		</div>
	`,
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
			return this.page_date.toDateString();
		}
	}
});