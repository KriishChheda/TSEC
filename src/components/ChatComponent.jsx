import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, ChevronLeft, ChevronRight, FileText, Image, Video, File, X } from 'lucide-react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Previous Chat 1', timestamp: '2024-01-15' },
    { id: 2, title: 'Document Analysis', timestamp: '2024-01-14' },
    { id: 3, title: 'Image Summary', timestamp: '2024-01-13' }
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (fileType.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (fileType === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const sendMessage = () => {
    if (inputText.trim() || uploadedFiles.length > 0) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        text: inputText,
        files: [...uploadedFiles],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setUploadedFiles([]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          text: 'I can see your message' + (uploadedFiles.length > 0 ? ` and ${uploadedFiles.length} file(s)` : '') + '. How can I help you analyze this content?',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const summarizeFiles = () => {
    if (uploadedFiles.length > 0) {
      const summaryMessage = {
        id: Date.now(),
        type: 'user',
        text: 'Please summarize the uploaded files',
        files: [...uploadedFiles],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, summaryMessage]);
      setInputText('');
      setUploadedFiles([]);

      // Simulate AI summary response
      setTimeout(() => {
        const summaryResponse = {
          id: Date.now() + 1,
          type: 'ai',
          text: `I've analyzed ${uploadedFiles.length} file(s). Here's a summary: ${uploadedFiles.map(f => f.name).join(', ')}. The files contain various content that I can help you understand and work with.`,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, summaryResponse]);
      }, 1500);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      {/* Chat History */}
      <div className={`bg-gray-800 shadow-2xl transition-all duration-300 ${sidebarCollapsed ? 'w-0' : 'w-80'} border-r border-green-500/20`}>
        <div className={`h-full ${sidebarCollapsed ? 'hidden' : 'block'}`}>
          <div className="p-4 bg-gradient-to-r from-green-400 to-green-600 text-black">
            <h2 className="text-lg font-bold">Chat History</h2>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto h-full">
            {chatHistory.map(chat => (
              <div key={chat.id} className="p-3 rounded-lg bg-gray-700 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-green-400/20 border border-green-500/10 hover:border-green-400/30 cursor-pointer transition-all">
                <div className="font-medium text-green-400">{chat.title}</div>
                <div className="text-sm text-gray-400">{chat.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-400 to-green-600 text-black p-2 rounded-r-lg shadow-lg hover:from-green-300 hover:to-green-500 transition-all z-10"
        style={{ left: sidebarCollapsed ? '0' : '320px' }}
      >
        {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 shadow-lg border-b border-green-500/20 p-4">
          <h1 className="text-xl font-bold text-green-400 flex items-center space-x-2">
            <span className="text-green-300">&gt;</span>
            <span>NEURAL_CHAT.exe</span>
            <span className="animate-pulse text-green-300">_</span>
          </h1>
        </div>

        {/* Messages Area */}
        <div 
          className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 ${isDragging ? 'bg-green-900/20 border-2 border-dashed border-green-400' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isDragging && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-green-400">
                <Upload className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                <p className="text-lg font-bold">&gt; DROP FILES TO UPLOAD</p>
                <p className="text-sm text-green-300">DRAG_AND_DROP.INITIATED</p>
              </div>
            </div>
          )}
          
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg border ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-black border-green-400 shadow-lg shadow-green-500/20' 
                  : 'bg-gray-800 text-green-300 border-green-500/30 shadow-lg'
              }`}>
                {message.text && <p className="text-sm font-mono">{message.text}</p>}
                {message.files && message.files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.files.map(file => (
                      <div key={file.id} className="flex items-center space-x-2 text-xs bg-black/30 rounded p-1 border border-green-500/20">
                        {getFileIcon(file.type)}
                        <span className="truncate text-green-300">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`text-xs mt-1 font-mono ${message.type === 'user' ? 'text-black/70' : 'text-green-500'}`}>
                  [{message.timestamp}]
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* File Upload Preview */}
        {uploadedFiles.length > 0 && (
          <div className="bg-gray-800 border-t border-green-500/20 p-3">
            <div className="text-sm font-bold text-green-400 mb-2 font-mono">&gt; LOADED_FILES [{uploadedFiles.length}]</div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between bg-gray-700 p-2 rounded border border-green-500/20">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className="text-green-400">{getFileIcon(file.type)}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-mono text-green-300 truncate">{file.name}</div>
                      <div className="text-xs text-green-500 font-mono">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-red-400 hover:text-red-300 ml-2 hover:bg-red-400/10 p-1 rounded transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-gray-800 border-t border-green-500/20 p-4">
          <div className="flex space-x-3">
            {/* Search Input with integrated icons */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Enter command..."
                className="w-full px-4 py-3 pr-20 bg-gray-700 border border-green-500/30 rounded-lg text-green-300 placeholder-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 font-mono transition-all"
              />
              
              {/* Upload and Send icons inside input */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e.target.files)}
                  multiple
                  accept="*/*"
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded transition-all"
                  title="Upload Files"
                >
                  <Upload className="w-4 h-4" />
                </button>
                
                <button
                  onClick={sendMessage}
                  className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded transition-all"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Summarize Button */}
            <button
              onClick={summarizeFiles}
              disabled={uploadedFiles.length === 0}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all font-mono font-bold ${
                uploadedFiles.length > 0
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-black hover:from-green-400 hover:to-green-500 shadow-lg shadow-green-500/20'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ANALYZE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;