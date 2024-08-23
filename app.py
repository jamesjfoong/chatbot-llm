from flask import Flask, request, render_template, jsonify
from models.llama_model import summarize_text
from models.trend_fetcher import fetch_news, fetch_trends
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
  return render_template("index.html")

@app.route('/summarize', methods=['POST'])
def summarize():
    country = request.form.get('country', '')
    keywords = request.form.get('keywords', '')

    # Fetch trends
    trends_list, trends_text = fetch_trends(country=country, keywords=keywords)

    # Fetch news based on trends
    news_articles = fetch_news(trends_list)

    # Combine all news descriptions for summarization
    combined_text = ' '.join([article['description'] for article in news_articles if article['description']])

    # Summarize the fetched news articles
    summary = summarize_text(combined_text)

    return jsonify({'summary': summary, 'news': news_articles})

def start():
  app.run(host="0.0.0.0", port=5000, debug=True)

if __name__ == "__main__":
  start()

