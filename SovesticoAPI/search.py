from langchain.retrievers.tavily_search_api import TavilySearchAPIRetriever
from langchain.retrievers import ContextualCompressionRetriever, CohereRagRetriever
from langchain_community.chat_models import ChatCohere

import getpass
import os
import dotenv
dotenv.load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

def generate_response(query: str)-> list:
    retriever = TavilySearchAPIRetriever(k=3)
    documents = retriever.invoke(query)

    cohere_chat_model = ChatCohere(model="command")    
    # Create the cohere rag retriever using the chat model 
    rag = CohereRagRetriever(llm=cohere_chat_model)
    docs = rag.get_relevant_documents(
        query,
        source_documents=documents,
    )

    output = ''
    answer = docs[-1].page_content 
    output += answer + '\n'
    output += '\n' + 'Citations: ' + '\n'
    citations = documents[0].metadata['title'] + '\n' + documents[0].metadata["source"] + '\n' + documents[1].metadata['title']  + '\n' + documents[1].metadata["source"] + '\n' + documents[2].metadata['title']  + '\n' + documents[2].metadata["source"] + '\n'
    return [output, citations]