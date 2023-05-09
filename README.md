## GaMe Zone : Game for MZ

부제 : MZ세대, 1980년대부터 2010년대까지 다양한 연령이 즐길 수 있는 웹 게임 사이트

### 팀명 : 무중생유 (만물은 무에서 탄생한다.)

#### <팀원>

> 1. 최도원 `ENTJ`
> 2. 이민우 `ENTJ`
> 3. 이민영
> 4. 최윤재
> 5. 정혜린
> 6. 권성경

#### <팀명 4행시 공모전>

수상자 `정혜린`

> `무`모해보여도
> `중`간까지는 올라가보자!
> `생`각보다 별거 아니네?
> `유`후~

### 기술 스택

> `<FrontEnd>`
>
> React.js / TypeScript / Styled Component
>
> `<BackEnd>`
>
> Node.js / Express.js / MongoDB
>
> `<Launching>`
>
> AWS

### 프로젝트 소개

> #### 1. 서비스 개요
>
> 1. 다양한 장르의 웹 게임을 제공합니다. (몇 개를 할 지는 회의로 결정)
>    => 10초 맞추기 게임 / Up&Down 숫자 맞추기 게임 / ...
> 2. 회원가입이 가능하고, 회원가입 시 더욱 게임을 편하게 즐길 수 있는 기능이 제공됩니다.
> 3. 회원만 이용 가능한 회원 커뮤니티가 존재합니다.
> 4. 관리자는 회원 관리 / 등록된 게임 관리 / 게시판 관리가 가능합니다.
> 5. 회원은 플레이한 게임 이력에 따라 레이팅 및 랭킹이 부여됩니다.
> 6. (미래) 사이트가 대박나면 게임 공모전을 열 수도 있습니다.
> 7. (미래) 모바일 버전이 제공됩니다.
>
> #### 2. 클라이언트
>
> 1. `메인 페이지`에서 서비스 중인 게임을 확인할 수 있고, 사용자가 원하는 조건에 따라 정렬이 가능합니다.
>    ㄴ 검색/정렬 카테고리 : 게임명 / 인기도 / 장르(전략&액션&대전&...) / 플레이어(Solo, 2P, 3P, ...
>    ㅡ> 각 조건별로 오름차순/내림차순 정렬과 1페이지에 출력할 컨텐츠 수를 결정할 수 있습니다.
> 2. `메인 페이지`에서 최고 레이팅 유저 랭킹을 볼 수 있습니다.
> 3. `마이 페이지`에서 플레이한 게임 / 즐겨찾기한 게임 / 자주 플레이한 게임 목록을 볼 수 있습니다.
> 4. `마이 페이지`에서 회원 간에 친구 등록이 가능합니다.
> 5. `마이 페이지`에서 개인정보 수정, 탈퇴가 가능합니다.
> 6. `게임 페이지`에서는 해당 게임에서 본인이 기록한 최근 기록, 친구로 등록한 사용자의 기록, 가장 높은 점수를 획득한 플레이어의 ID(닉네임), 기록을 볼 수 있습니다.(명예의 전당 시스템)
> 7. `게임 페이지` 에서는 설명서, 게임 컨트롤러, 게임 플레이 화면, 기록실을 확인할 수 있습니다.
> 8. (추가) 메인페이지는 반응형 웹으로, 창 크기에 따라 사용자가 보기 편하게 레이아웃이 변경됩니다.
> 9. (추가) 회원 간 쪽지 기능을 제공합니다.
> 10. `관리자 페이지` 에서는 회원정보 / 게임정보 / 게임기록정보 전체 열람이 가능합니다.
> 11. `관리자 페이지` 에서는 회원정보 변경 / 삭제가 가능합니다.
> 12. `관리자 페이지` 에서는 특정 회원의 기록을 삭제할 수 있습니다. (변경은 불가능함. 삭제만 가능함.)
> 13. `관리자 페이지` 에서는 게임 추가 / 게임 코드 수정 / 게임 삭제 / 카테고리 수정이 가능합니다.
>     ㅡ> 이게 가능한 지 모르겠는데, 작성되어 있는 게임 코드를 읽어오고 수정할 수 있는건가?
>     ㅡ> 안된다면 어떻게 구현할건가? 보통 게임 사이트에서는 어떻게 하고 있는지 확인 필요하다.
>
> #### 3. 서버
>
> 1. 서버에는 회원 정보 / 게임 기록 / 게임 정보 / 커뮤니티 게시글 정보 / 쪽지 등이 저장됩니다.
> 2. 게임 별 랭킹 검색, 유저 별 기록 검색, 전체 레이팅 검색, 친구로 등록된 유저의 기록 검색 등을 제공합니다.

### 와이어 프레임(초안)

[피그마 링크](https://www.figma.com/file/GfBaVFIbmuUCpldLqQe7Tb/%EB%AC%B4%EC%A4%91%EC%83%9D%EC%9C%A0?type=design&node-id=0%3A1&t=R3CDJK668cA0HnJw-1)

https://www.figma.com/file/GfBaVFIbmuUCpldLqQe7Tb/%EB%AC%B4%EC%A4%91%EC%83%9D%EC%9C%A0?type=design&node-id=0%3A1&t=R3CDJK668cA0HnJw-1

1. 메인 페이지
   (상단) 로고, 회원가입, 로그인(로그인 시 회원정보/마일리지), 마이페이지
   (메인) 인기 게임 배너, 게임 목록, 검색 및 정렬
   (하단) 제작팀 소개
2. 마이 페이지
   (상단) 메인과 동일
   (좌측) 회원정보 보기 / 쪽지함 /즐겨찾기한 게임 목록 / 기록실 / 회원탈퇴
   (메인) 가입정보, 게임목록(플레이한, 자주플레이한, 높은기록을낸) 요약
3. 게임 페이지
   (상단) 메인과 동일
   (좌측) 설명서 / 기록실 / 게임시작
   (메인:게임시작 선택 시, 게임화면 내 레이아웃)
   ㅡ> (상단) 시작&리셋&일시정지&종료&저장
   ㅡ> (중단) 현재 게임 스코어, 게임 플레이 화면
   ㅡ> (하단) ID, 자신의 랭킹 등
   ㅡ> (우측) 기록실 요약 (명예의전당, 개인기록실, 친구기록실)
