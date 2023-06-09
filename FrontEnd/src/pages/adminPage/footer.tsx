import React, { useState, useEffect } from 'react';
import styles from '../../../src/style/adminFooter.module.css';
import { ReactComponent as Mushiroom } from '../../style/icons/mushroom.svg';
import { ReactComponent as Question } from '../../style/icons/question.svg';
import { ReactComponent as Mario } from '../../style/icons/mario.svg';
import { ReactComponent as Star } from '../../style/icons/star.svg';

type IconIdx = {
  idx: number;
};

const Footer = ({ idx }: IconIdx) => {
  const icon = idx;
  const [minute, setMinute] = useState('');
  const [hour, setHour] = useState(0);
  const [ampm, setAMPM] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const minutes = date.getMinutes();
      const formattedMinute = minutes.toString().padStart(2, '0');
      setMinute(formattedMinute);

      let hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12;
      setHour(hours);
      setAMPM(ampm);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo_content}>MZ오락실</div>

      {icon === 0 ? (
        <div className={styles.main_content}>
          <Mushiroom style={{ width: '11.5rem', height: '5.6rem' }} />
          <p>대시보드</p>
        </div>
      ) : icon === 1 ? (
        <div className={styles.main_content}>
          <Question style={{ width: '12rem', height: '5.5rem' }} />
          <p>게임 정보 관리</p>
        </div>
      ) : icon === 2 ? (
        <div className={styles.main_content}>
          <Mario style={{ width: '9rem', height: '5.4rem' }} />
          <p>게임 기록 관리</p>
        </div>
      ) : icon === 3 ? (
        <div className={styles.main_content}>
          <Star style={{ width: '6rem', height: '5.2rem' }} />
          <p>유저 정보 관리</p>
        </div>
      ) : (
        ''
      )}
      <div className={styles.clock_content}>
        {ampm} {hour}:{minute}
      </div>
    </div>
  );
};

export default Footer;
