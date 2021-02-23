import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

export default function Options({ setFellowship }) {
  const changeFeed = (fellowship) => {
    setFellowship(fellowship);
  };
  /**
   * Something I didn't get to:
   * When I click on the "On Deck" button, the feed shows all events for all cohorts.
   * I want the current selected radio button to revert to the "unselected" color.
   * Could probably do this with JQuery or a hook (the former is preferred)
   */
  return (
    <OptionStyle>
      <div className="options">
        <div className="btn-group">
          <input
            type="radio"
            id="founder"
            name="fellowship"
            value="founder"
            onClick={() => changeFeed('Founders')}
          />
          <label htmlFor="founder">Founders</label>
          <input
            type="radio"
            id="angel"
            name="fellowship"
            value="angel"
            onClick={() => changeFeed('Angels')}
          />
          <label htmlFor="angel">Angels</label>
          <input
            type="radio"
            id="writer"
            name="fellowship"
            value="writer"
            onClick={() => changeFeed('Writers')}
          />
          <label htmlFor="writer">Writers</label>
        </div>
      </div>
    </OptionStyle>
  );
}

const OptionStyle = styled.div`
  .options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    z-index: 1;
    width: 100%;
    top: 0;
    border-bottom: solid 10px var(--primary-color);
    opacity: 0.9;
    margin: 0 -3rem;

    .btn-group input[type='radio'] {
      opacity: 0;
      width: 0;
      outline: none;
      align-self: center;
      margin: 0 3rem 0 3rem;
    }
    .btn-group label {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0);
      padding: 0 20px;
      font-weight: 600;
      font-size: 16px;
      font-family: 'Nunito Sans', sans-serif;
      color: #202c46;
      cursor: pointer;
      transition: 0.3s ease;
    }
    .btn-group input[type='radio']:checked + label {
      color: #0070f0;
    }
    .btn-group input[type='radio']:focus + label {
      color: #0070f0;
    }
    .btn-group label:hover {
      color: #0070f0;
    }
  }
`;
