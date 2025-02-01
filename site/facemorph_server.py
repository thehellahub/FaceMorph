import setproctitle
from gevent.pywsgi import WSGIServer
from ROUTES.api_routes import webapp_api # where the api magic happens
from flask import Flask, redirect, url_for, render_template, Blueprint, session, app, flash
import os


class FaceMorph:

	def __init__(self):
		self.debug = True

		self.hostname = 'FaceMorph'

		self.app = Flask(__name__)
		self.app.register_blueprint(webapp_api)

		self.app.config['UPLOAD_FOLDER'] = '/static/'
		self.app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

	def main(self):

		#For developers, use this
		self.app.run(debug=self.debug, host='127.0.0.1')

		# For server, use this
		# self.app.config['SERVER_NAME'] = 'facemorph.com:5000';# only for running on server with custom domain settings. See MISC/custom_local_domain_note.txt
		# self.app.run(debug=debug)

facemorph_server = FaceMorph()
facemorph_server.main()