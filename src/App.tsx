import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import { Reversi } from 'pages/Reversi';

const App = () => {
  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700&display=swap');
          ${emotionReset}

          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }

          body,
          button {
            font-family: 'M PLUS 1p', sans-serif;
            color: #333;
            font-size: 16px;
            letter-spacing: 0.05em;
            line-height: 1.4;
            word-wrap: break-word;
          }
        `}
      />
      <Reversi />
    </>
  );
};

export default App;
