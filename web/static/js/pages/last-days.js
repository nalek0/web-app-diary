Vue.component('last-days', {
	props: ['last_days_posts'],
	template: `
		<div id="last_days_page" v-if="last_days_posts">
			<header class="page_block">Записи за последнюю неделю:</header>
			<article>
				<div v-for="post in last_days_posts" class="note page_block">
					<div class="date">{{post.date}}</div>
					<div v-if="post.text" class="text-preview">{{post.text}}</div>
					<div v-else class="text-preview">Ничего не написано в этот день</div>
				</div>
			</article>
		</div>
	`
});