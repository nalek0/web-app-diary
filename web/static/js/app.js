var app = new Vue({
	el: "#app",
	data: {
		page_client: 		pageClient,
		last_days_posts: 	undefined,

		page_data: {
			year: 	undefined,
			month: 	undefined,
			day: 	undefined,
			text: 	undefined,
		}
	}
});

pageClient.start();