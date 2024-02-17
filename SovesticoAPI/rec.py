import pandas as pd

def get_individual_stock_data(stock_symbol: str) -> dict:
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
    pass

def stock_rec(stock_symbol: str) -> dict:
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
    # get stocks from SP500.csv
    sp_df = pd.read_csv('SP500.csv')
