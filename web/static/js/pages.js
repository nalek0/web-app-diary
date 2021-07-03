class Page {
	constructor(name, title, args = [], onstart = () => {}, onfinish = () => {}) {
		this.name 		= name;
		this.title 		= title;
		this.onstart 	= onstart;
		this.onfinish 	= onfinish;

		this.args 		= args;
	}

	render_template() {
		let template_args = "";
		for (let arg of this.args) {
			template_args += ` :${arg}="this.page_data.${arg}" `
		}

		return `<${this.name}
			v-if="page_client && page_client.active_page && page_client.active_page.name === '${this.name}'"
			:last_days_posts="last_days_posts"
			:page_client="page_client"
			${template_args}
		></${this.name}>`;
	}
}

class PageClient {
	constructor() {
		this.pages 			= {};
		this.active_page 	= undefined;

		this.default_active_page_name = 'last-days';
	}

	add_page(page) {
		this.pages[page.name] = page;
	}

	render_template() {
		let template = "";
		template += "<div class='page'>";
			for (let page_name in this.pages) {
				template += this.pages[page_name].render_template();
			}
		template += "</div>";
		return template;
	}

	change_page(name, data = {}) {
		if (this.pages[name]) {
			this.active_page.onfinish();
			this.active_page = this.pages[name];
			for (let key in data) {
				app.page_data[key] = data[key];
			}
			this.active_page.onstart(data);
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
		args 	= [],
		onstart = async data => {
			app.last_days_posts = await eel.get_last_days_posts(7)();
		}
	)
);
pageClient.add_page(
	new Page(
		name 	= 'day',
		title 	= 'День',
		args 	= ['year', 'month', 'day', 'text'],
		onstart = async data => {
			app.page_data.text = await eel.get_text(data.year, data.month, data.day)();
		},
		onfinish = () => {
			app.page_data.text = undefined;
		}
	)
);


Vue.component('page', {
	props: ['last_days_posts', 'page_client', 'page_data'],
	template: pageClient.render_template()
});