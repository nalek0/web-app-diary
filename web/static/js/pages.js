class Page {
	constructor(name, title, onstart = () => {}, onfinish = () => {}) {
		this.name 		= name;
		this.title 		= title;
		this.onstart 	= onstart;
		this.onfinish 	= onfinish;
	}

	render_template() {
		return `<${this.name}
			v-if="page_client && page_client.active_page && page_client.active_page.name === '${this.name}'"
			:last_days_posts="last_days_posts"
		></${this.name}>`;
	}

	get_link() {
		return `
			<div 
				class="nav-button" 
				@click="page_client.change_page('${this.name}')"
				title="${this.title}"
			>${this.title}</div>
		`;
	}
}

class PageClient {
	constructor() {
		this.pages 			= {};
		this.active_page 	= undefined;

		this.default_active_page_name = 'set-day';
	}

	add_page(page) {
		this.pages[page.name] = page;
	}

	render_template() {
		let template = "";
		template += "<div class='main'>";
			template += "<nav>";
				for (let page_name in this.pages) {
					template += this.pages[page_name].get_link();
				}
			template += "</nav>";
			template += "<main>";
				for (let page_name in this.pages) {
					template += this.pages[page_name].render_template();
				}
			template += "</main>";
		template += "</div>";
		return template;
	}

	change_page(name) {
		if (this.pages[name]) {
			this.active_page.onfinish();
			this.active_page = this.pages[name];
			this.active_page.onstart();
		}
		else {
			console.log('Error, no page with name ' + name);
		}
	}

	set_active_page() {
		this.active_page = this.pages[this.default_active_page_name];
		this.active_page.onstart();
	}
}

var pageClient = new PageClient();
pageClient.add_page(
	new Page(
		name 	= 'last-days', 
		title 	= 'Последние дни',
		onstart = async () => {
			app.last_days_posts = await eel.get_last_days_posts(7)();
		}
	)
);
pageClient.add_page(
	new Page(
		name 	= 'set-day', 
		title 	= 'Сделать запись в дневник'
	)
);


Vue.component('page', {
	props: ['last_days_posts', 'page_client'],
	template: pageClient.render_template()
});