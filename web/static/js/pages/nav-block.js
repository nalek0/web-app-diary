Vue.component('nav-block', {
	props: ['page_client'],
	template: `
		<nav class="page_block">
			<div class="nav_buttons">
				<div
					v-for="page in pages"
					:class="'nav_button' + ((page_client && page_client.active_page && page.name === page_client.active_page.name)? ' active': '')" 
					@click="change_page(page.name, page.data)" 
					:data-page="page.name">{{page.text}}</div>
			</div>
		</nav>
	`,
	methods: {
		change_page(name, data={}) { 
			pageClient.change_page(name, data); 
		}
	},
	data() {
		return {
			pages: [
				{
					name: 'last-days',
					text: 'Последние дни',
					data: {}
				},
				{
					name: 'day',
					text: 'Сделать запись',
					data: {
						year: 	new Date().getFullYear(),
						month: 	new Date().getMonth() + 1,
						day: 	new Date().getDate()
					}
				}
			]
		}
	}
});