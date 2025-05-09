"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sparkles,
  Send,
  Copy,
  ArrowRight,
  Loader2,
  Bot,
  BookOpen,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useChat } from "ai/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIContentAssistantProps {
  onInsertContent: (content: string) => void;
  selectedText?: string;
}

export default function AIContentAssistant({
  onInsertContent,
  selectedText = "",
}: AIContentAssistantProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<string>("general");

  // Use the AI SDK's useChat hook
  const {
    messages,
    input: aiInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput: setAiInput,
  } = useChat({
    api: "/api/ai-assistant",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your AI writing assistant. How can I help with your blog post today?",
      },
    ],
    body: {
      selectedText,
      context,
    },
  });

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      console.log("AI Response:", lastMessage.content);
    }
  }, [messages]);

  // Update input when selectedText changes
  useEffect(() => {
    if (selectedText) {
      setAiInput(`Improve this text: ${selectedText}`);
      setContext("improve");
    }
  }, [selectedText, setAiInput]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        // You could show a toast notification here
        console.log("Content copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy content: ", err);
      });
  };

  const handleInsertContent = (content: string) => {
    // Ensure the content is properly formatted before inserting
    onInsertContent(content);
  };

  const handleQuickPrompt = (promptType: string) => {
    let promptText = "";

    switch (promptType) {
      case "introduction":
        promptText =
          "Write an introduction for my blog post about modern web development.";
        setContext("introduction");
        break;
      case "conclusion":
        promptText =
          "Write a conclusion for my blog post about modern web development.";
        setContext("conclusion");
        break;
      case "section":
        promptText =
          "Write a section about best practices in modern web development.";
        setContext("section");
        break;
      default:
        promptText = "Give me some ideas for my blog post.";
        setContext("general");
    }

    setAiInput(promptText);
  };

  return (
    <Card className="flex flex-col h-full border-gray-100 shadow-none overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
          AI Content Assistant
        </CardTitle>
        <CardDescription>
          Ask for help with your blog post content
        </CardDescription>

        {/* Quick prompt buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-white/50 border-blue-100 text-blue-600 hover:bg-blue-50"
            onClick={() => handleQuickPrompt("introduction")}
          >
            <BookOpen className="h-3 w-3 mr-1" />
            Introduction
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-white/50 border-blue-100 text-blue-600 hover:bg-blue-50"
            onClick={() => handleQuickPrompt("conclusion")}
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Conclusion
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-white/50 border-blue-100 text-blue-600 hover:bg-blue-50"
            onClick={() => handleQuickPrompt("section")}
          >
            <FileText className="h-3 w-3 mr-1" />
            New Section
          </Button>
        </div>
      </CardHeader>
      <CardContent
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto pb-0 px-3 pt-3"
        style={{ height: "calc(100% - 180px)" }}
      >
        <AnimatePresence>
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar
                    className={`h-8 w-8 flex-shrink-0 ${
                      message.role === "assistant"
                        ? "bg-blue-600"
                        : "bg-gray-800"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-5 w-5 text-white" />
                    ) : (
                      <AvatarFallback className="bg-gray-800 text-white text-xs">
                        You
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 shadow-sm border border-blue-100"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                    )}

                    {message.role === "assistant" &&
                      message.content.length > 10 && (
                        <div className="flex justify-end gap-2 mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-white/50"
                            onClick={() => handleCopyContent(message.content)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleInsertContent(message.content)}
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Insert
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 max-w-[85%]">
                  <Avatar className="h-8 w-8 bg-blue-600 flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </Avatar>
                  <div className="rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 shadow-sm border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="pt-3 border-t border-gray-100 mt-auto flex-shrink-0">
        <form onSubmit={handleFormSubmit} className="w-full flex gap-2">
          <Textarea
            placeholder="Ask for help with your content..."
            value={aiInput}
            onChange={handleInputChange}
            className="flex-grow resize-none min-h-[60px] py-2 text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            className="h-10 bg-blue-600 hover:bg-blue-700 self-end"
            disabled={isLoading || !aiInput.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
