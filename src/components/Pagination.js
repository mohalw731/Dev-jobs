import {
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  state,
  RESULTS_PER_PAGE,
} from "../common.js";
import renderJobList from "./JobList.js";

const renderPaginationButtons = () => {
  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  // Update number
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");

  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  //  update state
  nextPage ? state.currentPage++ : state.currentPage--;

  renderPaginationButtons();
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;
