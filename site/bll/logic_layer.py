from bll import WeatherData
from bll.FaceMorph.faceMorph import FaceMorph
from object_access_file import Object_Access

class LogicLayer:

	def __init__(self):
		self._oa = Object_Access()


	def nicks_get_weather_data(self,zip_code):
		return WeatherData.WeatherData(self._oa).nicks_query_by_zip_api_function(zip_code)

	def face_morph(self,img1,img2):
		return FaceMorph.main(img1,img2)