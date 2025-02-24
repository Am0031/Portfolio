const createCardHtml = (repo) => {
  return `<div class="project-card" id="${repo.name}" data-tag="games">
    <div class="project-card-img">
      <a href="https://am0031.github.io/${repo.name}/" target="_blank"
        ><img
          class="image"
          src="./assets/images/${repo.name}.png"
          onerror="this.src='./assets/images/not_found.png';"
          alt="${repo.name} project card picture"
      /></a>
    </div>
    <div class="always-column centered-on-main project-card-text">
      <h4>${repo.name}</h4>
      <div class="project-repo-link">
        <a
          class="link-text"
          href="${repo.html_url}"
          target="_blank"
          ><i class="fa-brands fa-github"></i> Go to Github
          repository</a
        >
      </div>
    </div>
  </div>`;
};

const createAlertMessage = (username) => {
  return `<div class="alert-message text-center">
Failed to retrieve the data. Please visit the github page directly at: https://github.com/${username}?tab=repositories.
</div>`;
};

const renderAlert = (username) => {
  const alertHtml = createAlertMessage(username);
  //append alert message to the project container
  $("#project-container").append(alertHtml);
};

const renderRepos = (repos) => {
  //map through repos array to render each project card
  const cardsHtml = repos.map(createCardHtml).join("");
  //append to the project container
  $("#project-container").append(cardsHtml);
};

const getRepos = async (username) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to get data from github");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Async Main function - triggered on load of page
const onReady = async () => {
  const username = "Am0031";
  //get my public repos from github api
  const allRepos = await getRepos(username);
  const repos = allRepos
    .filter((i) => i.name !== "Am0031")
    .filter((i) => i.name !== "coding-mentoring");
  //render the repo cards in the project container
  repos ? renderRepos(repos) : renderAlert(username);
};

//On page load
$("document").ready(onReady);
