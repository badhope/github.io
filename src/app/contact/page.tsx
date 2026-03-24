'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import { SOCIAL_LINKS } from '@/config/social';
import styles from './page.module.css';

export default function ContactPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formsubmit.co/ajax/x18825407105@outlook.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Starbase] New message from ${formData.name}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <StarNavigation />
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.headerTag}>
            {'// ' + (isZh ? '联系我' : 'Contact')}
          </span>
          <h1 className={styles.headerTitle}>
            {isZh ? '建立连接' : 'Get in Touch'}
          </h1>
          <p className={styles.headerDesc}>
            {isZh
              ? '无论是技术交流、项目合作还是随便聊聊，都欢迎联系我'
              : 'Whether it\'s tech discussion, project collaboration, or just a chat, feel free to reach out'}
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Contact form */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>
              {isZh ? '发送消息' : 'Send Message'}
            </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>
                  {isZh ? '名字' : 'Name'} <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isZh ? '你的名字' : 'Your name'}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  {isZh ? '邮箱' : 'Email'} <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isZh ? '你的邮箱' : 'Your email'}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  {isZh ? '消息' : 'Message'} <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isZh ? '你想说什么...' : 'What do you want to say...'}
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending'
                  ? (isZh ? '发送中...' : 'Sending...')
                  : (isZh ? '发送消息' : 'Send Message')}
              </button>
              {status === 'success' && (
                <motion.p
                  className={styles.success}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ {isZh ? '消息已发送！感谢你的来信。' : 'Message sent! Thank you for reaching out.'}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ❌ {isZh ? '发送失败，请稍后重试或直接发送邮件。' : 'Failed to send. Please try again or email directly.'}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Social links */}
          <motion.div
            className={styles.socialSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className={styles.sectionTitle}>
              {isZh ? '社交平台' : 'Social Links'}
            </h2>
            <div className={styles.socialGrid}>
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.external ? '_blank' : '_self'}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={styles.socialCard}
                  whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                  <div className={styles.socialInfo}>
                    <span className={styles.socialName}>{link.name}</span>
                    <span className={styles.socialNameZh}>{link.nameZh}</span>
                  </div>
                  <span className={styles.socialArrow}>→</span>
                </motion.a>
              ))}
            </div>

            {/* Email */}
            <div className={styles.emailSection}>
              <h3 className={styles.emailLabel}>
                {isZh ? '直接发送邮件' : 'Send Email Directly'}
              </h3>
              <a href="mailto:x18825407105@outlook.com" className={styles.emailLink}>
                📧 x18825407105@outlook.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
