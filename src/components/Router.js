import { jobDetailsContentEl, BASE_API_URL, getData ,state} from "../common.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const loadHandler = async () => {
  const id = window.location.hash.substring(1);

  if (id) {
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));

    jobDetailsContentEl.innerHTML = "";
    renderSpinner("jobSpinner");

    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);
      const { jobItem } = data;
      
      state.activeJobItem = jobItem

      renderJobList()
      renderSpinner("jobSpinner");
      renderJobDetails(jobItem);

    } catch (error) {
      renderSpinner("jobSpinner");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
