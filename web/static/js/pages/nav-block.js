Vue.component('nav-block', {
	props: ['page_client'],
	template: `
		<nav class="page_block">
			<div class="nav_header">
				Diary
			</div>
			<div class="nav_buttons">
				<div
					v-for="page in pages"
					:class="'nav_button' + ((page_client && page_client.active_page && page.name === page_client.active_page.name)? ' active': '')" 
					@click="change_page(page.name)" 
					:data-page="page.name">{{page.text}}</div>
			</div>
		</nav>
	`,
	methods: {
		change_page(name) { pageClient.change_page(name); }
	},
	data() {
		return {
			pages: [
				{
					name: 'last-days',
					text: 'Последние дни'
				},
				{
					name: 'set-day',
					text: 'Сделать запись'
				}
			]
		}
	}
});