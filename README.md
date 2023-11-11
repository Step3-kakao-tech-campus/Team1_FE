![배너](https://github.com/Step3-kakao-tech-campus/Team1_FE/assets/111048211/3621340d-0bd1-4556-94bd-5583288136ce)


## 프로젝트 설명

알바 매장의 근무 스케줄 관리를 담당하는 서비스입니다.

## 주요 기능

프로젝트의 주요 기능에 대한 설명을 적어주세요.

## 주요 문서 링크

- [API 문서](https://www.notion.so/API-10-08-ver-fb7b0444a9574894938b6cf5e39b38c2?pvs=25)
- [Error 처리 문서](https://www.notion.so/978e4b88b09f4e20a487ec4904eddd67?pvs=25)
- [테스트 시나리오 명세](https://www.notion.so/f070025327fd4ab58086f3da594e3f07)
- [테스트 결과보고서](https://www.notion.so/a47cf45db6314e318030c07b5b3da33a)

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
- 쿼리캐시에 글로벌 에러 핸들러를 등록해 에러 응답을 처리했습니다
- 에러바운더리 폴백을 적용해서 타입별로 에러 페이지를 표시했습니다.
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
#### 성능 최적화
```
- 컴포넌트 분리를 통한 랜더링 최적화
- 필요한 아이콘만 import 해서 사용 - 번들러 크기 개선
- 로더 스켈레톤
```
#### 웹 접근성
```
- 이미지에 대체 텍스트를 추가했습니다.
- 아이콘 버튼에 라벨을 추가했습니다
```

## 반대편 repo

[TEAM1_BE](https://github.com/Step3-kakao-tech-campus/Team1_BE)

## 전체 스트럭쳐

전체 스트럭쳐에 대한 설명을 적어주세요.







<br/><br/>
<details>

<summary>카카오 테크 캠퍼스 3단계 진행 보드</summary>


</br>

## 배포와 관련하여

```

최종 배포는 크램폴린으로 배포해야 합니다.

하지만 배포 환경의 불편함이 있는 경우를 고려하여 

임의의 배포를 위해 타 배포 환경을 자유롭게 이용해도 됩니다. (단, 금액적인 지원은 어렵습니다.)

아래는 추가적인 설정을 통해 (체험판, 혹은 프리 티어 등)무료로 클라우드 배포가 가능한 서비스입니다.

ex ) AWS(아마존), GCP(구글), Azure(마이크로소프트), Cloudtype 

```
## Notice

```
필요 산출물들은 수료 기준에 영향을 주는 것은 아니지만, 
주차 별 산출물을 기반으로 평가가 이루어 집니다.

주차 별 평가 점수는 추 후 최종 평가에 최종 합산 점수로 포함됩니다.
```

![레포지토리 운영-001 (1)](https://github.com/Step3-kakao-tech-campus/practice/assets/138656575/acb0dccd-0441-4200-999a-981865535d5f)
![image](https://github.com/Step3-kakao-tech-campus/practice/assets/138656575/b42cbc06-c5e7-4806-8477-63dfa8e807a0)

[git flowchart_FE.pdf](https://github.com/Step3-kakao-tech-campus/practice/files/12521045/git.flowchart_FE.pdf)


</br>

## 필요 산출물
<details>
<summary>Step3. Week-1</summary>
<div>
    
✅**1주차**
    
```
    - 5 Whys
    - 마켓 리서치
    - 페르소나 & 저니맵
    - 와이어 프레임
    - 칸반보드
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-2</summary>
<div>
    
✅**2주차**
    
```
    - ERD 설계서
    
    - API 명세서
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-3</summary>
<div>
    
✅**3주차**
    
```
    - 최종 기획안
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-4</summary>
<div>
    
✅**4주차**
    
```
    - 4주차 github
    
    - 4주차 노션
```
    
</div>
</details>

---
<details>
<summary>Step3. Week-5</summary>
<div>
    
✅**5주차**
    
```
    - 5주차 github
    
    - 5주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-6</summary>
<div>
    
✅**6주차**
    
```
    - 6주차 github
    
    - 중간발표자료
    
    - 피어리뷰시트
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-7</summary>
<div>
    
✅**7주차**
    
```
    - 7주차 github
    
    - 7주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-8</summary>
<div>
    
✅**8주차**
    
```
    - 중간고사
    
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-9</summary>
<div>
    
✅**9주차**
    
```
    - 9주차 github
    
    - 9주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-10</summary>
<div>
    
✅**10주차**
    
```
    - 10주차 github
    
    - 테스트 시나리오 명세서
    
    - 테스트 결과 보고서
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-11</summary>
<div>
    
✅**11주차**
    
```
    - 최종 기획안
    
    - 배포 인스턴스 링크
```
    
</div>
</details>

---

## **과제 상세 : 수강생들이 과제를 진행할 때, 유념해야할 것**

```
1. README.md 파일은 동료 개발자에게 프로젝트에 쉽게 랜딩하도록 돕는 중요한 소통 수단입니다.
해당 프로젝트에 대해 아무런 지식이 없는 동료들에게 설명하는 것처럼 쉽고, 간결하게 작성해주세요.

2. 좋은 개발자는 디자이너, 기획자, 마케터 등 여러 포지션에 있는 분들과 소통을 잘합니다.
UI 컴포넌트의 명칭과 이를 구현하는 능력은 필수적인 커뮤니케이션 스킬이자 필요사항이니 어떤 상황에서 해당 컴포넌트를 사용하면 좋을지 고민하며 코드를 작성해보세요.

```

</br>

## **코드리뷰 관련: review branch로 PR시, 아래 내용을 포함하여 코멘트 남겨주세요.**

**1. PR 제목과 내용을 아래와 같이 작성 해주세요.**

> PR 제목 : 부산대_0조_아이템명_0주차
> 

</br>

</div>

---

</details>

