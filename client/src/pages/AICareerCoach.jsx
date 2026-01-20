import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// Note: In a production app, this should be handled via a backend proxy to hide the API key
const API_KEY = "AIzaSyAo6-_ZfOMKSXz057QFhsd76T_Df9VPuSg";
const genAI = new GoogleGenerativeAI(API_KEY);

const AICareerCoach = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Career Coach. How can I help you with your career today?", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call Gemini API
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      // Prepare chat history for context (optional, but good for chat experience)
      // Converting last few messages to Gemini format
      // Gemini requires history to start with a 'user' role
      const historyMessages = messages.filter(msg => msg.id !== 1); // Exclude the initial AI greeting
      const history = historyMessages.slice(-10).map(msg => ({
        role: msg.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(inputText);
      const response = await result.response;
      const text = response.text();

      const aiResponse = { 
        id: Date.now() + 1, 
        text: text, 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorResponse = { 
        id: Date.now() + 1, 
        text: "I'm sorry, I encountered an error while processing your request. Please try again later.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">AI Career Coach</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto p-4">
        <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? 'bg-blue-100' : 'bg-indigo-100'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICareerCoach;