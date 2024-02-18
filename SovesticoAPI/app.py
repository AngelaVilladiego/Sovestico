# This file should contain only immediate API endpoints. 
# You can run it with the command "python -m flask run"
# Please create new files as needed to separate your relevant code

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
from bson.objectid import ObjectId
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import csv
import urllib.parse
from chat import *
from stock import *
from bson.json_util import dumps
from codecs import encode
import json

import re


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

@app.route("/queryTico", methods=['POST'])
def queryTico():
    data = request.json
    ticker = data.get("symbol")
    if not ticker:
        ticker = None

    query = data.get("query")

    response = respondToQuery(ticker, query)

    return jsonify(response)

@app.route("/getRecommendations", methods=['POST'])
def getRecommendations():
    data = request.json
    filters = data.get('filters')
    res = stock_rec(filters)
    res = json.loads(res)

    for i, r in enumerate(res):
        
        print("\n")
        price_history = r["price_history"]

        s = r["price_history"]
        s2 = s.replace("'", "")
        s3 = re.sub('(\w+)', '"\g<1>"', s2)
        regex = r'"\."'
        s4 = re.sub(regex, ".", s3, 0, re.MULTILINE)

        
        price_history = json.loads(s4)

        for k, v in price_history["Close"].items():
            price_history[k] = float(v)

        print(price_history)

        res[i]["price_history"] = price_history

    print(res)

    return res

