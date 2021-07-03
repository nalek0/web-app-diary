const getPreviousDay = day => {
	return new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
}
const getNextDay = day => {
	return new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
}

Vue.component('calendar', {
	props: [],
	template: `
		<main id="calendar" class="beautiful_scrollbar">
			<header class="page_block">Календарь записей:</header>
			<article>
				<div 
					v-for="week in calendar_weeks"
					class="week">
					<div 
						v-for="day in week"
						:class="'page_block day' + ((day.month !== today.month)? ' other_month': '')"
						@click="change_page('day', day)">
						{{day.day}}
					</div>
				</div>
			</article>
		</main>
	`,
	computed: {
		calendar_weeks() {
			let today = new Date();
			let first_day_month = new Date(
				today.getFullYear(), 
				today.getMonth(), 
				1
			);
			let first_day = new Date(
				first_day_month.getFullYear(), 
				first_day_month.getMonth(), 
				first_day_month.getDate() - first_day_month.getDay() + 1
			);

			let weeks = [];
			let last_week_ind = -1;

			let curr_day = new Date(
				first_day.getFullYear(), 
				first_day.getMonth(), 
				first_day.getDate()
			);

			while (
				today.getMonth() === curr_day.getMonth() || 
				first_day.getMonth() === curr_day.getMonth() ||
				curr_day.getDay() !== 1) {
				if (curr_day.getDay() === 1) {
					weeks.push([]);
					last_week_ind++;
				}

				weeks[last_week_ind].push({
					week_day: 	curr_day.getDay(),
					day: 		curr_day.getDate(),
					month: 		curr_day.getMonth() + 1,
					year: 		curr_day.getFullYear()
				});

				curr_day = getNextDay(curr_day);
			}
			
			console.log(weeks);
			
			return weeks;
		},
		today() {
			let today = new Date();
			return {
				week_day: 	today.getDay(),
				day: 		today.getDate(),
				month: 		today.getMonth() + 1,
				year: 		today.getYear()
			};
		}
	},
	methods: {
		change_page(name, data={}) { 
			console.log(data);
			pageClient.change_page(name, data); 
		}
	}
});