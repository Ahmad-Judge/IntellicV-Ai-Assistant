// Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, RefreshCw } from 'lucide-react';
import { supabase } from '../supabaseClient'; // Import your Supabase client

const Chatbot = ({ resumeData, setResumeData }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message:
        "Hi! I'm IntellicV your AI resume assistant powered by GPT. I can help you update your resume naturally. Just tell me what you'd like to change - for example:\n• 'I want to change my job title to Data Scientist'\n• 'Add my internship at Google as a Software Engineering Intern'\n• 'Change my university to MIT in education'\n• 'I have a new skill: React Native'\n\nWhat would you like to update?"
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auth state
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const chatEndRef = useRef(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ...

const callGPTAPI = async (userMessage) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/update-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage, resumeData, model: 'gpt-3.5-turbo' })
    });

    const data = await response.json();
    if (data.resumeData) {
      setResumeData(data.resumeData);
    }
    return data.message || 'Unexpected response.';
  } catch (err) {
    console.error('Backend API Error:', err);
    return 'Error communicating with server. Please try again.';
  }
};


  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentMessage = inputMessage;
    setInputMessage('');

    const userMessage = { id: Date.now(), type: 'user', message: currentMessage };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await callGPTAPI(currentMessage);
      const botMessage = { id: Date.now() + 1, type: 'bot', message: aiResponse };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', message: 'Sorry, an error occurred.' }
      ]);
    }

    setIsTyping(false);
  };

  // Handle auth
  const handleAuth = async () => {
    let { data, error } = isLogin
      ? await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword })
      : await supabase.auth.signUp({ email: authEmail, password: authPassword });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError('');
      setUser(data.user);
      setShowAuthModal(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Handle enter press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {isLogin ? 'Login' : 'Sign Up'}
            </h2>

            {authError && <p className="text-red-500 text-sm mb-2">{authError}</p>}

            <input
              type="email"
              placeholder="Email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />

            <div className="flex justify-between items-center">
              <button
                onClick={handleAuth}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:underline text-sm"
              >
                {isLogin ? 'Create account' : 'Have an account? Login'}
              </button>
            </div>

            <button
              onClick={() => setShowAuthModal(false)}
              className="mt-4 w-full bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      <div className="w-full lg:w-1/2 bg-slate-800/50 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-700 flex flex-col print:hidden h-screen lg:h-screen">
      {/* Header */}
<div className="p-4 lg:p-6 border-b border-slate-700 flex-shrink-0 
                flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
  {/* Bot Info */}
  <div className="flex items-center gap-3 flex-1 min-w-0">
    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
      <Bot className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
    </div>
    <div className="min-w-0">
      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">
        IntellicV - AI Resume Assistant
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm truncate">
        {user ? `Logged in as ${user.email}` : 'Please login to save your changes'}
      </p>
    </div>
  </div>

  {/* Auth Button */}
  <div className="flex-shrink-0">
    {user ? (
      <button
        onClick={handleLogout}
        className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm sm:text-base"
      >
        Logout
      </button>
    ) : (
      <button
        onClick={() => setShowAuthModal(true)}
        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm sm:text-base"
      >
        Login / Sign Up
      </button>
    )}
  </div>
</div>


        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-3 lg:px-4 py-2 lg:py-3 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                <p className="text-xs lg:text-sm whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-slate-100 px-3 lg:px-4 py-2 lg:py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 lg:w-4 lg:h-4 animate-spin" />
                  <span className="text-xs lg:text-sm">IntellicV is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 lg:p-6 border-t border-slate-700 flex-shrink-0">
          <div className="flex gap-2 lg:gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me what to change in your resume..."
              className="flex-1 bg-slate-700 text-white placeholder-slate-400 rounded-xl px-3 lg:px-4 py-2 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm lg:text-base"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 lg:p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
