'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './AboutSection.module.css';

const timeline = [
  {
    year: '2024',
    titleZh: '数据科学学习',
    titleEn: 'Data Science',
    descZh: '系统学习数据科学与大数据技术，探索数据背后的规律',
    descEn: 'Systematically studied data science and big data technologies',
    icon: '📊',
  },
  {
    year: '2025',
    titleZh: '全栈开发',
    titleEn: 'Full-Stack Development',
    descZh: '掌握前端到后端的完整Web开发技术栈，构建真实项目',
    descEn: 'Mastered the complete web development stack from frontend to backend',
    icon: '🚀',
  },
  {
    year: '2026',
    titleZh: 'AI + 全栈深入',
    titleEn: 'AI & Full-Stack Deep Dive',
    descZh: '深入AI技术与全栈开发的融合，持续探索前沿技术',
    descEn: 'Deep diving into AI and full-stack integration, continuously exploring cutting-edge tech',
    icon: '⭐',
  },
];

const skills = [
  { nameZh: '前端开发', nameEn: 'Frontend', icon: '🎨', level: 90 },
  { nameZh: '后端开发', nameEn: 'Backend', icon: '⚙️', level: 85 },
  { nameZh: '大数据', nameEn: 'Big Data', icon: '📊', level: 80 },
  { nameZh: 'AI / ML', nameEn: 'AI / ML', icon: '🤖', level: 75 },
  { nameZh: 'DevOps', nameEn: 'DevOps', icon: '🚀', level: 70 },
  { nameZh: '数据库', nameEn: 'Database', icon: '🗄️', level: 80 },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Java',
  'Vue.js', 'Tailwind CSS', 'Three.js', 'Docker', 'Git', 'Linux',
  'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Spark', 'TensorFlow',
];

export default function AboutSection() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.headerTag}>
            {'// ' + (isZh ? '关于我' : 'About Me')}
          </span>
          <h2 className={styles.headerTitle}>
            {isZh ? '代码宇宙中的探索者' : 'Explorer in the Code Universe'}
          </h2>
          <p className={styles.headerDesc}>
            {isZh
              ? '持续学习，持续成长，用技术和项目不断探索未知的领域'
              : 'Continuously learning and growing, exploring unknown territories with technology and projects'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.timelineDot}>
                <span className={styles.timelineIcon}>{item.icon}</span>
              </div>
              <div className={styles.timelineCard}>
                <span className={styles.timelineYear}>{item.year}</span>
                <h3 className={styles.timelineTitle}>
                  {isZh ? item.titleZh : item.titleEn}
                </h3>
                <p className={styles.timelineDesc}>
                  {isZh ? item.descZh : item.descEn}
                </p>
              </div>
            </motion.div>
          ))}
          {/* Ongoing indicator */}
          <motion.div
            className={styles.timelineOngoing}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.ongoingDot} />
            <span className={styles.ongoingText}>
              {isZh ? '持续探索中...' : 'Continuously exploring...'}
            </span>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          className={styles.skillsSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={styles.sectionSubtitle}>
            {isZh ? '技能矩阵' : 'Skill Matrix'}
          </h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.nameEn}
                className={styles.skillCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <span className={styles.skillIcon}>{skill.icon}</span>
                <span className={styles.skillName}>
                  {isZh ? skill.nameZh : skill.nameEn}
                </span>
                <div className={styles.skillBar}>
                  <motion.div
                    className={styles.skillFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack tags */}
        <motion.div
          className={styles.techSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={styles.sectionSubtitle}>
            {isZh ? '技术栈' : 'Tech Stack'}
          </h3>
          <div className={styles.techTags}>
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                className={styles.techTag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  borderColor: 'rgba(212, 175, 55, 0.6)',
                  boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
