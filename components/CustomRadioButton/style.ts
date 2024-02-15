import styled from 'styled-components';

export const Wrapper = styled.div`
  --hue: 223;
  --fg: hsl(var(--hue), 10%, 10%);
  --trans-dur: 0.3s;
  --trans-timing1: cubic-bezier(0.37, 0, 0.63, 1);
  --trans-timing2: cubic-bezier(0.34, 1.56, 0.64, 1);

  display: flex;
  gap: 1rem;
  input {
    color: var(--fg);
    transition: background-color var(--trans-dur) var(--trans-timing1),
      box-shadow var(--trans-dur) var(--trans-timing1),
      color var(--trans-dur) var(--trans-timing1);
  }
  .item-input,
  .item-label {
    box-shadow: 0 0 0 2px hsl(var(--hue), 10%, 80%) inset;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .item-input {
    border-radius: 50%;
    position: absolute;
    top: 0.875rem;
    right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    -webkit-appearance: none;
    appearance: none;
  }
  .item-input:before {
    background-color: hsl(0, 0%, 100%);
    border-radius: inherit;
    box-shadow: 0 0 0 0.3rem hsl(var(--hue), 90%, 50%);
    content: '';
    display: block;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 0.9rem;
    height: 0.9rem;
    transition: transform var(--trans-dur) var(--trans-timing1);
    transform: scale(0);
  }
  .item-label {
    max-width: 22rem;
    min-width: 22rem;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    padding-inline-end: 2rem;
    position: relative;
    transition: background-color var(--trans-dur) var(--trans-timing1),
      box-shadow var(--trans-dur) var(--trans-timing1);
  }
  .item-label:hover {
    background-color: hsl(var(--hue), 10%, 95%);
  }
  .item-name {
    color: var(--fg);
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .item-name {
    margin-inline-end: 0.5rem;
  }
  .item-desc {
    color: #534d4d;
    font-size: 1.2rem;
  }
  .item-input:checked:before {
    transform: scale(1);
    transition-timing-function: var(--trans-timing2);
  }
  .item-input:checked ~ .item-info .item-name {
    color: hsl(var(--hue), 90%, 50%);
  }
  .item-label:has(.item-input:checked) {
    background-color: hsl(var(--hue), 90%, 95%);
    box-shadow: 0 0 0 2px hsl(var(--hue), 90%, 50%) inset;
  }
`;
