import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
  state,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const submitHandler = async (event) => {
  // gets the text box value/ prevents reload page
  event.preventDefault();
  const searchText = searchInputEl.value;

  // VALIDATION
  const forbidenPattern = /[1-9]/;
  const patternMatch = forbidenPattern.test(searchText);
  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  // Blurs form / adds spinner/ clears after a search the joblist
  searchInputEl.blur();
  renderSpinner("search");
  jobListSearchEl.innerHTML = "";

  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  // get API data
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    renderPaginationButtons();

    renderSpinner("search");

    numberEl.textContent = jobItems.length;

    renderJobList();
  } catch (error) {
    renderSpinner("search");

    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
