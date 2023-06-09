import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MenuButton } from '../buttons';
import { MenuTooltip } from '../tooltips';
import { headerData as data } from '../../utils/data';

const defaultTooltipState = { more: false, search: false, account: false };

export default function HeaderSection() {
  const [isOpen, setIsOpen] = useState(defaultTooltipState);
  const ref = useRef(),
    tooltipsRef = { more: useRef(), search: useRef(), account: useRef() };

  const handleClick = (e, tooltip, title) => {
    if (tooltip) {
      e.preventDefault();
      setIsOpen({ ...defaultTooltipState, [title]: !isOpen[title] });
    }
  };

  const handleClickOutside = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !Object.values(tooltipsRef).find((r) => r.current.contains(e.target))
    )
      setIsOpen(defaultTooltipState);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <img src={data.logo} alt='logo' />
      <MenuWrapper count={data.navLinks.length} ref={ref}>
        {data.navLinks.map((item, index) => {
          const { title, tooltip } = item;
          return (
            <div key={`nav-${index}`}>
              <MenuButton {...item} handleClick={(e) => handleClick(e, tooltip, title)} />
              {tooltip && (
                <div ref={tooltipsRef[title]}>
                  <MenuTooltip isOpen={isOpen[title]} data={data.tooltips[title]} />
                </div>
              )}
              {/* item.link === '/account' ? (
            <MenuButton item={item} key={index} onClick={(e) => handleClick(e)} />
          ) : (
            <MenuButton item={item} key={index} />
          ) */}
            </div>
          );
        })}
        <HamburgerWrapper>
          <MenuButton item={data.hamburger} onClick={(e) => handleClick(e)} />
        </HamburgerWrapper>
      </MenuWrapper>
      <div>{/* <MenuTooltip isOpen={isOpen} data={data.tooltips.account} /> */}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`;

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(${(props) => props.count}, auto);

  @media (max-width: 768px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`;

const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
