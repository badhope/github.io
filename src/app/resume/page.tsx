'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import CosmicParticleBackground from '@/components/effects/CosmicParticleBackground';
import PageTransition from '@/components/animations/PageTransition';
import styles from './page.module.css';

const experience = [
  {
    periodZh: '2024 - 至今',
    periodEn: '2024 - Present',
    titleZh: '全栈开发者 & AI 探索者',
    titleEn: 'Full-Stack Developer & AI Explorer',
    descZh: '持续学习全栈开发和AI技术，构建实际项目，探索前沿技术领域',
    descEn: 'Continuously learning full-stack development and AI, building real projects, exploring cutting-edge tech',
    tags: ['React', 'Next.js', 'Python', 'AI/ML', 'Big Data'],
  },
];

const education = [
  {
    periodZh: '持续学习中',
    periodEn: 'Always Learning',
    titleZh: '计算机科学与技术',
    titleEn: 'Computer Science & Technology',
    descZh: '数据科学 → 全栈开发 → AI + 全栈深入，持续探索技术边界',
    descEn: 'Data Science → Full-Stack → AI + Full-Stack, continuously pushing technical boundaries',
  },
];

const certifications = [
  { name: 'Full-Stack Web Development', issuer: 'Self-taught & Practice' },
  { name: 'Data Science Fundamentals', issuer: 'Self-taught & Practice' },
  { name: 'AI & Machine Learning', issuer: 'Self-taught & Practice' },
];

export default function ResumePage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <PageTransition>
      <div className={styles.page}>
        <CosmicParticleBackground preset="starfield" intensity="medium" />
        <StarNavigation />
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.headerTag}>
              {'// ' + (isZh ? '简历' : 'Resume')}
            </span>
            <h1 className={styles.headerTitle}>badhope</h1>
            <p className={styles.headerSubtitle}>
              {isZh ? '全栈开发者 | AI 探索者 | 代码创造者' : 'Full-Stack Developer | AI Explorer | Code Creator'}
            </p>
            <div className={styles.headerLinks}>
              <a href="mailto:x18825407105@outlook.com">📧 x18825407105@outlook.com</a>
              <a href="https://github.com/badhope" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
            </div>
          </motion.div>

          <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              {isZh ? '💼 经历' : '💼 Experience'}
            </h2>
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={styles.period}>{isZh ? exp.periodZh : exp.periodEn}</span>
                <h3 className={styles.itemTitle}>{isZh ? exp.titleZh : exp.titleEn}</h3>
                <p className={styles.itemDesc}>{isZh ? exp.descZh : exp.descEn}</p>
                <div className={styles.tags}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.section>

          <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              {isZh ? '📚 学习历程' : '📚 Learning Journey'}
            </h2>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={styles.period}>{isZh ? edu.periodZh : edu.periodEn}</span>
                <h3 className={styles.itemTitle}>{isZh ? edu.titleZh : edu.titleEn}</h3>
                <p className={styles.itemDesc}>{isZh ? edu.descZh : edu.descEn}</p>
              </motion.div>
            ))}
          </motion.section>

          <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              {isZh ? '⚡ 技能' : '⚡ Skills'}
            </h2>
            <div className={styles.skillCategories}>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>{isZh ? '前端' : 'Frontend'}</h3>
                <div className={styles.skillList}>
                  {['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'].map((s) => (
                    <span key={s} className={styles.skillItem}>{s}</span>
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>{isZh ? '后端' : 'Backend'}</h3>
                <div className={styles.skillList}>
                  {['Node.js', 'Python', 'Java', 'Spring Boot', 'Express', 'FastAPI'].map((s) => (
                    <span key={s} className={styles.skillItem}>{s}</span>
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>{isZh ? '大数据' : 'Big Data'}</h3>
                <div className={styles.skillList}>
                  {['Spark', 'Hadoop', 'Hive', 'Kafka', 'Flink', 'HDFS'].map((s) => (
                    <span key={s} className={styles.skillItem}>{s}</span>
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>AI / ML</h3>
                <div className={styles.skillList}>
                  {['TensorFlow', 'PyTorch', 'LangChain', 'NLP', 'LLM', 'RAG'].map((s) => (
                    <span key={s} className={styles.skillItem}>{s}</span>
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>DevOps</h3>
                <div className={styles.skillList}>
                  {['Docker', 'Kubernetes', 'GitHub Actions', 'Nginx', 'Linux', 'Git'].map((s) => (
                    <span key={s} className={styles.skillItem}>{s}</span>
                  ))}
                </div>
              </div>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>{isZh ? '数据库' : 'Database'}</h3>
                <div className={styles.skillList}>
                  {['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch'].map((s) => (
                    <span key={s} className={styles.skillItem}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            className={styles.download}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className={styles.downloadText}>
              {isZh ? '💡 提示：简历内容持续更新中' : '💡 Resume content is continuously updated'}
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
