import pprint
import pgeocode
from darksky.api import DarkSky, DarkSkyAsync
from darksky.types import languages, units, weather
from datetime import datetime as dt
from darksky import forecast
from datetime import date, timedelta, time
import time
import pandas as pd
import ast

class WeatherData:

	def __init__(self, _access_object):

		self._access_object = _access_object

	def nicks_query_by_zip_api_function(self,zip_code):

		# get longitude and latitude for zip code
		nomi = pgeocode.Nominatim('us')
		latitude = float(nomi.query_postal_code(str(zip_code)).latitude)
		longitude = float(nomi.query_postal_code(str(zip_code)).longitude)

		state = nomi.query_postal_code(str(zip_code)).state_name
		city = nomi.query_postal_code(str(zip_code)).place_name
		accuracy = nomi.query_postal_code(str(zip_code)).accuracy

		# # PLEASE MAKE YOUR OWN API KEY AT darksky.net
		# # Each API key limited to 1000 calls per day 
		# # If we each make our own API keys, we can get 4000 calls / day
		
		# # API key
		API_KEY = self._access_object.return_nicks_api_key()

		try:
			data = list(())
			my_location = latitude, longitude
			weekday = date.today()
			summary_report = ""
			with forecast(API_KEY, *my_location) as location:
				#print(location.daily.summary, end='\n---\n')
				for day in location.daily:
					day = dict( date = date.strftime(weekday,"%m/%d/%Y, %H:%M:%S"),
								date_short = date.strftime(weekday,"%m/%d/%Y"),
								js_date = WeatherData.date_to_millis(weekday),
								day = date.strftime(weekday, '%a'),
								sum = day.summary,
								tempMin = day.temperatureMin,
								tempMax = day.temperatureMax
								)

					summary_report += '<strong>{day} {date_short}:</strong> {sum} <br>Temperature Range: &nbsp;&nbsp;&nbsp;&nbsp; {tempMin} - {tempMax} ℉<br><br>'.format(**day)
					weekday += timedelta(days=1)
					data.append(day)

			df = pd.DataFrame(data) 

			# Sort df by column "date" in descending order
			df = df.sort_values(['date'], ascending=False)

			# Converting from Pandas Dataframe back to list of dicts for JS formatting
			data2 = df.T.to_dict().values()
			data2 = str(data2)
			data2 = data2[12:-1]
			data2 = ast.literal_eval(data2)
			data = data2

			return_data = 	{
							'_data':					data,
							'state':					state,
							'city': 					city,
							'weather_summary_report':	summary_report,
							'_result':					"success"	
							}

			return return_data

		except Exception as e:

			print("\n\n" + str(e) + "\n\n")	# debug string in console

			return_data = 	{
							'_data':					"Error",
							'state':					"Error",
							'city': 					"Error",
							'weather_summary_report':	"Error",
							'_result':					"Error"	
							}

			return return_data

	# Used for passing python date objects back to Javascript 
	# in a way that can easily be converted to Javascript Date Object
	def date_to_millis(d):
		"""Converts a datetime object to the number of milliseconds since the unix epoch."""
		return int(time.mktime(d.timetuple())) * 1000