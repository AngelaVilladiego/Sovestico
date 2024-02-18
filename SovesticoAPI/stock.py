from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv, find_dotenv
from search import generate_response
import urllib
import os

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

def stock_rec(filters : list = []) -> dict:
    """
    Get stock recommendation from Sovestico API
    //request arguments: a list of principles to filter by
    // returns: paginated data of top suggestions
    {
        suggestions:
            [
                {
                    symbol: "",
                    name: "",
                    price: 0.0,
                    change: -0.07,
                    strongestPrinciple: "",
                    weakestPrinciple: "",
                    esg: 0,
                    stockData: [//dependent on what API we decide to use]
                },
                ...
            ]
    }
    """
    finder = {"$or": []}
    sorting = [('esg_score', pymongo.DESCENDING)]
    for principle in filters:
        if principle == 'vice_products' or principle == 'catholic_values' or principle == 'military_involvements' or principle == 'ethical_concerns' or principle == 'health_impact':
            finder['$or'].append({principle: False})
        else:
            sorting.append((principle, pymongo.DESCENDING))
    if len(finder['$or']) == 0:
        return stocks_collection.find().sort(sorting).limit(10)
    return dumps(list(stocks_collection.find(finder).sort(sorting).limit(10)))

def get_stock_data(ticker: str, filters: list) -> dict:
    """
    Get stock data from Alpha Vantage API
    request arguments: the symbol of the stock
    returns: the in depth information of the stock including:
        name and other basic stock information like data,
        strongestPrinciple and source/reasoning for strongest principle as a short blurb,
        weakestPrinciple and source/reasoning for weakest principle as a short blurb,
        relevant news articles, 
        summary of relevant news articles,
        summary from our chatbot about why it suggests this,
        in depth data about change and growth,
    """
    output = stocks_collection.find_one({"_id": ticker})
    query = "Explain " + ticker + " in terms of its ESG impact, strength and weaknesses as well as why it is successful regarding"
    for fil in filters:
        query += " " + fil
    response = generate_response(query)

    output['response'] = response[0]
    output['citation'] = response[1]
    return output