# This file should contain only immediate API endpoints. 
# You can run it with the command "python -m flask run"
# Please create new files as needed to separate your relevant code

from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
from bson.objectid import ObjectId
from pymongo import MongoClient
import json
import requests

app = Flask(__name__)
CORS(app)

load_dotenv(find_dotenv())
mongo_pwd = os.getenv('MONGO_PWD')
mongo_user = os.getenv('MONGO_USER')

client = MongoClient(
    f'mongodb+srv://{mongo_user}:{mongo_pwd}@sovestico.lngt1xe.mongodb.net/?retryWrites=true&w=majority')
db = client.main



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"