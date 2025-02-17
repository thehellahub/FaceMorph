import os
import re
import glob
import pandas as pd
import numpy as np
import json
from flask import Flask, render_template, Blueprint, request, send_from_directory, send_file, flash, Blueprint, g, session, app, current_app
from flask_wtf import Form
from BLL.BLL import BusinessLogicLayer
from bs4 import BeautifulSoup as bs
from werkzeug.utils import secure_filename
from pathlib import Path


webapp_api = Blueprint("webapp_api",
					__name__,
					template_folder="templates",
					static_folder="static",
					static_url_path="/static"
					)

bll = BusinessLogicLayer()

def get_js__and_css_source():

	# Add js files here as you create them
	js_files = ['init.js','history.js','faces.js','nick.js', 'resources.js', 'mdbFsscroller.min.js']

	css_files = ['style.css']

	this_files_dir = os.path.dirname(os.path.abspath(__file__))
	this_files_dir =f'{this_files_dir}/../'

	js_source = ""
	for js_filename in js_files:
		js_path = os.path.join(this_files_dir, "static", js_filename)
		with open(js_path, "r") as f:
			js_source += f.read()

	css_source = ""
	for css_filename in css_files:
		css_path = os.path.join(this_files_dir, "templates", css_filename)
		with open(css_path, "r") as f:
			css_source += f.read()

	return js_source, css_source

@webapp_api.route("/")
def go():
	js_source, css_source = get_js__and_css_source()

	return render_template("index.html.j2",
							js_source=js_source,
							css_source=css_source
							)

@webapp_api.route("/load-profile", methods=["POST"])
def load_profile_html():	
	#js_source, css_source = get_js__and_css_source()
	member = request.form["member"]
	return json.dumps(render_template(member + ".html.j2"))

@webapp_api.route("/test", methods=["GET"])
def test():	
	return_dict = dict(())
	return_dict['message'] = "hello world"
	return json.dumps(return_dict)

@webapp_api.route("/load-page", methods=["POST"])
def load_page_html():	
	page = request.form["page"]
	return json.dumps(render_template(page + ".html.j2"))


@webapp_api.route("/face-morph", methods=["POST"])
def face_morph():	
	img1 = request.form["img1"]
	img2 = request.form["img2"]
	#opacity = request.form["opacity"]
	return json.dumps(bll.face_morph(img1,img2))

@webapp_api.route("/face-swap", methods=["POST"])
def face_swap():	
	img1 = request.form["img1"]
	img2 = request.form["img2"]
	return json.dumps(bll.face_swap(img1,img2))

@webapp_api.route("/funny-mirrors", methods=["POST"])
def funny_mirrors():	
	img = request.form["img"]
	effect = request.form["effect"]
	return json.dumps(bll.funny_mirrors(img,effect))

@webapp_api.route('/download-nhella-resume',methods = ['GET'])
def download_nhella_resume():
	path_to_nhella_resume =f"{os.getcwd()}/Resumes/Nhella_Resume.pdf"

	return send_file(path_to_nhella_resume,
					 mimetype='pdf',
					 as_attachment=True)