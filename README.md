# Branch Architecture
![스크린샷 2024-11-14 오후 1 24 58](https://github.com/user-attachments/assets/5c337fc4-2a2f-4074-abf2-79b5a3fa9c5c)

ex) 
- member server를 만들때!
- master: 배포가 되는 브랜치
- develop: 배포전 임시

### 생성되는 jira branch 이름
![스크린샷 2024-11-14 오후 1 25 05](https://github.com/user-attachments/assets/93331e43-2bbd-4028-9108-c7835ade57ef)

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

# Merge Request
### Title (Squash Commit) Format
![스크린샷 2024-11-14 오후 1 30 38](https://github.com/user-attachments/assets/5c3236bf-2745-4d0e-a292-246441abebb9)
```
[BE or FE] Merge: 내용 복사: 
```
### Description

자동 생성되는 내용을 작성해주세요 <br />
![스크린샷 2024-11-14 오후 1 31 41](https://github.com/user-attachments/assets/6dfb1ae3-638b-4b71-bb9e-3403fe90cf42)
```
## Pull Request Check List

- [ ] 타겟브랜치 이름 여기에 쓰기
- [ ] 리뷰어가 체크해야할 사항이 있으면 쓰기 1
- [ ] 리뷰어가 체크해야할 사항이 있으면 쓰기 2

## To Reviewer

- 요청 사항
```

ex) <br />
![스크린샷 2024-11-14 오후 1 32 23](https://github.com/user-attachments/assets/4e0734e1-fee6-4a9e-8631-dd6ac674411a)

## Reviewer
![스크린샷 2024-11-14 오후 1 32 34](https://github.com/user-attachments/assets/ef74bcd4-1db3-4898-bbbb-9848582ec988)

## Assigned
Title  Convention과 Check List가 모두 `체크` 되었는지 확인하고 merge 완료 하시면 됩니다.


