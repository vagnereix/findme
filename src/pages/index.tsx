import axios from "axios";
import { GetServerSideProps } from "next";

import Head from "next/head";
import Image from "next/image";

import cx from 'classnames';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/home.module.scss';

type userProps = {
  name: string;
  avatar: string;
  bio: string;
  company: string;
  gitHub: string;
};

export default function Home({
  name,
  avatar,
  bio,
  company,
  gitHub,
}: userProps) {
  const [themeDark, setThemeDark] = useState(false);

  function handleChangeTheme() {
    setThemeDark(!themeDark);
    localStorage.setItem('@themeDarkVR', (!themeDark).toString());
  }

  useEffect(() => {
    const darkThemeStoraged = localStorage.getItem('@themeDarkVR');
    setThemeDark(darkThemeStoraged === 'true' ? true : false);
  }, []);

  return (
    <>
      <Head>
        <title>Vagner | Web Developer</title>
      </Head>

      <section
        id={styles.section}
        className={cx({ [styles.dark]: themeDark === true })}
      >
        <div className={styles.card}>
          <div className={styles.toggle} onClick={handleChangeTheme} />
          <div className={styles.content}>
            <div className={styles.imgText}>
              <div className={styles.imgBx}>
                <Image
                  width={120}
                  height={120}
                  src={avatar}
                  objectFit='cover'
                  alt='Profile picture'
                />
              </div>
              <h3>
                {name} <br /> <span>@{company}</span> <br /> <span>{bio}</span>
              </h3>
            </div>
            <ul className={styles.sci}>
              <li>
                <a href='https://www.facebook.com/vagnereis10/'>
                  <i
                    className={`fa fa-facebook ${styles.fa}`}
                    aria-hidden='true'
                  ></i>
                </a>
              </li>
              <li>
                <a href='https://www.twitter.com/vagnereix_'>
                  <i
                    className={`fa fa-twitter ${styles.fa}`}
                    aria-hidden='true'
                  ></i>
                </a>
              </li>
              <li>
                <a href='https://www.linkedin.com/in/vagnereix/'>
                  <i
                    className={`fa fa-linkedin ${styles.fa}`}
                    aria-hidden='true'
                  ></i>
                </a>
              </li>
              <li>
                <a href='https://www.instagram.com/vagnereix/'>
                  <i
                    className={`fa fa-instagram ${styles.fa}`}
                    aria-hidden='true'
                  ></i>
                </a>
              </li>
              <li>
                <a href={gitHub}>
                  <i
                    className={`fa fa-github ${styles.fa}`}
                    aria-hidden='true'
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('https://api.github.com/users/vagnereix');

  const userData = {
    name: data.name,
    avatar: data.avatar_url,
    bio: data.bio,
    company: data.company,
    gitHub: data.html_url,
  };

  return {
    props: userData,
  };
};
