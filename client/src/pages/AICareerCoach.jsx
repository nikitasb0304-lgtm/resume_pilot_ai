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
    <div className="flex flex-col h-screen bg-[#0f172a] text-white">
      <header className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">AI Career Coach</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto p-4">
        <div className="flex-1 overflow-y-auto bg-white/5 rounded-xl shadow-xl border border-white/10 p-6 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user' ? 'bg-blue-500/20' : 'bg-indigo-500/20'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Bot className="w-5 h-5 text-indigo-400" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5">
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

        <div className="mt-4 bg-white/5 p-4 rounded-xl shadow-lg border border-white/10">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/20"
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
