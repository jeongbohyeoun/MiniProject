import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    --color-white: #FFF;
    --color-gray-1: #F5F5F5;
    --color-gray-2: #E1E1E1;
    --color-gray-3: #DDDDDD;
    --color-gray-4: #B0B0B0;
    --color-gray-5: #717171;
    --color-gray-6: #5E5E5E;
    --color-gray-7: #222;
    --color-green-1: #D3F3DD;
    --color-green-2: #0F672A;
    --color-green-grad: linear-gradient(90deg, #0B4D1F 0%, #0F662A 50%, #138034 100%);
    --color-red: #962828;
  }
  #root{
    background-color: var(--color-white);
  }
  body{
    font-family: "Pretendard", sans-serif;
  }

	@font-face {
		font-family: "Pretendard";
		font-weight: 400;
		src: url(./font/Pretendard-Regular.otf) format("otf");
	}

	@font-face {
		font-family: "Pretendard";
		font-weight: 500;
		src: url(./font/Pretendard-Medium.otf) format("otf");
	}
	
	@font-face {
		font-family: "Pretendard";
		font-weight: 600;
		src: url(./font/Pretendard-SemiBold.otf) format("otf");
	}
	
	@font-face {
		font-family: "Pretendard";
		font-weight: 700;
		src: url(./font/Pretendard-Bold.otf) format("otf");
	}


`;
export default GlobalStyle;
