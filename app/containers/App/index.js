/* eslint-disable no-console */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';

import InlineEditor from 'containers/HomePage/Loadable';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  return (
    <AppWrapper>
      <InlineEditor
        height={50}
        width={700}
        text="So, this is the default text"
        truncate
        charLimit={20}
        onSave={() => {
          console.log('Saved');
        }}
      />
      <InlineEditor
        height={50}
        width={700}
        text="So, this is the default text"
        truncate
        charLimit={20}
        onSave={() => {
          console.log('Saved');
        }}
      />
      <InlineEditor
        height={50}
        width={700}
        text="So, this is the default text"
        truncate
        charLimit={20}
        onSave={() => {
          console.log('Saved');
        }}
      />
      <InlineEditor
        height={50}
        width={700}
        text="So, this is the default text"
        truncate
        charLimit={20}
        onSave={() => {
          console.log('Saved');
        }}
      />
    </AppWrapper>
  );
}
