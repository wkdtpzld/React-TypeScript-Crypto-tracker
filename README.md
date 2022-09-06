# Coin-tracker 
----

코인 트래커 API를 사용한 실시간 COIN 가격을 불러오는 웹 서비스입니다.
https://wkdtpzld.github.io/React-TypeScript-Crypto-tracker/

----

## 사용기술

<img src="https://img.shields.io/badge/Typescript-192a56?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-487eb0?style=flat-square&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-square"> <img src="https://img.shields.io/badge/reactQuery-FF4154?style=flat-square&logo=reactquery&logoColor=white"> 

----

## 계기

TypeScript에 대한 이해도, ReactQuery에 대한 이해도를 습득하기 위함.
또한 실시간 api를 반복해서 가져오는 작업이 필요했음.

-----

## 중점으로 구현한 부분

### styled-components

지금까지는 scss, css를 이용한 스타일링을 하였습니다.

하지만 html div태그로 도배되는 코드로 해당 코드의 역할에 대한 이해도가 떨어졌기 떄문에

styled-component를 이용하여 클린코드를 구현하기 위해 노력하였습니다.

![image](https://user-images.githubusercontent.com/87063105/188733446-be071784-970e-4e79-a743-9baaedf62e53.png)

각 태그에 대한 역할의 의미를 잘 담아 작성하였고

알아보기 쉽고 해당 역할에 대한 이해도가 상승하였습니다.

### React-query

지금까지의 프로젝트를 보면 axios를 통하여 API를 호출하였지만

다른 라우터를 호출하고 되돌아갔을때 똑같은 API를 호출하며 로딩을 다시하게 됩니다.

하지만 react-query를 사용하여 캐시에 저장을 시켰고 재로딩의 필요없이 관리가 가능해졌습니다.

또한 refetch를 사용하여 반복적인 API호출이 가능했습니다.

![image](https://user-images.githubusercontent.com/87063105/188734956-0be6e19a-bed7-4cfb-aeb9-14b75c0fe514.png)

![image](https://user-images.githubusercontent.com/87063105/188735139-3cd63e29-87ac-41ab-bdf9-ca7aaeb65df9.png)

