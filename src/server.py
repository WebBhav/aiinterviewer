
import json
from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

knowledge_context = """Vaibhav Singhal is a Product Manager with experience at JustBaat AI, 
where he launched engagement products generating $300K in revenue. 
He built a D2C review marketplace and pivoted it into a WhatsApp Community Monetization Platform. 
He led end-to-end development of platforms including an AI Content Generator. 
He has interned at B.S. Geartech Pvt. Ltd. and UnSchool, and has completed projects like BigBasket Now improvements 
and a BAAS product for college traders."""

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("prompt")
    prompt = f"Based on this background: {knowledge_context}\nUser: {user_input}\nRespond as Vaibhav would."
    response = model.generate_content(prompt)
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)
