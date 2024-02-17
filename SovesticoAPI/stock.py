def get_stock_data(stock_symbol: str) -> dict:
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
    # API Key

def get_stock_news(stock_symbol: str) -> dict:
    """
    Get stock news from News API
    """
    # API Key
    