const getPreviousDay = day => {
	return new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);
}
const getNextDay = day => {
	return new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
}

Vue.component('calendar', {
	props: ['year', 'month'],
	template: `
		<main id="calendar">
			<header v-if="current_month" class="page_block">Текущий месяц:</header>
			<header v-else class="page_block">{{this.month}} / {{this.year}}</header>
			<article class="beautiful_scrollbar">
				<div class="calendar_part btn-part">
					<img 
						class="cal-btn" 
						alt="Go Left"
						src="/static/svg/left-arrow.svg"
						@click="change_month('left')">
				</div>
				<div class="calendar_part">
					<div class="calendar">
						<div 
							v-for="week in calendar_weeks"
							class="week">
							<div 
								v-for="day in week"
								:class="'page_block day' + ((day.month !== first_day_month.month)? ' other_month': '')"
								@click="change_page('day', day)">
								{{day.day}}
							</div>
						</div>
					</div>
				</div>
				<div class="calendar_part btn-part">
					<img 
						class="cal-btn"
						alt="Go Right"
						src="/static/svg/right-arrow.svg"
						@click="change_month('right')">
				</div>
			</article>
		</main>
	`,
	computed: {
		calendar_weeks() {
			let first_day_month = new Date(
				this.year, 
				this.month - 1, 
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
				first_day_month.getMonth() === curr_day.getMonth() || 
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
		first_day_month() {
			let day = new Date(this.year, this.month - 1, 1);
			return {
				week_day: 	day.getDay(),
				day: 		day.getDate(),
				month: 		day.getMonth() + 1,
				year: 		day.getYear()
			};
		},
		current_month() {
			return (this.year === new Date().getFullYear() && this.month === new Date().getMonth() + 1);
		}
	},
	methods: {
		change_page(name, data={}) { 
			pageClient.change_page(name, data); 
		},
		change_month(way) {
			if (way === 'left') {
				let new_date = new Date(this.year, this.month - 2, 1);
				app.page_data.year = new_date.getFullYear();
				app.page_data.month = new_date.getMonth() + 1;
			}
			else if (way === 'right') {
				let new_date = new Date(this.year, this.month, 1);
				app.page_data.year = new_date.getFullYear();
				app.page_data.month = new_date.getMonth() + 1;
			}
		}
	}
});