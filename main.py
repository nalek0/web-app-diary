import eel
from datetime import datetime, timedelta
import json


class Database:
    _instance = None

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

    @staticmethod
    def get_instance():
        if Database._instance is None:
            Database._instance = Database()
        return Database._instance


class Settings:
    _instance = None

    def __init__(self):
        self.settings = None
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
        self.settings['wallpaper'] = 'wallpaper.jpg'
        self.settings['folder'] = 'web'

    def get(self, setting: str):
        return self.settings[setting]

    def update(self):
        with open('settings.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.settings, indent=4))

    def get_style(self):
        return """
            <style>
                :root {
                    --color1_r: %s;
                    --color1_g: %s;
                    --color1_b: %s;
                    --color2_r: %s;
                    --color2_g: %s;
                    --color2_b: %s;
                    --wallpaper: %s;
                }
            </style>""" % (self.settings['main_color']['r'],
                           self.settings['main_color']['g'],
                           self.settings['main_color']['b'],
                           self.settings['highlight_color']['r'],
                           self.settings['highlight_color']['g'],
                           self.settings['highlight_color']['b'],
                           "url('/static/img/" + self.settings['wallpaper'] + "')")

    @staticmethod
    def get_instance():
        if Settings._instance is None:
            Settings._instance = Settings()
        return Settings._instance


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
            'text': Database.get_instance().get_text(day)
        })
        day -= delta

    return return_list


@eel.expose
def set_text(year: int, month: int, day: int, text: str):
    Database.get_instance().set_text(datetime(int(year), int(month), int(day)), text)
    Database.get_instance().update()


@eel.expose
def get_text(year: int, month: int, day: int):
    text = Database.get_instance().get_text(datetime(int(year), int(month), int(day)))
    if text is None:
        return ""
    else:
        return text


if __name__ == "__main__":
    eel.init(Settings.get_instance().get('folder'))

    with open(f'{Settings.get_instance().get("folder")}/index.html', 'w', encoding='utf-8') as index:
        with open(f'{Settings.get_instance().get("folder")}/template.html', 'r', encoding='utf-8') as template:
            index.write(template.read().format(colors_style=Settings.get_instance().get_style()))

    eel.start(
        'index.html',
        size=(1100, 650))
