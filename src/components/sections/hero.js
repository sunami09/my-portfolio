import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Sunami Dasgupta.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  const four = (
    <>
      <p>
Hey there! 🌟 I'm Sunami, a budding computer scientist from California State University, Chico. But wait, I'm not just about textbooks and lectures. You see, I've got this knack for turning caffeine into code. Yep, I'm a 5-Star coder over at <a href="https://www.codechef.com/rankings/APRIL21B?itemsPerPage=100&order=asc&page=1&search=sunami09&sortBy=rank">CodeChef</a>, and I've danced with the algorithms at <a href="https://drive.google.com/file/d/1-HCcVl6m3zBNi3E8qXgwkY961rLdrieT/view?usp=sharing">Google CodeJam 2022</a>. Oh, and that shiny <a href="https://drive.google.com/file/d/1ngkFED1gPousjVr6Q5wWppd-uBOT9WBU/view?usp=sharing">Linux Scholar 2022</a> badge? That's mine too! Over at Lawrence Berkeley National Lab, I jazzed up data handling with Python, boosted network visibility by a whopping 40%, and played around with Docker for some seamless app experiences. Ready to geek out with me? Let's code, innovate, and have a blast! 🚀
</p>
    </>
  );
  // const five = (
  //   <a
  //     className="email-link"
  //     href="https://www.newline.co/courses/build-a-spotify-connected-app"
  //     target="_blank"
  //     rel="noreferrer">
  //     Check out my course!
  //   </a>
  // );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
