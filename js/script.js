
// star
   // 특산품 리스트
    const SPECIALTIES = [
        {
            id: 'L001',
            city: '창원시',
            food: "풋고추",
            img: '창원시_풋고추.jpg',
            open: false
        },
        {
            id: "L002",
            city: "진주시",
            food: "고추",
            img: "진주시_고추.jpg",
            open: false
        },
        {
            id: "L003",
            city: "통영시",
            food: "굴",
            img: "통영시_굴.jpg",
            open: false
        },
        {
            id: "L004",
            city: "사천시",
            food: "멸치",
            img: "사천시_멸치.jpg",
            open: false
        },
        {
            id: "L005",
            city: "김해시",
            food: "단감",
            img: "김해시_단감.jpg",
            open: false
        },
        {
            id: "L006",
            city: "밀양시",
            food: "대추",
            img: "밀양시_대추.jpg",
            open: false
        },
        {
            id: "L007",
            city: "거제시",
            food: "유자",
            img: '거제시_유자.jpg',
            open: false
        },
        {
            id: "L008",
            city: '양산시',
            food: "매실",
            img: "양산시_매실.jpg",
            open: false
        },
        {
            id: "L009",
            city: "의령군",
            food: "수박",
            img: "의령군_수박.jpg",
            open: false
        },
        {
            id: "L010",
            city: "함안군",
            food: "곶감",
            img: "함안군_곶감.jpg",
            open: false
        },
        {
            id: "L011",
            city: "창녕군",
            food: "양파",
            img: "창녕군_양파.jpg",
            open: false
        },
        {
            id: "L012",
            city: "고성군",
            food: "방울토마토",
            img: "고성군_방울토마토.jpg",
            open: false
        },
        {
            id: "L013",
            city: "남해군",
            food: "마늘",
            img: "남해군_마늘.jpg",
            open: false
        },
        {
            id: "L014",
            city: "하동군",
            food: "녹차",
            img: "하동군_녹차.jpg",
            open: false
        },
        {
            id: "L015",
            city: "산청군",
            food: "약초",
            img: "산청군_약초.jpg",
            open: false
        },
        {
            id: "L016",
            city: "함양군",
            food: "밤",
            img: "함양군_밤.jpg",
            open: false
        },
        {
            id: "L017",
            city: "거창군",
            food: "사과",
            img: "거창군_사과.jpg",
            open: false
        },
        {
            id: "L018",
            city: "합천군",
            food: "돼지고기",
            img: '합천군_돼지고기.jpg',
            open: false
        }
    ]
    
    $(document).ready(function () {
        // 게임 시작시 카드 리스트
        let cardList = []
    
        // 선택된 카드 저장(최대 2장)
        let selectList = []
    
        // 선택된 카드 갯수(최대 2)
        let reverseCount = 0
    
    
        const gameCondition = 8;
    
        // 게임 승리 조건
        let gameCount = 0;
    
        // 게임 진행 현황
        let game = false;
    
        // 카드 선택할 수 있는 여부
        let touchable = false;
    
        // 보여주기 시간
        const displayDeadLine = 5;
    
        // 게임 전체 시간 => 게임 시간
        const totalDeadLine = 90;
    
        // 첫번째 카드 뒤집은 후, 다음 카드를 뒤집을 수 있는 시간 => 카드 시간
        const deadLine = 3;
    
        // 보여주기 시간 카운터
        var displayCount = 0;
    
        // 카드 시간 카운터
        var current = 0;
    
        // 게임 시간 카운터
        var totalCurrent = 0;
    
        // 보여주기 시간 타이머 저장용 변수
        var startCountInterval = null
    
        // 카드 타이머 저장용 변수
        var deadLineInterval = [];
    
        // 게임 타이머 저장용 변수
        var totalDeadLineInterval = null;
    
        // 카드 컨테이너
        const card_wrapper = $('.card-wrapper');
    
        // 시작 버튼
        const start_btn = $('.start-btn')
    
        //재시작 버튼
        const refresh_btn = $('.refresh-btn')
    
        // 힌트보기 버튼
        const hint_btn = $('.hint-btn');
    
        // 카운터 다운 DOM
        const timeCounter = $('.time-counter');
    
        // 게임 카운터
        const gameCounter = $('.game-counter');
    
        // 출석 체크 컨테이너
        const dailyCheck = $('.daily-check');
    
        // 종료시 모달
        const finishModal = $('#finish-modal');
    
        // 메시지 모달
        const messageModal = $(".message-modal");
    
        // 종료시 폼
        const finishForm = finishModal.find('#final-form');
    
        const nameInput = finishForm.find('#user_name');
    
        const phoneInput = finishForm.find('#user_phone');
    
        // 카드 섞기 함수
        function cardShuffle() {
            // 카드 뒷면
            const card_case = Math.floor(Math.random() * (24 - 1 + 1)) + 1
    
            // 카드 8장 선택
            const fList = SPECIALTIES.map(item => item).sort(() => Math.random() - 0.5).slice(0, 8);
    
            // 똑같은 카드 8장 생성
            const pasteList = fList.slice(0);
    
            // 위의 두 카드리스트로 덱 생성
            cardList = fList.concat(pasteList).sort(() => Math.random() - 0.5)
    
            // 카드 리스트 섞기
            cardList = cardList.sort(() => Math.random() - 0.5);
    
            // 카드 출력
            renderCard();
        }
    
    
        // 카드 출력 함수
        function renderCard() {
            // 카드 초기화 여부 검사
            if (cardList.length === 0) {
                return;
            }
    
            // 렌더링 될 DOM
            let view = ``;
    
            // 카드 DOM 생성
            cardList.map((item, idx) => {
                const { id, city, img, food } = item;
                view += `<div class="spec-card spec-card-${id}">
                <div class="card-image card-hidden">
                    <img src="../특산품/${img}" />
                    <div class="card-body">
                        <div class="text">
                            <div class="text-center">${city}-${food}</div>
                        </div>
                    </div>
                </div>
                <div class="card-back">
                    <svg width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#55595c" style="fill-opacity: .5;" /><text x="30%"
                            y="50%" fill="#eceeef" dy=".3em">눌러주세요</text>
                    </svg>
                </div>
            </div>
            `;
            })
            // 렌더링
            card_wrapper.html(view);
        }
    
        // 시작 버튼 함수
        function pressStart() {
            // 게임 시작 여부
            game = false;
            gameCounter.removeClass('d-none');
            gameCounter.html(`찾은 카드: ${gameCount}`)
    
            // 카드 앞면, 뒷면 객체
            const images = card_wrapper.find('.card-image')
            const back = card_wrapper.find('.card-back')
    
            // 카드 뒷면은 모두 비활성화, 앞면은 모두 활성화
            images.removeClass('card-hidden');
            back.addClass('card-hidden');
    
            startCount();
    
            // 카드 5초간 공개 후 게임 진행
            setTimeout(() => {
                images.addClass('card-hidden');
                back.removeClass('card-hidden')
                touchable = true;
                reverseCount = 0;
                selectList = [];
                game = true;
                endCount()
                startTotalDeadLine();
            }, 5000);
    
            $(".spec-card").click(function (e) {
                e.preventDefault();
                pressCard($(this));
            })
        }
    
        function getHint() {
            touchable = false;
            game = false;
            const parent = $(".card-wrapper .spec-card")
    
            const images = parent.find('.card-image')
            const back = parent.find('.card-back')
    
            images.removeClass('card-hidden');
            back.addClass('card-hidden')
    
            setTimeout(() => {
                images.addClass('card-hidden');
                back.removeClass('card-hidden')
                touchable = true;
                game = true;
            }, 3000);
    
        }
    
        // 전부 뒤집기(정답인 경우 제외)
        function allBack() {
            const parent = $(".card-wrapper .spec-card")
    
            const images = parent.find('.card-image')
            const back = parent.find('.card-back')
            images.addClass('card-hidden');
            back.removeClass('card-hidden')
            selectList = []
            touchable = true;
        }
    
        // 게임 시간 타이머 시작 함수, 게임 시간 초과시 게임 정지
        function startTotalDeadLine() {
            totalCurrent++;
            timeCounter.html(`남은 시간: ${Math.floor((totalDeadLine - totalCurrent) / 60)}분 ${(totalDeadLine - totalCurrent) % 60}초`)
            timeCounter.removeClass('d-none')
    
            totalDeadLineInterval = setInterval(function () {
                timeCounter.html(`남은 시간: ${Math.floor((totalDeadLine - totalCurrent) / 60)}분 ${(totalDeadLine - totalCurrent) % 60}초`)
                if (totalCurrent === totalDeadLine) {
    
                    endGame();
                    return;
                }
                totalCurrent++;
            }, 1000);
        }
    
        // 게임시간 타이머 정지 함수, 인터벌도 제거
        function removeTotalDeadLine() {
            clearInterval(totalDeadLineInterval);
            totalDeadLineInterval = null;
            totalCurrent = 0;
            game = false;
            touchable = false;
            timeCounter.html('');
            timeCounter.addClass('d-none');
        }
    
        // 카드 시간 타이머 시작 함수
        function startDeadLine() {
            current++;
            deadLineInterval.push(setInterval(function () {
                if (current === deadLine) {
                    selectList = []
                    endDeadLine()
                    allBack();
                }
                current++;
            }, 1000))
        }
    
        // 카드 시간 타이머 정지 함수
        function endDeadLine() {
            deadLineInterval.forEach(item => {
                clearInterval(item);
            })
            // const temp = deadLineInterval.pop();
            // clearInterval(temp);
            deadLineInterval = [];
            current = 0;
            selectList = []
        }
    
        // 보여주기 타이머 시작 함수
        function startCount() {
            displayCount++;
            timeCounter.removeClass('d-none');
            timeCounter.html(`남은시간: ${displayDeadLine}`);
            startCountInterval = setInterval(function () {
                displayCount++;
                timeCounter.html(`남은시간: ${displayDeadLine - displayCount}`);
            }, 1000)
        }
    
        // 보여주기 타이머 정지 함수
        function endCount() {
            clearInterval(startCountInterval);
            displayCount = 0;
            startCountInterval = null;
            timeCounter.html()
            timeCounter.addClass('d-none')
            hint_btn.removeClass('d-none');
        }
    
        // 게임 실패
        function endGame() {
            removeTotalDeadLine();
            const wp = $('.card-wrapper .spec-card');
    
            wp.find('.card-image').css('border', '1px solid #f00')
    
            const image = wp.find('.card-image');
            const back = wp.find('.card-back');
    
    
            image.removeClass('card-hidden');
            back.addClass('card-hidden');
            alert('게임 실패')
        }
    
        // 게임 승리
        function winGame() {
            gameCounter.html(`찾은 카드: ${gameCount}`)
            if (gameCondition - gameCount !== 0) {
                return;
            }
            removeTotalDeadLine();
            setTimeout(function () {
                finishModal.removeClass('d-none');
            }, 1000)
        }
    
        // 정답 확인
        function checkCorrect() {
            touchable = false;
            //  정답 여부 확인
            const correct = selectList.reduce((a, b) => a === b);
            // 정답일 경우
            if (correct) {
                // 선택 리스트에서 클래스 리스트 추출
                const [targetClassList] = selectList;
    
                // 클래스에서 키 추출
                const [, targetClass] = targetClassList.split('spec-card-');
    
    
                // 정답인 엘리멑느의 클래스 변경
                const target = $(`.spec-card-${targetClass}`)
                target.find('.card-image').css('border', '1px solid green');
                target.removeClass('spec-card');
                target.addClass('spec-card-correct');
    
                // 게임 승리 조건 감수
                gameCount++;
    
                // 선택 목록 초기화
                selectList = []
                touchable = true;
                endDeadLine();
                winGame();
                return;
            }
    
            setTimeout(() => {
                endDeadLine()
                allBack();
            }, 1000);
        }
    
        // 카드 선택 함수
        function pressCard(obj) {
    
            const parent = obj
    
            // 이미 성공한 카드 제외
            const pClass = parent.attr('class')
            const cond = pClass.includes('correct');
            if (!touchable || cond) {
                return;
            }
    
            // 카드 뒤집기
            const images = parent.find('.card-image')
            const back = parent.find('.card-back')
            images.removeClass('card-hidden')
            back.addClass('card-hidden')
    
            // 카드 시간 시작
            startDeadLine();
    
    
            // 선택한 카드 저장
            selectList.push(pClass);
    
            if (selectList.length === 2) {
                checkCorrect();
            }
        }
    
        // 초기화
        cardShuffle();
    
        // 시작 버튼 핸들러
        start_btn.on('click', function (e) {
            // 이벤트 무효 처리
            e.preventDefault()
    
            // 다시하기 버튼 활성화
            $('.refresh-btn').removeClass('d-none');
            $('hint-btn').removeClass('d-none');
            $('.sub-title').addClass('d-none')
            $(this).addClass('d-none')
    
            // 카드 섞기
            cardShuffle()
            // 게임 시작
            pressStart();
        })
    
        // 다시하기 버튼 핸들러
        refresh_btn.on('click', (e) => {
            // 이벤트 무효 처리
            e.preventDefault();
    
            // 게임 상태 체크 => 다시하기 버튼 누른 후에, 또다시 다시하기 이벤트 발생 방지
            if (!game) {
                return;
            }
    
            // 게임 시간 초기화
            removeTotalDeadLine();
            gameCount = 0
    
            cardShuffle()
            pressStart()
        })
    
        hint_btn.on('click', (e) => {
            e.preventDefault();
            if (!game) {
                return;
            }
    
            getHint();
        })
    
        // 전화번호 포맷
        phoneInput.keypress(function (e) {
            $(this).val($(this).val().replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        })
    
        // 참여정보 등록 핸들러
        finishForm.submit(function (e) {
            e.preventDefault();
            const userName = $('#user_name');
            const userPhone = $('#user_phone');
    
            const user_name = userName.val();
            const user_phone = userPhone.val();
    
            const checklist = dailyCheck.find('.check-card');
    
            const mark = checklist.find('.stamp-star').first();
            const date = checklist.find('.check-date').first();
    
            const d = new Date();
    
            mark.removeClass('d-none');
            date.html(`${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}(찾은카드: ${gameCount})`);
            checklist.first().addClass('check-card-active').removeClass('check-card');
    
    
            finishModal.addClass('d-none');
            messageModal.removeClass('d-none')
            hint_btn.addClass('d-none');
            gameCounter.html('');
            userName.val('');
            userPhone.val('');
            gameCount=0;
            $('.refresh-btn').addClass('d-none');
            $('.start-btn').removeClass('d-none');
            setTimeout(() => {
                messageModal.addClass('d-none')
            }, 5000);
        })
    
        const modalBtn = $("#WriteBtn");
    
        const reviewModal = $('.review-modal');
    
        const reviewForm = $('#review-form');
    
        const reviewFiles = $('#review_files');
    
        const successAlert = $('.review-success');
    
        const failureAlert = $('.review-failure');
    
        let imgList = [];
    
    
        function readURL(input) {
            if (input.files && input.files[0]) {
              if(input.files[0].type === "image/jpeg")
                var reader = new FileReader();
                reader.onload = function (e) {
                  console.log(reviewForm.find('.upload-img').last().removeClass('d-none').attr('src', e.target.result))
                  $('.review-img-container').append('<img src="#" alt="upload-img" class="upload-img d-none" />')
                }
                reader.readAsDataURL(input.files[0]);
                imgList.push(input.files[0]);
                console.log(imgList)
            }
        }
    
    
    
        modalBtn.click(function (e) {
            reviewModal.removeClass('d-none');
        })
        
        reviewForm.submit(function (e) {
            e.preventDefault();
            const userNm = $(this).find('#user_nm');
            const goodsNm = $(this).find('#review_goods');
            const shopNm = $(this).find('#shop_nm');
            const buyDate = $(this).find('#buy_date');
            const reviewContent = $(this).find('#review_content');
            const ratings = $(this).find('#review-rating .rating__input:checked').get(0).value;
    
            // Do Somethings
    
            userNm.val('');
            goodsNm.val('');
            shopNm.val('');
            buyDate.val('');
            reviewContent.val('');
            imgList = [];
    
            reviewForm.find('.rating__input--none').get(0).checked=true;
            successAlert.removeClass('d-none');
            reviewModal.addClass('d-none');
    
    
            setTimeout(() => {
              successAlert.addClass('d-none');
            }, 3000);
    
        });
    
        reviewFiles.change(function () {
          readURL(this);
        })
    
    });