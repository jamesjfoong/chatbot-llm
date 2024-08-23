from langchain_community.llms import Ollama
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

ollama_model = Ollama(model="llama3")

prompt_template = PromptTemplate(
    input_variables=["text"],
    template="Summarize the following trending data:\n\n{text}\n\nSummary:"
)

# Create a summarization chain
summarization_chain = LLMChain(
    llm=ollama_model,
    prompt=prompt_template
)

def summarize_text(text):
    summary = summarization_chain.run(text)
    return summary
