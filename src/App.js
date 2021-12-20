import React from 'react';
import styled from 'styled-components';

import InlineEditor from './InlineEditor';

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
