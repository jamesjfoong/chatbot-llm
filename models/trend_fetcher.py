from pytrends.request import TrendReq
from newsapi import NewsApiClient
import os

# Initialize the News API client
newsapi = NewsApiClient(api_key=os.getenv('NEWS_API_KEY'))

def fetch_trends(country='', keywords=''):
    pytrends = TrendReq(hl='en-US', tz=360)

    # If a country is specified, use that for trending searches
    if country:
        trending_searches_df = pytrends.trending_searches(pn=country.lower())
    else:
        trending_searches_df = pytrends.trending_searches()  # Default to global

    # Filter by keywords if provided
    if keywords:
        trending_searches_df = trending_searches_df[trending_searches_df[0].str.contains(keywords, case=False)]

    trends_list = trending_searches_df[0].tolist()
    trends_text = ' '.join(trends_list)

    print(f"Fetched trending data: {trends_text}")

    return trends_text

def fetch_news(trends_list):
    # Use the top trend to fetch related news articles
    news_articles = []
    for trend in trends_list[:5]:  # Limit to top 5 trends
        articles = newsapi.get_everything(q=trend, language='en', sort_by='relevancy', page_size=5)
        for article in articles['articles']:
            news_articles.append({
                'title': article['title'],
                'description': article['description'],
                'url': article['url']
            })
    return news_articles