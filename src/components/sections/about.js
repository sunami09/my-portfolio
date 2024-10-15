import React, { useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
    a {
  position: relative;
  text-decoration: none;
  color: var(--green);
}

a:before {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: var(--green);
  transition: width 0.3s ease;
}

a:hover:before {
  width: 100%;
}
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'C/C++',
    'Python',
    'JavaScript',
    'TypeScript',
    'React',
    'Redux',
    'Node.js',
    'MongoDB',
    'Express.js',
    'Mongoose',
    'jQuery',
    'NoSQL',
    'SQL',
    'Docker',
    'Kubernetes',
    'Prometheus',
    'Grafana',
    'TensorFlow',
    'PyTorch',
    'Django',
    'REST API',
    'Shell Scripting',
    'TCP/IP',
    'Linux/Unix',
    'Git',
    'Hadoop'
  ];
  

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
            As a Computer Science major at California State University - Chico, I’ve had the opportunity to dive deep into various fields, from distributed systems to machine learning. Along the way, I’ve honed my skills in C/C++, Python, JavaScript, and cutting-edge frameworks like React, Node.js, and MongoDB.
            </p>
            {/* New Section for Coding Highlights */}
            <h3>Some highlights of my coding journey include:</h3>
            <ul>
              <li><strong><a href="https://www.codechef.com/rankings/APRIL21B?itemsPerPage=100&order=asc&page=1&search=sunami09&sortBy=rank">9th Rank in CodeChef</a></strong> — out of 60,000 global participants, I've demonstrated my skills in competitive programming, refining my problem-solving techniques and efficiency.</li>
              <li><strong><a href="https://drive.google.com/file/d/1-HCcVl6m3zBNi3E8qXgwkY961rLdrieT/view">Google Codejam Participant</a></strong> — Ranked 607 out of 45,000, showing my knack for tackling real-world algorithmic challenges.</li>
              <li><strong><a href="https://netlix-clonev1-sunami.netlify.app/login">Developed a Movie Streaming App</a></strong> — Combining React and Node.js, I built a full-stack app that mirrors real-world streaming platforms.</li>
            </ul>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
