import { createRoute } from "./AIRoute.js";

document.addEventListener("DOMContentLoaded", () => {
    const backToMainBtn = document.getElementById("backToMainBtn");
    const newRouteContainer = document.querySelector(".new-route")
    const nextBtn = document.getElementById("nextBtn")
    const prevBtn = document.getElementById("prevBtn")
    const submit = document.querySelector("#submit")
    const errorSpan = document.querySelector(".next-prev span")
    const RouterIcons = document.querySelectorAll(".Qs-Routers i")
    const Questions = [...document.querySelectorAll(".Question")]

    backToMainBtn.addEventListener("click", () => {
        newRouteContainer.classList.remove("active")
        document.body.style.overflow = 'scroll';
        let hiddenDiv = document.querySelector("body>div")
        let hiddenSec = document.querySelector("body>section")
        let hiddenHeader = document.querySelector("body>header")
        hiddenDiv.style.display = "block"
        hiddenHeader.style.display = "flex"
        hiddenSec.style.display = "flex"
    })
    const dataAnswers = [
        {
            question: "age",
            answer: [],
            id: 1,
            status: "normal"
        },
        {
            question: "EnLang",
            answer: [],
            id: 2,
            status: "normal"
        },
        {
            question: "Experience",
            answer: [],
            id: 3,
            status: "normal"
        },
        {
            question: "favorite",
            answer: [],
            id: 4,
            status: "normal"
        },
        {
            question: "style",
            answer: [],
            id: 5,
            status: "normal"
        },
        {
            question: "target",
            answer: [],
            id: 6,
            status: "normal"
        },
        {
            question: "hour",
            answer: [],
            id: 7,
            status: "normal"
        },
        {
            question: "math",
            answer: [],
            id: 8,
            status: "normal"
        },
        {
            question: "how",
            answer: [],
            id: 9,
            status: "normal"
        }
    ]

    // ثبت نهایی
    const submitFinish = () => {
        let showSubmit = true;
        dataAnswers.map(data => {
            if (!data.answer.length) {
                showSubmit = false;
            }
        })
        showSubmit ? submit.classList.remove("disable") : submit.classList.add("disable")
        submit.addEventListener("mouseenter", () => {
            submit.classList.contains("disable") ? errorSpan.classList.add("active") : errorSpan.classList.remove("active")
        })
        submit.addEventListener("mouseout", () => { errorSpan.classList.remove("active") })
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            if (!submit.classList.contains("disable")) {
                createRoute(dataAnswers)
            }
        })
    }
    submitFinish()


    // پاسخگویی به سوالات
    dataAnswers[0].status = "current";
    let Q4answers = [];
    let Q5answers = [];
    let Q6answers = [];
    let Q9answers = [];
    const selectOption = (QNumber, ansBtn) => {
        if (QNumber == 4 || QNumber == 5 || QNumber == 6 || QNumber == 9) {
            const toggleBtn = (Qanswers) => {
                if (ansBtn.classList.contains("active")) {
                    ansBtn.classList.remove("active")
                    let index = Qanswers.indexOf(ansBtn.id)
                    Qanswers.splice(index, 1)
                } else {
                    ansBtn.classList.add("active")
                    Qanswers.push(ansBtn.id)
                }
                dataAnswers[QNumber - 1].answer = Qanswers;
            }
            switch (QNumber) {
                case 4:
                    toggleBtn(Q4answers)
                    break;
                case 5:
                    toggleBtn(Q5answers)
                    break;
                case 6:
                    toggleBtn(Q6answers)
                    break;
            }
            const AllQBtn = [...ansBtn.parentElement.children];
            if (QNumber == 9) {
                if (ansBtn.id == 'Q9-notsure') {
                    AllQBtn.map(btn => btn.classList.remove("active"))
                    ansBtn.classList.add("active")
                    Q9answers.length = 0;
                    Q9answers.push(ansBtn.id)
                } else if (ansBtn.id !== 'Q9-notsure') {
                    AllQBtn.map(btn => {
                        if (btn.id == 'Q9-notsure') {
                            btn.classList.remove("active")
                            let index = Q9answers.indexOf(btn.id)
                            if (index != -1) { Q9answers.splice(index, 1); }
                        }
                    })
                    if (ansBtn.classList.contains("active")) {
                        ansBtn.classList.remove("active")
                        let index = Q9answers.indexOf(ansBtn.id)
                        if (index != -1) { Q9answers.splice(index, 1); }
                    } else {
                        ansBtn.classList.add("active")
                        Q9answers.push(ansBtn.id)
                    }
                }
                if (dataAnswers[QNumber - 1].answer != '') {
                    dataAnswers[QNumber - 1].status = 'dones'
                }
                dataAnswers[QNumber - 1].answer = Q9answers;
            }

        } else {
            const AllQBtn = [...ansBtn.parentElement.children];
            AllQBtn.map(btn => btn.classList.remove("active"))
            ansBtn.classList.add("active")
            dataAnswers[QNumber - 1].answer = [ansBtn.id]
        }
        if (QNumber == 9) { submitFinish() }
    }
    Questions.map((Q, i) => {
        const QArray = [...Q.children]
        const buttons = [...QArray[1].children]
        buttons.map(btn => btn.addEventListener("click", (e) => { selectOption(i + 1, e.target) }))
    })



    // تغییرات ظاهری
    const RIArray = [...RouterIcons]
    const changeView = (QNumber) => {
        const currentQ = document.querySelector(".Question.active");
        const nextQ = Questions[QNumber - 1];

        // اگر سوال فعالی وجود دارد، ابتدا انیمیشن خروج بزنیم
        if (currentQ) {
            currentQ.classList.remove("active");
            // جهت انیمیشن: چپ یا راست
            const currentIndex = Questions.indexOf(currentQ);
            const newIndex = QNumber - 1;
            const outClass = newIndex > currentIndex ? "out-right" : "out-left";
            currentQ.classList.add(outClass);

            // بعد از انیمیشن، کلاس‌ها را پاک کن
            setTimeout(() => {
                currentQ.classList.remove(outClass);
            }, 500);
        }

        // سپس سوال جدید را با کلاس active اضافه کنیم
        nextQ.classList.add("active");

        // آپدیت آیکون‌ها و دکمه‌ها مثل قبل
        dataAnswers.map(data => {
            RIArray[data.id - 1].className = "rounded-circle d-flex border border-dark fs-7 pt-1";
            RIArray[data.id - 1].classList.add(data.status)
        })
        if (dataAnswers[QNumber - 1].answer != '') {
            RIArray[QNumber - 1].classList.add('done-current')
        }

        if (QNumber == 1) {
            prevBtn.classList.add("disabled")
            nextBtn.classList.remove("hide")
            submit.classList.remove("active")
        } else if (QNumber == 9) {
            nextBtn.classList.add("disabled")
            nextBtn.classList.add("hide")
            submit.classList.add("active")
            prevBtn.classList.remove("disabled")
        } else {
            prevBtn.classList.remove("disabled")
            nextBtn.classList.remove("disabled")
            nextBtn.classList.remove("hide")
            submit.classList.remove("active")
        }
        submitFinish()
    }
    changeView(1)


    // گزینه های بعدی و قبلی
    let currentId;
    nextBtn.addEventListener("click", () => {
        dataAnswers.map(data => { if (data.status == "current") { currentId = data.id; } })
        if (currentId < 9) {
            if (dataAnswers[currentId - 1].answer == '') {
                dataAnswers[currentId - 1].status = "dont";
            } else {
                dataAnswers[currentId - 1].status = "done"
            }
            dataAnswers[currentId].status = "current"
            changeView(currentId + 1, nextBtn)
        }
    })
    prevBtn.addEventListener("click", () => {
        dataAnswers.map(data => { if (data.status == "current") { currentId = data.id; } })
        if (currentId > 1) {
            if (dataAnswers[currentId - 1].answer == '') {
                dataAnswers[currentId - 1].status = 'normal'
            } else {
                dataAnswers[currentId - 1].status = 'done'
            }
            dataAnswers[currentId - 2].status = "current"
            changeView(currentId - 1, prevBtn)
        }
    })
    const icons = [...RouterIcons]
    icons.map(icon => {
        icon.addEventListener("click", () => {
            const QNumber = [...icon.id][2];
            dataAnswers.map(data => {
                if (data.status == 'current' && data.answer == '') {
                    data.status = 'normal'
                }
                if (data.status == 'current' && data.answer != '') {
                    data.status = 'done'
                }
                if (data.id > QNumber && data.status == 'dont') {
                    data.status = 'normal'
                }
                if (data.id < QNumber && data.answer == '') {
                    data.status = 'dont'
                }
            })
            dataAnswers[QNumber - 1].status = "current";
            changeView(QNumber)
        })
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") nextBtn.click();
        if (e.key === "ArrowRight") prevBtn.click();
        if (e.key === "Enter" && submit.classList.contains("active") && !submit.classList.contains("disable")) { submit.click() }
    });

})