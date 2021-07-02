import eel

@eel.expose
def get_last_days_posts(number):
	return [
		{
			'date': "Today",
			'text': "Some text asdjkasjd kasj ld jasdjk lasjkldj kasjdkl asjkldj askj dkljaskdj klasjkld jkl"
		},
		{
			'date': "Yesterday",
			'text': "Some text asdjkasjd kasj ld jasdjk lasjkldj kasjdkl asjkldj askj dkljaskdj klasjkld jkl"
		}
	]

eel.init('web')
eel.start(
	'index.html',
	size=(900, 600))