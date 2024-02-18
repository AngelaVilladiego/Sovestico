from langchain import hub
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.pydantic_v1 import BaseModel, Field
from langchain.tools import BaseTool, StructuredTool, tool
from langchain_openai import ChatOpenAI
from search import generate_response
import alpaca_trade_api as tradeapi
import os

from dotenv import load_dotenv
load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ALPACA_API_KEY = os.getenv("ALPACA_API_KEY")
ALPACA_SECRET_KEY = os.getenv("ALPACA_SECRET_KEY")

# API Info for fetching data, portfolio, etc. from Alpaca
BASE_URL = "https://paper-api.alpaca.markets"

# Instantiate REST API Connection
api = tradeapi.REST(key_id=ALPACA_API_KEY, secret_key=ALPACA_SECRET_KEY, 
                    base_url=BASE_URL, api_version='v2')

@tool
def buy_stock(ticker: str, amount: int) -> str:
    """
    This function buys a stock with the given ticker and amount on Alpaca API
    ticker: the stock symbol
    amount: the amount of stock to buy
    """
    api.submit_order(symbol=ticker, qty=amount, side='buy', type='market', time_in_force='day')
    return f"Buying {amount} shares of {ticker}"

@tool
def sell_stock(ticker: str, amount: int) -> str:
    """
    This function sell a stock with the given ticker and amount on Alpaca API
    ticker: the stock symbol
    amount: the amount of stock to sell
    """
    api.submit_order(ticker, amount, 'sell', 'market', 'day')
    return f"Selling {amount} shares of {ticker}"

def respondToQuery(ticker, query):
    #ticker may be "None"
    #query is the user's question
    if ticker != None:
        query = f"The query is on {ticker}, {query}"
    
    prompt = hub.pull("hwchase17/openai-functions-agent")
    llm = ChatOpenAI(model="gpt-3.5-turbo-1106")
    tools = [TavilySearchResults(), buy_stock, sell_stock]

    # Construct the OpenAI Functions agent
    agent = create_openai_functions_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    response = agent_executor.invoke({"input": query})
    return response