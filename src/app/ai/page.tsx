'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import { generateResponse, getSuggestedQuestions } from '@/lib/ai/response-engine';
import { getActiveModel, AI_MODELS } from '@/config/ai';
import styles from './page.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Check active AI model
  useEffect(() => {
    const model = getActiveModel();
    setActiveModel(model ? model.name : null);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: isZh
          ? '⭐ 你好！我是 **Star**，badhope 的 AI 助手。\n\n我可以回答关于 badhope 的各种问题，比如他的技能、项目、联系方式等。试试问我一个问题吧！\n\n💡 提示：点击下方的建议问题快速开始对话。'
          : '⭐ Hello! I\'m **Star**, badhope\'s AI assistant.\n\nI can answer questions about badhope\'s skills, projects, contact info, and more. Try asking me something!\n\n💡 Tip: Click the suggested questions below to get started.',
        timestamp: new Date(),
      }]);
    }
  }, [isZh, messages.length]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

    // Try real AI API first
    const model = getActiveModel();
    let response: string;

    if (model) {
      try {
        const apiMessages = [
          { role: 'system', content: `你是 badhope 的 AI 助手 Star。${model.name} 模式已启用。请用${isZh ? '中文' : '英文'}回答。` },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: text.trim() },
        ];

        const res = await fetch(model.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${model.apiKey}`,
          },
          body: JSON.stringify({
            model: model.model,
            messages: apiMessages,
            max_tokens: model.maxTokens,
            temperature: model.temperature,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          response = data.choices?.[0]?.message?.content || generateResponse(text);
        } else {
          response = generateResponse(text);
        }
      } catch {
        response = generateResponse(text);
      }
    } else {
      // Use local knowledge base
      response = generateResponse(text);
    }

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  }, [isTyping, messages, isZh]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const suggestions = getSuggestedQuestions();

  return (
    <div className={styles.page}>
      <StarNavigation />
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>🤖</div>
            <div>
              <h1 className={styles.headerTitle}>Star AI</h1>
              <p className={styles.headerStatus}>
                {activeModel
                  ? `🟢 ${activeModel} ${isZh ? '已连接' : 'Connected'}`
                  : `🟡 ${isZh ? '本地模式' : 'Local Mode'}`}
              </p>
            </div>
          </div>
          <button
            className={styles.configBtn}
            onClick={() => setShowConfig(!showConfig)}
          >
            ⚙️
          </button>
        </motion.div>

        {/* Config panel */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              className={styles.configPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className={styles.configContent}>
                <h3 className={styles.configTitle}>
                  {isZh ? 'AI 模型配置' : 'AI Model Config'}
                </h3>
                <p className={styles.configDesc}>
                  {isZh
                    ? '在 src/config/ai.ts 中配置 API 密钥以启用真实 AI 对话'
                    : 'Configure API keys in src/config/ai.ts to enable real AI chat'}
                </p>
                <div className={styles.modelList}>
                  {AI_MODELS.map((model) => (
                    <div key={model.name} className={styles.modelItem}>
                      <span className={styles.modelName}>{model.name}</span>
                      <span className={`${styles.modelStatus} ${model.enabled && model.apiKey ? styles.modelActive : ''}`}>
                        {model.enabled && model.apiKey ? '🟢' : '⚪'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`${styles.message} ${styles[msg.role]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.messageAvatar}>
                {msg.role === 'assistant' ? '⭐' : '👤'}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <span className={styles.messageTime}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className={`${styles.message} ${styles.assistant}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={styles.messageAvatar}>⭐</div>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span /><span /><span />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className={styles.suggestions}>
            {suggestions.map((q) => (
              <button
                key={q}
                className={styles.suggestionBtn}
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className={styles.inputContainer}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isZh ? '输入消息... (Enter 发送)' : 'Type a message... (Enter to send)'}
            rows={1}
            disabled={isTyping}
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
}
