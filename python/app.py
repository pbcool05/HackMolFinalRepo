from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Groq LLM
llm = ChatGroq(
    groq_api_key="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",
    model="llama3-8b-8192"
)

# Prompt with system and user
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful and friendly chatbot specialized in Indian Railways assistance."),
    ("user", "{input}")
])

# Chain = Prompt → LLM
chain: Runnable = prompt | llm

@app.route("/api/chat", methods=["POST", "GET"])
def chat():
    try:
        if request.method == "GET":
            user_input = request.args.get("message")
        else:
            data = request.json
            user_input = data.get("message")
        
        if not user_input:
            return jsonify({"error": "No message provided"}), 400
        
        result = chain.invoke({"input": user_input})
        return jsonify({
            "response": result.content
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)