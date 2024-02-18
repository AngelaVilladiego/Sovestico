# This file should contain only immediate API endpoints. 
# You can run it with the command "python -m flask run"
# Please create new files as needed to separate your relevant code

from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
from bson.objectid import ObjectId
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
import requests
import csv
import urllib.parse

app = Flask(__name__)
CORS(app)

load_dotenv()
mongo_pwd = os.getenv('MONGO_PWD')
mongo_pwd = urllib.parse.quote_plus(mongo_pwd)
mongo_user = os.getenv('MONGO_USER')
mongo_user = urllib.parse.quote_plus(mongo_user)
uri = 'mongodb+srv://%s:%s@sovestico.lngt1xe.mongodb.net/?retryWrites=true&w=majority' % (mongo_user, mongo_pwd)
print(uri)
client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.sovestico

stocks_collection = db.stocks

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/addBaseRecords", methods=['GET'])
def addBaseRecords():
    res = []    
     
    # Open a csv reader called DictReader
    with open("./stock_db.csv", encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary 
        # and add it to data
        for rows in csvReader:
             
            # Assuming a column named 'No' to
            # be the primary key
            data = {}
            key = rows['symbol']
            data["_id"] = key
            data.update(rows)
            res.append(data)
 
    stocks_collection.insert_many(res)
    return ""