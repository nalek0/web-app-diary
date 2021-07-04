import eel
from datetime import datetime, timedelta
import json


class Database:
	def __init__(self):
		try:
			with open('database.json', 'r', encoding='utf-8') as f:
				self._database = json.load(f)
		except FileNotFoundError:
			with open('database.json', 'w', encoding='utf-8') as f:
				f.write('{}')
			with open('database.json', 'r', encoding='utf-8') as f:
				self._database = json.load(f)

	def update(self):
		with open('database.json', 'w', encoding='utf-8') as f:
			f.write(json.dumps(self._database, indent=4))

	def set_text(self, dt: datetime, text: str):

		self._database[str(dt.date())] = text

	def get_text(self, dt: datetime):
		if str(dt.date()) in self._database:
			return self._database[str(dt.date())]
		else:
			return None
database = Database()


class Settings:
	def __init__(self):
		try:
			self.load_file()
		except FileNotFoundError:
			self.set_default()
			self.update()

	def load_file(self):
		with open('settings.json', 'r', encoding='utf-8') as f:
			self.settings = json.load(f)

	def set_default(self):
		self.settings = json.loads("{}")
		self.settings['highlight_color'] = {
			'r': 181,
			'g': 162,
			'b': 130
		}
		self.settings['main_color'] = {
			'r': 14,
			'g': 18,
			'b': 72
		}
		self.settings['wallpaper'] 	= 'wallpaper.jpg'
		self.settings['folder'] 	= 'web'

	def get(self, setting: str):
		return self.settings[setting]
	
	def update(self):
		with open('settings.json', 'w', encoding='utf-8') as f:
			f.write(json.dumps(self.settings, indent=4))

	def get_style(self):
		return_style = "" 																								\
			+ "<style>" 																								\
			+ ":root {" 																								\
			+ "--color1_r: {color};".format(color = self.settings['main_color']['r']) 									\
			+ "--color1_g: {color};".format(color = self.settings['main_color']['g']) 									\
			+ "--color1_b: {color};".format(color = self.settings['main_color']['b']) 									\
			+ "--color2_r: {color};".format(color = self.settings['highlight_color']['r']) 								\
			+ "--color2_g: {color};".format(color = self.settings['highlight_color']['g']) 								\
			+ "--color2_b: {color};".format(color = self.settings['highlight_color']['b']) 								\
			+ "--wallpaper: {wallpaper};".format(wallpaper = "url('/static/img/" + self.settings['wallpaper'] + "')") 	\
			+ "}" 																										\
			+ "</style>"
		return return_style
settings = Settings()


@eel.expose
def get_last_days_posts(number: int):
	return_list = []

	today = datetime.now()
	day = today
	delta = timedelta(days=1)

	for i in range(number):
		return_list.append({
			'date': {
				'year':     day.year,
				'month':    day.month,
				'day':      day.day
			},
			'text': database.get_text(day)
		})
		day -= delta

	return return_list


@eel.expose
def set_text(year: int, month: int, day: int, text: str):
	database.set_text(datetime(int(year), int(month), int(day)), text)
	database.update()


@eel.expose
def get_text(year: int, month: int, day: int):
	text = database.get_text(datetime(int(year), int(month), int(day)))
	if text is None:
		return ""
	else:
		return text


if __name__ == "__main__":
	eel.init(settings.get('folder'))

	with open(f'{settings.get("folder")}/index.html', 'w', encoding='utf-8') as index:
		with open(f'{settings.get("folder")}/template.html', 'r', encoding='utf-8') as template:
			index.write(template.read().format(colors_style = settings.get_style()))
	eel.start(
		'index.html', 
		size=(1100, 650))
