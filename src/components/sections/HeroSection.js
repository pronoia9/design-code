import React from 'react';
import styled from 'styled-components';

import { heroSection as data } from '../../utils/data';

const HeroSection = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <TextWrapper>
          <Title>
            Design
            <br />
            and code React apps
          </Title>
          <Description>{data.description}</Description>
        </TextWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default HeroSection;

// STYLED COMPONENTS
const Wrapper = styled.div`
  background: linear-gradient(180deg, #4316db 0%, #9076e7 100%);
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 200px 30px;
`;

const TextWrapper = styled.div`
  max-width: 360px;
  display: grid;
  gap: 30px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 60px;
`;

const Description = styled.p`
  font-size: 17px;
  line-height: 130%;
`;
