Vue.component('last-days', {
	props: ['last_days_posts', 'page_client'],
	template: `
		<main id="last_days_page" class="beautiful_scrollbar">
			<header class="page_block">Записи за последнюю неделю:</header>
			<article>
				<div 
					v-for="post in last_days_posts" 
					class="note page_block"
					@click="change_page('day', post.date)" >
					<div class="date">{{stringfy_date(post.date)}}</div>
					<div v-if="post.text" class="text-preview">{{post.text}}</div>
					<div v-else class="text-preview"><i>Ничего не написано в этот день</i></div>
				</div>
			</article>
		</main>
	`,
	methods: {
		stringfy_date(date) {
			return `${date.day}/${date.month}/${date.year}`;
		},
		change_page(name, data={}) { 
			console.log()
			pageClient.change_page(name, data); 
		}
	}
});