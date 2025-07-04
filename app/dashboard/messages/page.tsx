"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Send, 
  Paperclip, 
  Image, 
  Video, 
  File,
  MoreVertical,
  Phone,
  Video as VideoCall,
  Info,
  Check,
  CheckCheck,
  Clock,
  User,
  Users,
  Star,
  Calendar,
  DollarSign,
  MessageSquare
} from 'lucide-react'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [messageText, setMessageText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      handle: "@sarahjohnson",
      lastMessage: "Perfect! I'll have the content ready by Friday.",
      timestamp: "2 min ago",
      unread: 0,
      online: true,
      campaign: "Summer Skincare Launch",
      status: "active",
      messages: [
        {
          id: 1,
          sender: "sarah",
          content: "Hi! I'm excited to work on the Summer Skincare Launch campaign!",
          timestamp: "2024-01-15T10:30:00",
          status: "read"
        },
        {
          id: 2,
          sender: "me",
          content: "Welcome Sarah! We're thrilled to have you on board. Here's the campaign brief and requirements.",
          timestamp: "2024-01-15T10:32:00",
          status: "read"
        },
        {
          id: 3,
          sender: "sarah",
          content: "Thanks! I've reviewed the brief. I love the concept of highlighting natural ingredients. When do you need the content by?",
          timestamp: "2024-01-15T10:35:00",
          status: "read"
        },
        {
          id: 4,
          sender: "me",
          content: "We're aiming for Friday, January 19th. Does that work for you?",
          timestamp: "2024-01-15T10:37:00",
          status: "read"
        },
        {
          id: 5,
          sender: "sarah",
          content: "Perfect! I'll have the content ready by Friday.",
          timestamp: "2024-01-15T10:40:00",
          status: "read"
        }
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      handle: "@mikechen_tech",
      lastMessage: "The video is uploaded and ready for review.",
      timestamp: "1 hour ago",
      unread: 2,
      online: false,
      campaign: "Tech Gadget Review",
      status: "active",
      messages: [
        {
          id: 1,
          sender: "mike",
          content: "Hi! I've finished filming the gadget review. Should I upload it to the platform?",
          timestamp: "2024-01-15T09:00:00",
          status: "read"
        },
        {
          id: 2,
          sender: "me",
          content: "Yes, please upload it and I'll review it right away.",
          timestamp: "2024-01-15T09:05:00",
          status: "read"
        },
        {
          id: 3,
          sender: "mike",
          content: "The video is uploaded and ready for review.",
          timestamp: "2024-01-15T09:30:00",
          status: "delivered"
        }
      ]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      handle: "@emmafitness",
      lastMessage: "Can we discuss the payment terms?",
      timestamp: "3 hours ago",
      unread: 0,
      online: true,
      campaign: "Fitness App Promotion",
      status: "pending",
      messages: [
        {
          id: 1,
          sender: "emma",
          content: "Hi! I'm interested in the fitness app promotion. Can we discuss the payment terms?",
          timestamp: "2024-01-15T07:00:00",
          status: "read"
        }
      ]
    }
  ]

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.campaign.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentConversation = conversations[selectedConversation]

  const sendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-1">Communicate with creators and manage collaborations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg border border-gray-200 h-[calc(100vh-200px)] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(index)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === index ? 'bg-purple-50 border-purple-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.handle}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-purple-600 font-medium">{conversation.campaign}</span>
                        {conversation.unread > 0 && (
                          <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={currentConversation.avatar}
                        alt={currentConversation.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {currentConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{currentConversation.name}</h3>
                      <p className="text-sm text-gray-600">{currentConversation.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <VideoCall className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Info className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="px-4 py-3 bg-purple-50 border-b border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-purple-900">{currentConversation.campaign}</h4>
                      <p className="text-xs text-purple-700">Campaign in progress</p>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-purple-700">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due Jan 19</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>$2,500</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'me'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-between mt-1 ${
                          message.sender === 'me' ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          {message.sender === 'me' && (
                            <div className="flex items-center space-x-1">
                              {getMessageStatusIcon(message.status)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Image className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <File className="w-4 h-4" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!messageText.trim()}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 