# Chatbot LLM

## Installation
### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Setup Instructions
- Clone the Repository:
```bash
Copy code
git clone https://github.com/yourusername/trend-summarizer.git
cd trend-summarizer
```

- Create and Activate a Virtual Environment:
```bash
Copy code
python -m venv chatbot
source chatbot/bin/activate
```

- Install Dependencies:

```bash
Copy code
pip install -r requirements.txt
```
- Set Up Environment Variables:

  Create a .env file in the project root and add your API keys:

```bash
Copy code
touch .env
```
- Add the following to your .env file:

```env
Copy code
NEWS_API_KEY=your_news_api_key
```
- Run the Flask Application:

```bash
Copy code
python app.py
```
- Access the Application:

  Open your browser and navigate to http://127.0.0.1:5000/.