Vue.component('last-days', {
	props: ['last_days_posts'],
	template: `
		<div v-if="last_days_posts">
			<header>Записи за последнюю неделю:</header>
			<article>
				<div v-for="post in last_days_posts" class="note">
					<div class="date">{{post.date}}</div>
					<div class="text-preview">{{post.text}}</div>
				</div>
			</article>
		</div>
	`
});