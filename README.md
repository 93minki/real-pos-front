# 🍽️ Real POS - 실시간 주문 관리 시스템

**Real POS**는 카페, 음식점 등의 매장을 위한 현대적인 웹 기반 POS(Point of Sale) 시스템입니다. 실시간 주문 처리, 메뉴 관리, 매출 분석 등 매장 운영에 필요한 모든 기능을 제공합니다.

## ✨ 주요 기능

### 🛒 주문 관리

- **실시간 주문 처리**: 고객 주문을 실시간으로 접수하고 처리
- **주문 카트**: 직관적인 메뉴 선택 및 주문 구성
- **주문 상태 관리**: 주문 접수 → 준비 중 → 완료 단계별 관리
- **주문 내역 조회**: 당일/월별 주문 내역 확인

### 📋 메뉴 관리

- **메뉴 등록/수정/삭제**: 실시간 메뉴 관리
- **카테고리별 분류**: 체계적인 메뉴 구성
- **가격 및 상태 관리**: 메뉴별 가격 설정 및 활성/비활성 상태 관리

### 📊 매출 대시보드

- **실시간 매출 현황**: 당일/월별 매출 통계
- **차트 및 그래프**: 시각적 매출 분석
- **주문 통계**: 인기 메뉴, 주문 패턴 분석

### 👤 사용자 관리

- **직원 계정 관리**: 로그인/회원가입/로그아웃
- **프로필 관리**: 개인정보 수정 및 계정 관리
- **권한 기반 접근 제어**: 보안이 강화된 인증 시스템

### ⚡ 실시간 기능

- **Server-Sent Events(SSE)**: 새로운 주문 실시간 알림
- **자동 업데이트**: 주문 상황 실시간 동기화

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts

### Backend Integration

- **API**: RESTful API 통신
- **Authentication**: JWT 토큰 기반 인증
- **Real-time**: Server-Sent Events (SSE)

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # 인증 관련 API
│   │   ├── menu/                 # 메뉴 관리 API
│   │   ├── order/                # 주문 관리 API
│   │   └── user/                 # 사용자 관리 API
│   ├── order-manage/             # 주문 관리 페이지
│   ├── sales-dashboard/          # 매출 대시보드 페이지
│   ├── profile/                  # 프로필 관리 페이지
│   ├── signin/                   # 로그인 페이지
│   └── signup/                   # 회원가입 페이지
├── components/                   # 재사용 가능한 컴포넌트
│   ├── pages/                    # 페이지별 컴포넌트
│   │   ├── auth/                 # 인증 관련 컴포넌트
│   │   ├── order-cart/           # 주문 카트 컴포넌트
│   │   ├── order-manage/         # 주문 관리 컴포넌트
│   │   ├── profile/              # 프로필 관리 컴포넌트
│   │   └── sales-dashboard/      # 대시보드 컴포넌트
│   └── ui/                       # 기본 UI 컴포넌트
├── lib/                          # 유틸리티 및 설정
├── provider/                     # Context Providers
└── order-store.ts               # Zustand 상태 관리
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn 패키지 매니저

### 설치 및 실행

1. **의존성 설치**

```bash
npm install
# 또는
yarn install
```

2. **환경 변수 설정**

```bash
# .env.development 파일 생성
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **개발 서버 실행**

```bash
npm run dev
# 또는
yarn dev
```

4. **브라우저에서 확인**

```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📱 주요 화면

### 1. 메인 주문 화면

- 좌측: 메뉴 선택 화면
- 우측: 주문 카트 및 결제

### 2. 주문 관리 화면

- 실시간 주문 목록
- 주문 상태 변경
- 주문 내역 조회

### 3. 매출 대시보드

- 일별/월별 매출 통계
- 인기 메뉴 분석
- 시각적 차트 제공

### 4. 관리자 기능

- 메뉴 등록/수정/삭제
- 사용자 계정 관리
- 시스템 설정

## 🔧 개발 환경 설정

### ESLint 및 Prettier

```bash
npm run lint          # 코드 린팅 검사
npm run lint:fix      # 자동 수정
```

### TypeScript 타입 검사

```bash
npx tsc --noEmit      # 타입 에러 검사
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 Issues 탭을 이용해 주세요.

---

**Real POS** - 매장 운영을 더 스마트하게 🚀
