# Real POS - 웹 기반 POS 시스템

카페, 음식점을 위한 실시간 주문 관리 시스템입니다.

## 주요 기능

**메뉴 관리**

- 메뉴 등록/수정/삭제
- 실시간 메뉴 상태 관리

**주문 처리**

- 실시간 주문 접수 및 처리
- 주문 상태 관리 (접수 → 준비 중 → 완료)
- Server-Sent Events로 실시간 주문 알림

**매출 분석**

- 당일/월별 매출 통계
- 차트를 통한 시각적 분석

**사용자 관리**

- 로그인/회원가입
- 프로필 관리
- JWT 토큰 자동 갱신

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: TailwindCSS + shadcn/ui
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query
- **폼 관리**: React Hook Form + Zod
- **차트**: Recharts
- **실시간**: Server-Sent Events

## 아키텍처

Feature-Sliced Design 구조를 사용합니다:

```
src/
├── app/                    # Next.js 페이지 및 API
├── entities/               # 비즈니스 엔티티 (menu, order, user)
├── features/               # 기능별 모듈 (auth, menu-manage, order-manage)
├── shared/                 # 공통 컴포넌트, 유틸리티, API
├── widgets/                # 페이지별 위젯
└── views/                  # 페이지 뷰
```

## 백엔드 서버

이 프론트엔드와 함께 동작하는 백엔드 서버는 별도 레포지토리에서 관리됩니다:

- [Real POS Backend](https://github.com/93minki/real-pos)

## 시작하기

**설치**

```bash
yarn install
```

**환경 변수**

```bash
# .env.local 파일 생성
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**개발 서버 실행**

```bash
yarn dev
```

브라우저에서 `http://localhost:3000` 접속

**프로덕션 빌드**

```bash
yarn build
yarn start
```

## 주요 페이지

- `/` - 메뉴 관리 (메인)
- `/order-manage` - 주문 관리
- `/sales-dashboard` - 매출 대시보드
- `/profile` - 사용자 프로필
- `/signin` - 로그인
- `/signup` - 회원가입
