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
  min-height: 90vh;
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
    margin-top: 15px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 940px;
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
  const three = <h3 style={{ fontSize: '2rem' }}>I build scalable and intelligent software systems.</h3>;

  const four = (
    <>
     <p>
     I’m a passionate builder, coding my way through <a>California State University, Chico</a>, and beyond. With a love for blending technology and creativity, I focus on bringing innovative solutions to life—whether it’s improving user experiences at scale or diving deep into complex system designs.
     </p>
     <p>
     I’ve had the privilege of working on projects like the <a>‘Generative Object Grab’</a> at <a>Microsoft</a>, enhancing image manipulation for millions of users, and contributing to cutting-edge <a>network monitoring systems</a> at <a>ESNet</a>. Every challenge excites me, from developing intuitive apps to <a>publishing research</a> on AI-driven skin cancer detection.
     </p>
     <p>
     My <a>philosophy?</a> Code should not only solve problems but also create delightful, seamless experiences. When I'm not coding, you can find me mentoring fellow students or experimenting with new tech stacks to bring bold ideas into reality.
     </p>
     <p>
     If you’re ready to explore, innovate, and solve problems together—let’s connect and build something amazing! 💻✨
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
