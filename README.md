# Branch Architecture
- master: 배포가 되는 브랜치
- develop: 배포전 임시
- KAN-[number]: Jira 스토리 번호

### 생성되는 jira branch 이름
![Group 39659](https://github.com/user-attachments/assets/f9db5dff-116c-4bf4-a234-09e0f8ba4a67)

# Commit
### Commit Format
Type: content

```
feat: Seo 기능 추가

feat: Header 스타일 추가

git commit -m "feat: "
```
### Commit Type
| 타입         |설명                                                           | 예시                                                  |
| ------------ | -------------------------------------------------------------- | ----------------------------------------------------- |
| **feat**     | 새로운 기능을 추가할 때 사용합니다.                            | `feat: 로그인 폼 유효성 검사 추가`                 |
| **fix**      | 버그를 수정할 때 사용합니다.                                   | `fix: 로그인 버그 수정`                            |
| **style**    | 사용자 인터페이스 관련 변경 사항.                              | `style: 네비게이션 바 디자인 수정`                 |
| **refactor** | 버그 수정이나 기능 추가 없이 코드 구조를 개선할 때 사용합니다. | `refactor: 컴포넌트 상태 관리 로직 단순화`         |
| **perf**     | 성능을 개선하는 코드 변경.                                     | `perf: 이미지 로딩 시간 최적화`                   |
| **test**     | 테스트 코드를 추가하거나 수정할 때 사용합니다.                 | `test: 버튼 컴포넌트에 대한 단위 테스트 추가`      |
| **docs**     | 문서만 변경할 때 사용합니다.                                   | `docs: 설치 단계 README에 추가`                    |
| **chore**    | 소스나 테스트 파일을 수정하지 않는 일반적인 작업이나 업데이트. | `chore: 종속성 패키지 업데이트`                    |
| **revert**   | 이전 커밋을 되돌릴 때 사용합니다.                              | `revert: "로그인 폼 유효성 검사 추가" 커밋 되돌림` |
| **init**     | 프로젝트 초기 설정 시 사용합니다.                              | `init: React 프로젝트 초기 설정`                   |
| **delete**   | 코드/파일 삭제.                                                | `delete: 안 쓰는 로그인 컴포넌트 삭제`             |
| **wip**      | 작업 중이거나 실험적인 변경 사항.                              | `wip: 새로운 인증 방법을 실험 중`                  |

# Pull Request

### Description

```
## 작업 내용

- 작업 내용 1
- 작업 내용 2

## 참고

- 구현한 화면이나 영상
- bug fix면 어떻게 해결했는지
```


