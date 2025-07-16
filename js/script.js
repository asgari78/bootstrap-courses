import readyMaps from "./data.js";


// icons move for mouse move "random render"
const icons = document.querySelectorAll(".icon-start")
let iconsShow = [];
let translateRandom;
const setIconPosition = () => {
    translateRandom = []
    iconsShow = []
    icons.forEach(icon => {
        if (window.innerWidth > 768) {
            let displayRandom = Boolean(Math.floor(Math.random() * 1.5))
            let zindexRandom = Boolean(Math.floor(Math.random() * 2))
            translateRandom.push(Math.floor(Math.random() * 60 + Math.random() * 20))
            icon.style.display = displayRandom == true ? "flex" : "none"
            iconsShow.push(icon)
            icon.style.width = `${Math.random() * 55 + 25}px`
            icon.style.zIndex = zindexRandom == true ? "1" : "-2";
            icon.style.left = `${(Math.random() * (window.innerWidth / 1.7)) + window.innerWidth / 4}px`
            icon.style.top = `${120 + (Math.random() * window.innerHeight / 3.5)}px`
            if (window.innerWidth <= 992) {
                icon.style.top = `${320 + (Math.random() * window.innerHeight / 2)}px`
            }
        } else {
            icon.style.display = "none"
        }
    })
}
const changeIconPosition = (e) => {
    for (let i = 0; i < iconsShow.length; i++) {
        iconsShow[i].style.transform = `translateX(${(e.screenX / 1200) * translateRandom[i]}px) translateY(${(e.screenY / 1100) * translateRandom[i]}px)`;
    }
}
document.addEventListener("DOMContentLoaded", setIconPosition)
document.addEventListener("mousemove", (e) => changeIconPosition(e))
window.addEventListener("resize", setIconPosition)


// foxed header on scroll
const header = document.querySelector("body>header")
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("active-fixed");
    } else if (window.scrollY < 10) {
        header.classList.remove("active-fixed");
    }
});


// counter plus on start or reload
const technologyTxt = document.getElementById("technology")
const alToolsTxt = document.getElementById("alTools")
const studentsTxt = document.getElementById("students")
const roadMapTxt = document.getElementById("roadMap")
let technology;
let alTools;
let students;
let roadMap;
document.addEventListener("DOMContentLoaded", () => {
    technology = 1;
    alTools = 1;
    students = 1;
    roadMap = 1;
    function updateNumbers() {
        technologyTxt.innerHTML = `${technology.toLocaleString('fa-IR')}+`;
        alToolsTxt.innerHTML = `${alTools.toLocaleString('fa-IR')}+`;
        studentsTxt.innerHTML = `${students.toLocaleString('fa-IR')}+`;
        roadMapTxt.innerHTML = `${roadMap.toLocaleString('fa-IR')}+`;
        if (technology < 65) technology++;
        if (alTools < 9) alTools++;
        if (students < 395) students++;
        if (roadMap < 478) roadMap++;

        let nextDelay = Math.max(5, 400 / students);

        if (
            technology < 28 ||
            alTools < 9 ||
            students < 395 ||
            roadMap < 478
        ) {
            setTimeout(updateNumbers, nextDelay);
        }
    }
    updateNumbers();
});


//readyMap and filter list
document.addEventListener("DOMContentLoaded", () => {
    const filterList = document.querySelector(".filter-list ul");
    const filteredItemsUl = document.querySelector(".filtered-items ul")


    // start pagination
    const paginationUl = document.querySelector("#paginationItems ul");
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    let currentPage = 1;
    const itemsPerPage = 8;
    let currentItems = [];
    function renderPageItems() {
        filteredItemsUl.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = currentItems.slice(start, end);

        pageItems.forEach(lang => {
            const shortdesc = lang.desc.split(' ').slice(0, 23).join(' ') + (lang.desc.split(' ').length > 12 ? '...' : '');
            filteredItemsUl.innerHTML += `
        <li class="border d-flex flex-column rounded-4 gap-3 overflow-hidden">
          <img src="./images/readyMaps/${lang.img}" class="img-fluid" alt="${lang.name}">
          <h5 class="m-0 mx-2">مسیر یادگیری ${lang.name}</h5>
          <p class="desc text-muted fs-7 mx-3 my-0">${shortdesc}</p>
          <div class="footer mt-auto d-flex flex-column gap-2 w-100 justify-content-between align-items-center">
            <div class="rate me-auto ms-2">
              <span class="fs-7 text-muted">${lang.rate.toLocaleString("fa-IR")}</span>
              <i class="fas fa-star ${lang.rate > 3.5 ? 'text-success' : 'text-danger'}"></i>
            </div>
            <button class="view-btn py-2 rounded-bottom-4 rounded-top-0 w-100 btn btn-primary">مشاهده مسیر</button>
          </div>
        </li>
      `;
        });
    }
    function renderPagination() {
        // حذف دکمه‌های قبلی شماره صفحات
        [...paginationUl.querySelectorAll("li.page-number")].forEach(li => li.remove());

        const totalPages = Math.ceil(currentItems.length / itemsPerPage);

        // اگر فقط ۱ صفحه یا کمتر بود، مخفی کردن pagination
        if (totalPages <= 1) {
            paginationUl.style.display = "none";
            return;
        } else {
            paginationUl.style.display = "flex";
        }

        // ساخت دکمه‌های صفحه (شماره صفحات)
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item", "page-number");
            if (i === currentPage) li.classList.add("active");
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener("click", e => {
                e.preventDefault();
                currentPage = i;
                updatePaginationAndItems();
            });
            // اضافه کردن قبل از دکمه "صفحه بعد"
            paginationUl.insertBefore(li, nextBtn);
        }

        // کنترل فعال/غیرفعال بودن دکمه‌های قبلی و بعدی
        if (currentPage === 1) {
            prevBtn.classList.add("disabled");
        } else {
            prevBtn.classList.remove("disabled");
        }

        if (currentPage === totalPages) {
            nextBtn.classList.add("disabled");
        } else {
            nextBtn.classList.remove("disabled");
        }
    }
    function updatePaginationAndItems() {
        renderPageItems();
        renderPagination();
    }
    prevBtn.addEventListener("click", e => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updatePaginationAndItems();
        }
    });
    nextBtn.addEventListener("click", e => {
        e.preventDefault();
        const totalPages = Math.ceil(currentItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePaginationAndItems();
        }
    });
    // finish pagination


    readyMaps.map(category => {
        filterList.innerHTML += `<li class="text-primary-emphasis py-2 px-4 d-flex justify-content-center rounded-3 ${category.active ? 'active' : ''}" id="${category.id}">${category.title}</li>`
    })
    const setfilterCategory = () => {
        const filterListItems = document.querySelectorAll(".filter-list li");
        let items = [...filterListItems]
        items.map(item => {
            item.addEventListener("click", () => {
                items.map(i => i.classList.contains("active") && i.classList.remove("active"))
                !item.classList.contains("active") && item.classList.add("active");
                filteredItemsUl.classList.add("fade-out");
                setTimeout(() => {
                    filteredItemsUl.innerHTML = '';
                    readyMaps.map(category => {
                        category.id == item.id ? category.active = true : category.active = false;
                        addItems(category)
                    })
                    filteredItemsUl.classList.remove("fade-out");
                    filteredItemsUl.classList.add("fade-in");
                    setTimeout(() => {
                        filteredItemsUl.classList.remove("fade-in");
                    }, 200);
                }, 150)
            })
        })
    }
    const addItems = (category) => {
        const pagination = document.getElementById("paginationItems");

        if (category.active == true && !(category.id == "all")) {
            // گرفتن محصولات فیلتر شده و مرتب شده
            currentItems = category.list.slice().sort((a, b) => b.rate - a.rate);

        } else if (category.active == true && category.id == "all") {
            // گرفتن همه محصولات یکتا
            let allItems = [];
            readyMaps.map(c => c.id != "all" && c.list.map(lang => allItems.push(lang)));
            let seenNames = [];
            currentItems = allItems.filter(lang => {
                const name = lang.name.toString().trim();
                if (seenNames.includes(name)) {
                    return false;
                }
                seenNames.push(name);
                return true;
            }).sort((a, b) => b.rate - a.rate);
        }

        // نمایش صفحه اول در هر بار تغییر دسته
        currentPage = 1;

        // نمایش صفحه بندی (پاجینیشن) فعال یا غیر فعال کردن
        if (currentItems.length > itemsPerPage) {
            pagination.classList.add("active");
        } else {
            pagination.classList.remove("active");
        }

        updatePaginationAndItems();
    };
    addItems({ title: "همه", id: "all", active: true })
    setfilterCategory()
})