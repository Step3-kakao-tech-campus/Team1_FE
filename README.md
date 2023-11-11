![배너](https://github.com/Step3-kakao-tech-campus/Team1_FE/assets/111048211/3621340d-0bd1-4556-94bd-5583288136ce)


## 프로젝트 설명

####

영화관, 패스트푸드 등의 업장에서는 `스케줄 근무`를 시행합니다. 알바생들은 고정된 요일에 근무하지 않고, 근무 가능한 시간을 고려하여 매주 `스케줄`을 바탕으로 근무하게 됩니다.

매니저는 모든 알바생들의 근무 가능 시간을 텍스트로 수집하고, 이를 엑셀을 통해 취합합니다. 이 수동적인 작업은 시간, 노력이 많이 요구됩니다. 그래서 `자동화된 스케줄링` 서비스에 대한 니즈를 파악하였고, 저희 1조가 `스케줄, 알빠임?` 서비스를 개발하게 되었습니다.

#### 매니저라면?

1. `알빠임?`이 스케줄을 짜줘요! 자동 스케줄링 기능
   - 매주, 알바생이 필요한 `시간/인원`을 설정하여 스케줄을 세부적으로 `모집`할 수 있어요.
   - 알바생들이 스케줄을 신청했다면, 실시간으로 `신청 현황`을 확인할 수 있어요.
   - `알빠임?`만의 `스케줄링 알고리즘`을 통해 추천된 스케줄을 확인하고, 확정하여 공유할 수 있어요.

#### 알바생이라면?

1. 빠르고 간편한 내 스케줄 확인!

   - `달력 바탕의 UI`로 스케줄을 빠르고 간편하게 확인할 수 있어요.

2. 대타를 구하기 편해요!
   - 다른 알바생들이 언제 스케줄을 신청했는지 확인할 수 있어요. `대타`를 구할 때 분명 도움이 될 거예요!


## 주요 기능

#### flow에 따른 기능

| 알바생                | 매니저                        |
| --------------------- | ----------------------------- |
| kakao 회원가입/로그인 | kakao 회원가입/로그인         |
|                       | 그룹 생성                     |
| 그룹 가입             |                               |
|                       | 모집 시작                     |
| 스케줄 신청/수정      |                               |
|                       | 실시간 신청 현황 확인         |
|                       | 추천 스케줄 확인 및 모집 마감 |
| 확정 스케줄 확인      | 확정 스케줄 확인              |

## 주요 문서 링크

- [API 문서](https://www.notion.so/API-10-08-ver-fb7b0444a9574894938b6cf5e39b38c2?pvs=25)
- [Error 처리 문서](https://www.notion.so/978e4b88b09f4e20a487ec4904eddd67?pvs=25)
- [테스트 시나리오 명세](https://www.notion.so/f070025327fd4ab58086f3da594e3f07)
- [테스트 결과보고서](https://www.notion.so/a47cf45db6314e318030c07b5b3da33a)
- [와이어 프레임](https://www.figma.com/file/NPlfOX5C2seLsJOuGJJLti/1%EC%A1%B0-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=0%3A1&mode=design&t=MluLXkeWbkZ4UhD3-1)
- 
## 배포 링크

[풀스택 배포 링크](링크를_넣어주세요)   
[프론트엔드 테스트용 배포 링크](https://k14c7827846a9a.user-app.krampoline.com)

## 기술 스택 
<div>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TYPESCRIPT&logoColor=white">
<img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=REACT&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Redux&logoColor=white">
JOTAI
</div>
<div>
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=GIT&logoColor=white">
<img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GITHUB&logoColor=white">
<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=for-the-badge&logo=VISUAL STUDIO CODE&logoColor=white">
</div>


## 사용 방법


1. clone repository
```
$ git clone https://github.com/Step3-kakao-tech-campus/Team1_FE.git
```

2. install package
```
npm install
```

3. run
```
npm run start
```


## 디렉토리 구조

페이지 별 디렉토리 분류

```
📂 src
  ┣ 📂 apis
  ┣ 📂 components       : 페이지 범용 컴포넌트
     ┗ 📂 @commons      : 재사용 컴포넌트
  ┣ 📂 error            : 에러 핸들러
  ┣ 📂 hooks            : 재사용 훅
  ┣ 📂 pages
     ┗ 📂 특정 페이지
        ┣ 📂 섹션        : 같은 path에서 상태에 따라 바뀌는 페이지 단위
        ┣ 📂 훅
        ┣ 📄 index.js    
        ┗ 📄 states.js   : 전역 상태 선언
  ┣ 📂 privateRoutes    : path 접근 권한 설정
  ┣ 📂 styles           : 폰트, index.css 
  ┣ 📂 utils
  ┣ 📄 App.js
  ┗ 📄 index.js
📂 tests
```


## 강조할 점

#### 예외 처리
```
- 페이지 별 접근 권한 체크 후, 권한이 없을 시 적절하게 리다이렉트되도록 처리했습니다.
- 서비스 자체 에러코드를 BE와 함께 정의했고, 에러 응답을 받으면 자체 에러코드를 참조하여 처리했습니다.
- 악의적 접근 시 상태코드로 에러 원인을 유추할 수 없도록 처리했습니다.
- 에러바운더리가 처리할 수 없는 에러는 쿼리캐시에 글로벌 에러 핸들러를 등록해 에러 응답을 처리했습니다
- 에러바운더리 폴백을 적용해서 에러 페이지를 표시했습니다.
- 폼 입력값의 validation 오류가 있을 경우 요청을 보낼 수 없도록 처리했습니다.
```
#### 버튼 기능 구현의 적절성
```
- validation 미충족 시 버튼의 색상을 비활성 색상으로 변경했습니다.
- 버튼 클릭 시 POST 요청과 페이지 이동이 일어나도록 구현했습니다.
```
#### 코드의 재사용성
```
- 재사용 컴포넌트는 component/@commons 폴더에 모아두었습니다.
- 일회성 컴포넌트는 page 레벨에 선언하고, 재사용 컴포넌트만 모아두어 찾기 쉽도록 디렉토리를 구성했습니다.
- 서비스에 자주 등장하는 달력과 근무표 컴포넌트를 재사용했습니다.
- 스케줄 페이지, 주차 선택 페이지 등 유사 페이지를 재사용했습니다.
- view 와 핸들러를 분리해서 필요한 부분만 재사용할수 있게 다형성을 구현했습니다.
```
#### 객체지향 설계 기반의 상태 관리
- 단일 책임 원칙
    - 컴포넌트를 View / 상태관리 담당 훅 / fetch 담당 훅 / 유틸리티 함수 로 분리했습니다.
- 개방 폐쇄 원칙 (다형성)
    - styled component 에 props를 전달해 동일 컴포넌트의 스타일을 상황에 맞게 변경했습니다.
- 리스코프 치환 원칙
    - 겹치는 타입을 상속해서 사용했습니다
- 인터페이스 분리
    - 재사용 함수나 컴포넌트에 필요한 파라미터만 따로 분리해서 전달했습니다.
- 의존성 역전 원칙
    - 대부분의 로직을 커스텀훅에서 함수로 한번 캡슐화해서 라이브러리가 변경되더라도 쉽게 교체가 가능하도록 구현
#### 성능 최적화
```
- 컴포넌트에서 꼭 필요한 전역상태만 가져오도록해 불필요한 랜더링을 줄였습니다.
- 응답 데이터가 실시간성이 없는 경우, 쿼리 캐시를 사용해서 불필요한 재요청을 방지했습니다.
- 필요한 아이콘만 import 해서 사용 - 번들러 크기를 개선했습니다
- 로더/스켈레톤을 적용해 체감 로딩시간을 다운했습니다.
- 로더/스켈레톤은 로딩 시간 2초가 지나야 보이도록 구현했습니다.
```
#### 웹 접근성
```
- 이미지에 대체 텍스트를 추가했습니다.
- 아이콘 버튼에 라벨을 추가했습니다
```


## ERD
![ERD drawio](https://github.com/Step3-kakao-tech-campus/Team1_FE/assets/111048211/ed0b6044-fe85-40c0-957a-e3a27429761e)



## 백엔드 repo

[TEAM1_BE](https://github.com/Step3-kakao-tech-campus/Team1_BE)



