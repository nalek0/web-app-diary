import eel
from datetime import datetime, timedelta
import json

class Database:
	def __init__(self):
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

@eel.expose
def get_last_days_posts(number: int):
	return_list = []

	today = datetime.now()
	day = today
	delta = timedelta(days=1)

	for i in range(number):
		str_day = ""
		if str(day.date()) == str(today.date()):
			str_day = 'Сегодня'
		elif str(day.date()) == str((today - delta).date()):
			str_day = 'Вчера'
		else:
			str_day = str(day.date())
		return_list.append({
			'date': str_day,
			'text': database.get_text(day)
		});
		day -= delta

	return return_list

@eel.expose
def set_text(year: int, month: int, day: int, text: str):
	database.set_text(
		datetime(int(year), int(month), int(day)), 
		text
	)
	database.update()

if __name__ == "__main__":
	eel.init('web')
	eel.start(
		'index.html',
		size=(900, 600))