const pages = document.querySelectorAll(".page");
const steps = document.querySelectorAll(".step");

const nextButtons =
document.querySelectorAll(".next-btn");

const backButtons =
document.querySelectorAll(".back-btn");

let currentPage = 0;

/* subpage state is stored per page element using data-subcurrent attribute */

function showSubpage(pageElem, subIndex){

    const subpages = pageElem.querySelectorAll('.subpage');

    if(!subpages || subpages.length === 0) return;

    subpages.forEach(sp => sp.classList.remove('active'));

    const idx = Math.max(0, Math.min(subIndex, subpages.length - 1));

    subpages[idx].classList.add('active');

    pageElem.dataset.subcurrent = String(idx);

}

/* ========================= */
/* SHOW PAGE */
/* ========================= */

function showPage(index){

    pages.forEach((page)=>{
        page.classList.remove("active");
    });

    steps.forEach((step)=>{
        step.classList.remove(
            "active",
            "completed"
        );
    });

    pages[index].classList.add("active");

    // reset any internal subpages for this page
    const pageElem = pages[index];
    const subpages = pageElem.querySelectorAll('.subpage');
    if(subpages && subpages.length > 0){
        showSubpage(pageElem, 0);
    }

    for(let i = 0; i <= index; i++){

        steps[i].classList.add("completed");

    }

    steps[index].classList.add("active");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* ========================= */
/* NEXT BUTTONS */
/* ========================= */

nextButtons.forEach((button)=>{

    button.addEventListener("click", ()=>{

        const pageElem = pages[currentPage];
        const subpages = pageElem.querySelectorAll('.subpage');

        if(subpages && subpages.length > 0){

            const sc = parseInt(pageElem.dataset.subcurrent || '0', 10);

            if(sc < subpages.length - 1){
                showSubpage(pageElem, sc + 1);
                return; // consumed by sub-navigation
            }

        }

        if(currentPage < pages.length - 1){

            currentPage++;

            showPage(currentPage);

        }

    });

});

/* ========================= */
/* BACK BUTTONS */
/* ========================= */

backButtons.forEach((button)=>{

    button.addEventListener("click", ()=>{

        const pageElem = pages[currentPage];
        const subpages = pageElem.querySelectorAll('.subpage');

        if(subpages && subpages.length > 0){

            const sc = parseInt(pageElem.dataset.subcurrent || '0', 10);

            if(sc > 0){
                showSubpage(pageElem, sc - 1);
                return; // consumed by sub-navigation
            }

        }

        if(currentPage > 0){

            currentPage--;

            showPage(currentPage);

        }

    });

});

/* ========================= */
/* SUB-NAVIGATION BUTTONS INSIDE PAGES */
/* ========================= */

document.addEventListener('click', (e) => {

    const target = e.target;

    if(target.matches('.sub-next')){

        const pageElem = target.closest('.page');
        if(!pageElem) return;
        const subpages = pageElem.querySelectorAll('.subpage');
        if(!subpages || subpages.length === 0) return;
        const sc = parseInt(pageElem.dataset.subcurrent || '0', 10);
        if(sc < subpages.length - 1){
            showSubpage(pageElem, sc + 1);
        }

    }

    if(target.matches('.sub-back')){

        const pageElem = target.closest('.page');
        if(!pageElem) return;
        const subpages = pageElem.querySelectorAll('.subpage');
        if(!subpages || subpages.length === 0) return;
        const sc = parseInt(pageElem.dataset.subcurrent || '0', 10);
        if(sc > 0){
            showSubpage(pageElem, sc - 1);
        }

    }

});

/* ========================= */
/* STEP CLICK */
/* ========================= */

steps.forEach((step, index)=>{

    step.addEventListener("click", ()=>{

        currentPage = index;

        showPage(currentPage);

    });

});

/* ========================= */
/* INITIAL PAGE */
/* ========================= */

showPage(currentPage);