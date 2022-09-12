import React from "react";
import { createRoot } from "react-dom/client";
import "fontsource-roboto";
import "./contentScript.css";

import CSS from "csstype";

const container = document.createElement("div");
container.id = "root-content";
document.body.appendChild(container);

const root = createRoot(container);

const App: React.FC<{}> = () => {
  // get current tab url
  const [url, setUrl] = React.useState(new URL(window.location.href));
  const [show, setShow] = React.useState(false);
  const [showReadme, setShowReadme] = React.useState(false);
  // detail Object
  const [githubDetail, setGithubDetail] = React.useState({} as any);
  // getReadmeDetail Object
  const [getReadmeDetail, setGetReadmeDetail] = React.useState({} as any);

  React.useEffect(() => {
    // see if it is github Profile page or return
    if (url.search !== "") {
      setGithubDetail({ parent: false });
      setGetReadmeDetail({ present: false });
    } else {
      const callingGithubDetail = getGithubDetail();
      setGithubDetail(callingGithubDetail);

      const callingGetReadmeDetail = getReadme();
      setGetReadmeDetail(callingGetReadmeDetail);
    }
  }, []);

  // create a object state to store the data
  function toggle() {
    setShow(!show);
    // console.log("show", show);
  }
  return (
    <>
      <h1>Masai Github Review</h1>
      <button onClick={toggle}>What Done</button>
      <button onClick={toggle}>What Not Complete</button>
      <button onClick={() => setShowReadme(!showReadme)}>Readme Session</button>
      <div style={{ display: show ? "block" : "none" }}>
        <GithubDetailWhatPresent githubDetail={githubDetail} />
      </div>
      <div style={{ display: show ? "none" : "block" }}>
        <GithubDetailWhatNotPresent githubDetail={githubDetail} />
      </div>
      <div style={{ display: showReadme ? "block" : "none" }}>
        <GithubReadmeDetail githubDetail={getReadmeDetail} />
      </div>
    </>
  );
};
root.render(<App />);

// =======================GithubDetailWhatPresent======================= //

// =================================================================================================//
// Create a Component of name githubDetail to show the data and render it // it is a dropdown

function GithubDetailWhatPresent({ githubDetail }: any) {
  // Add style to the component to show the data when clicked on the button
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(githubDetail, "githubDetail");
  return (
    <>
      <h1>What Is Perfect</h1>
      {/* {console.log(githubDetail.shortinfoLength)} */}
      {githubDetail.shortinfo?.length &&
        githubDetail.shortinfoLength <= 100 && (
          <p>Shortinfo: {githubDetail.shortinfo}</p>
        )}
      {githubDetail.location?.length && (
        <p>Location: {githubDetail.location}</p>
      )}
      {githubDetail.followers?.length && (
        <p>Followers: {githubDetail.followers}</p>
      )}
      {githubDetail.following?.length && (
        <p>Following: {githubDetail.following}</p>
      )}
      {githubDetail.organization?.length &&
        githubDetail.organization !== "" && (
          <p>Organization: {githubDetail.organization}</p>
        )}
      {githubDetail.twitter?.length && <p>Twitter: {githubDetail.twitter}</p>}
      {githubDetail.website?.length && <p>Website: {githubDetail.website}</p>}
      {githubDetail.profileReadme?.length !== 0 && (
        <p>Profile Readme: {githubDetail.profileReadme}</p>
      )}
      {githubDetail.profileReadmeLength?.length && (
        <p>Profile Readme Length: {githubDetail.profileReadmeLength}</p>
      )}
      {/* Organization */}
      {githubDetail.organization?.length !== "0" && (
        <p>Have in : {githubDetail.organizationList} Orgnization</p>
      )}
      {/* All Achievement */}
      {/* {console.log(githubDetail.allAchievement, "githubDetail.allAchievement")} */}
      {githubDetail.allAchievement?.length && (
        <p>All Achievement: {githubDetail.allAchievement.length}</p>
      )}
      {/* {githubDetail.repoWithShortDescription?.length && (
        <p>
          Repo With Short Description: {githubDetail.repoWithShortDescription}
        </p>
      )} */}
      {/* Contributions */}
      {githubDetail.contribution?.length && (
        <p>Contributions: {githubDetail.contribution}</p>
      )}
    </>
  );
}

// ========================GithubDetailWhatNotPresent======================= //

function GithubDetailWhatNotPresent({ githubDetail }: any) {
  //   // console.log(githubDetail, "githubDetail");
  return (
    <>
      {/* <ChakraProvider> */}

      <h1>What Is Not Perfect</h1>
      {githubDetail.shortinfo?.length === 0 && <p>Please Add ShortInfo</p>}
      {githubDetail.shortinfoLength <= 100 && (
        <p>ShortInfo is very Short Add something more</p>
      )}

      {githubDetail.location?.length === 0 && <p>Please Add Location</p>}
      {githubDetail.followers?.length === 0 && <p>Please Add Followers</p>}
      {githubDetail.following?.length === 0 && <p>Please Add Following</p>}
      {githubDetail.organization?.length === 0 &&
        githubDetail.organization !== "" && <p>Please Add Organization</p>}
      {githubDetail.twitter?.length === 0 && <p>Please Add Twitter</p>}
      {githubDetail.website?.length === 0 && <p>Please Add Website</p>}
      {githubDetail.profileReadme?.length === 0 && (
        <p>Please Add Profile Readme</p>
      )}
      {githubDetail.profileReadmeLength?.length === 0 && (
        <p>Please Add Profile Readme Length</p>
      )}
      {githubDetail.allAchievement?.length === 0 && (
        <p>Please Add All Achievement</p>
      )}
      {githubDetail.repoWithShortDescription?.length === 0 && (
        <p>Please Add Repo With Short Description</p>
      )}

      {/* Map the repoWithShortDescription and see that contains pinnedRepoDescription and there   */}
      {/* is no pinnedRepoDescription then show the repo name */}
      {githubDetail.repoWithShortDescription?.map((repo: any) => {
        if (repo.pinnedRepoDescription === "") {
          return <p>{` Please Add Repo Description ${repo.pinnedRepoName}`}</p>;
        }
      })}
      {/* Description is too Short */}
      {githubDetail.repoWithShortDescription?.map((repo: any) => {
        if (
          repo.pinnedRepoDescription !== "" &&
          repo.pinnedRepoDescription.length < 50
        ) {
          return (
            <p>{` Please Add More Info to ${repo.pinnedRepoName} Repo it just ${
              repo.pinnedRepoDescription.split(" ").length
            } word long `}</p>
          );
        }
      })}
      {/* Organization */}
      {githubDetail.organization?.length == "0" && (
        <p>You are not in Any Organization</p>
      )}
      {/* All Achievement */}
      {/* {console.log(
        githubDetail.allAchievement,
        githubDetail.allAchievement?.length,
        githubDetail.allAchievement?.length === 0,
        "githubDetail.allAchievement1111"
      )} */}
      {githubDetail.allAchievement?.length == 0 && (
        <p>No Achievement Please Pull Merge something</p>
      )}
    </>
  );
}

// ========================GithubReadme======================= //

function GithubReadmeDetail({ githubDetail }: any) {
  //   // console.log(githubDetail, "githubDetail");
  return (
    <>
      {/* linkedin', 'twitter', 'leetcode', 'quora', 'profileReadme',
      'profileReadmeLength', 'h2', 'h3', 'allImage', 'allImageAlt', 'allLink',
      'allLinkHref', 'allBold', 'allStats', 'allStatsLength' */}
      {/* Linkedin Present */}
      <h1>Readme Detail</h1>
      {githubDetail.linkedin?.length && (
        <p>Linkedin: {githubDetail.linkedin}</p>
      )}
      {/* Linkedin present or not */}
      {githubDetail.linkedin?.length === 0 && <p>Please Add Linkedin</p>}
      {/* Twitter Present */}
      {githubDetail.twitter?.length && <p>Twitter: {githubDetail.twitter}</p>}
      {/* Twitter present or not */}
      {githubDetail.twitter?.length === 0 && <p>Please Add Twitter</p>}
      {/* Leetcode Present */}
      {githubDetail.leetcode?.length && (
        <p>Leetcode: {githubDetail.leetcode}</p>
      )}
      {/* Leetcode present or not */}
      {githubDetail.leetcode?.length === 0 && <p>Please Add Leetcode</p>}

      {/* Quora Present */}
      {githubDetail.quora?.length && <p>Quora: {githubDetail.quora}</p>}
      {/* Quora present or not */}
      {githubDetail.quora?.length === 0 && (
        <p>Do you have Quora Account? Please Add Quora</p>
      )}
      {/* Profile Readme Length Present */}
      {githubDetail.profileReadmeLength?.length && (
        <p>Profile Readme Length: {githubDetail.profileReadmeLength}</p>
      )}
      {/* h2 Present */}
      {githubDetail.h2?.length && (
        <>
          <p>h2 Tags Present: {githubDetail.h2} </p>
          <p>(Recommeded 3 Atleast)</p>
        </>
      )}
      {/* h3 Present */}
      {githubDetail.h3?.length && (
        <>
          <p>h3 Tags: {githubDetail.h3}</p>
          <p>(Recommended atleast 2)</p>
        </>
      )}

      {/* All Image Alt Present */}
      {githubDetail.allImageAlt?.length && (
        <p>
          This are some of the languages and tags you have :{" "}
          {githubDetail.allImageAlt.join(" ")}
        </p>
      )}
      {/* All Bold Present if less then 2 add more */}
      {githubDetail.allBold?.length && +githubDetail.allBold < 1 && (
        <p>Only {githubDetail.allBold} Bold tag add atleast 3</p>
      )}
      {/* All Stats Length Present */}
      {githubDetail.allStatsLength?.length && (
        <>
          <p>All Stats Length: {githubDetail.allStatsLength}</p>
          <p>Needed atleast 2</p>
        </>
      )}
    </>
  );
}

// =================================================================================================//

// Language: typescript
// Other Small Snippets to refractor the code

// get text from html function
function getTextFromHtml(html) {
  // console.log("html", html);
  if (html != null) {
    const textdata = html.replace(/<[^>]*>?/gm, "").trim(); // remove html tags and tags content like <p> </p> and trim the string
    return textdata;
  } else {
    return "";
  }
}

// ==============================================ifNotNullReturn===================================================//
// if not null then return the value
function ifNotNullReturn(value) {
  if (value != null) {
    return value.innerHTML;
  }
}

// ==============================================getGithubDetail===================================================//
// Language: typescript
// Get Detail of the Github Profile for review like shortinfo, location, email, followers, following, organization, twitter, website, pinned repositories, pinned repo language,pinned repo description, Achievments and more

function getGithubDetail() {
  // get shortinfo
  const shortinfo = document.querySelector(".p-note.user-profile-bio");
  // console.log("shortinfo", shortinfo);
  const shortinfoText = getTextFromHtml(ifNotNullReturn(shortinfo));

  // get location
  const location = document.querySelector(".octicon-location+ span");
  const locationText = getTextFromHtml(ifNotNullReturn(location));
  // console.log("location", locationText);

  // get followers
  const followers = getElementByXpath('//div[@class="mb-3"]/a[1]/span[1]');
  // console.log("followers", followers);
  const followersText = getTextFromHtml(ifNotNullReturn(followers));
  // console.log("followersText", followersText);

  // get following
  // const following = document.querySelector(".text-bold");
  const following = getElementByXpath('//div[@class="mb-3"]/a[2]/span[1]');
  // console.log("following", following);
  const followingText = getTextFromHtml(ifNotNullReturn(following));
  // console.log("followingText", followingText);
  // get organization
  const organization = document.querySelectorAll(
    'a[data-hovercard-type="organization"]'
  );
  // console.log("organization", organization);
  // console.log("organizationLength", organization.length);
  const organizationArray = new Set();
  if (organization.length > 0) {
    // console.log("organization", organization);
    organization.forEach((org) => {
      // if org contains image then it is an organization
      if (org.querySelector("img") != null) {
        const orgname = org.querySelector("img").getAttribute("alt");
        orgname !== "" ? organizationArray.add(orgname) : null;
      }
    });
  }
  const organizationList = "" + Array.from(organizationArray).length;

  // console.log("organizationArray", organizationArray);

  // get twitter
  const twitter = document.querySelectorAll('[itemprop="twitter"]');
  // console.log("twitter", twitter);
  const twitterText = getTextFromHtml(ifNotNullReturn(twitter[0])).split(
    "@"
  )[1];
  // console.log("twitterText", twitterText);
  // get website
  const website = document.querySelector(
    'li[data-test-selector="profile-website-url"]'
  );
  // console.log("website", website);
  const websiteText = getTextFromHtml(ifNotNullReturn(website));

  // console.log("websiteText", websiteText);
  // get pinned repositories
  const profileReadme = getElementByXpath(
    '//*[@id="js-pjax-container"]/div[2]/div/div[2]/div[2]/div/div[1]/div/article'
  );
  // console.log("profileReadme", profileReadme);
  const profileReadmeText = getTextFromHtml(ifNotNullReturn(profileReadme))
    .replace(/(\r\n|\n|\r)/gm, "")
    .trim();
  // console.log("profileReadmeText", profileReadmeText);

  const profileReadmeLength = profileReadmeText.length;
  // console.log("profileReadmeLength", profileReadmeLength);
  // get Achievments
  const getAchievement = document.querySelectorAll(
    "img.achievement-badge-sidebar"
  );
  // console.log("getAchievement", getAchievement);
  const allAchievement = [];
  if (getAchievement.length > 0) {
    getAchievement.forEach((element) => {
      allAchievement.push(element.getAttribute("alt") || "");
    });
  }
  // console.log("allAchievement", allAchievement);

  // get all pinned repo
  const repoWithShortDescription = getPinnedRepositoriesDetails();

  const constributionDiv = document.querySelector(".js-yearly-contributions");
  const contributionH2 = constributionDiv.querySelector("h2");
  const contributionH2Text = getTextFromHtml(ifNotNullReturn(contributionH2))
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  // console.log("contributionH2Text", contributionH2Text);

  // console.log("repoWithShortDescription", repoWithShortDescription);
  // console.log(
  ("====================================REPO DETAILS====================================");
  // );
  // make a object of all the details
  const detailObject = {
    shortinfo: shortinfoText,
    shortinfoLength: shortinfoText.length,
    location: locationText,
    followers: followersText,
    following: followingText,
    organization: organizationList,
    twitter1: twitterText,
    website: websiteText,
    profileReadme: profileReadmeText,
    profileReadmeLength: profileReadmeLength,
    allAchievement: allAchievement,
    repoWithShortDescription: repoWithShortDescription,
    contribution: contributionH2Text,
  };
  return detailObject;
}

// ===============================================getElementByXpath==================================================//
// Get data using xpath function
function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// =============================================getPinnedRepositoriesDetails====================================================//

// get pinned repositories Details
function getPinnedRepositoriesDetails() {
  const pinnedRepositories =
    getElementByXpath(
      '//div[@class="js-pinned-items-reorder-container"]/form/ol/li'
    ) ||
    getElementByXpath(
      '//div[@class="js-pinned-items-reorder-container"]/ol/li'
    );

  // console.log("pinnedRepositories", pinnedRepositories);
  // console.log("pinnedRepositories", pinnedRepositories.length);
  // Pinned Repos
  if (pinnedRepositories != null) {
    // console.log("pinnedRepositories", pinnedRepositories);
    const pinnedRepositoriesList = (
      pinnedRepositories.parentNode as HTMLElement
    ).querySelectorAll("li");

    const allPinnedRepositories = [];
    const repoWithShortDescription = [];
    if (pinnedRepositoriesList.length > 0) {
      // console.log(
      // "pinnedRepositoriesListInside",
      // pinnedRepositoriesList,
      // pinnedRepositoriesList.length;
      // );
      for (let i = 0; i < pinnedRepositoriesList.length; i++) {
        // console.log("pinnedRepositoriesList", pinnedRepositoriesList[i]);
        const pinnedRepoName =
          pinnedRepositoriesList[i].querySelector("span.repo")?.innerHTML;

        const pinnedRepoDescription = pinnedRepositoriesList[i]
          .querySelector(".pinned-item-desc")
          ?.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, "")
          .trim(); //gm is for global and multiline /r is for carriage return
        // clean \n and \t from string

        // if repo has short description mean 0 length or less that 100
        if (pinnedRepoDescription.length <= 100) {
          repoWithShortDescription.push(pinnedRepoName);
        }

        const pinnedRepoLanguage = pinnedRepositoriesList[i].querySelector(
          '[itemprop="programmingLanguage"]'
        )?.innerHTML;

        // console.log(pinnedRepoLang, "pinnedRepoLang");

        allPinnedRepositories.push({
          pinnedRepoName,
          pinnedRepoDescription,
          pinnedRepoLanguage,
          repoWithShortDescription,
        });
      }
    }
    // console.log("allPinnedRepositories", allPinnedRepositories);
    // console.log("====================================");
    return allPinnedRepositories;
    // return repoWithShortDescription;
  }
}

// =============================================getReadmeDetail====================================================//
// getReadmeDetail
function getReadmeDetail(profileReadme, profileReadmeText) {
  //

  // get user name
  const userName = document.querySelector(
    "h1 > span.p-name.vcard-fullname.d-block.overflow-hidden"
  );
  const userNameText = getTextFromHtml(ifNotNullReturn(userName))
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim()
    .split(" ");
  // convert the uername to array and lowercase the first letter
  // console.log("userNameText", userNameText);

  const getReadmeDetailObj = {};
  // console.log("profileReadme", profileReadme);
  // Count all the h2
  const h2 = profileReadme.querySelectorAll("h2");
  // console.log("h2", h2, h2.length);
  // Count all the h3
  const h3 = profileReadme.querySelectorAll("h3");
  // console.log("h3", h3, h3.length);

  // Count All Image in Readme and the Alt text
  const allImage = profileReadme.querySelectorAll("img");
  // console.log("allImage", allImage, allImage.length);
  const allImageAlt = [];
  const allStats = [];
  if (allImage.length > 0) {
    allImage.forEach((element) => {
      // data-canonical-src="https://github-readme-streak-stats.herokuapp.com/?user=shaantanu9&"
      // if image contains data-canonical-src="https://github-readme-streak-stats.herokuapp.com/?user=shaantanu9&" then store it in object with same key
      if (
        element.getAttribute("data-canonical-src") &&
        element.getAttribute("data-canonical-src").includes("stats")
      ) {
        allStats.push(element.getAttribute("data-canonical-src"));
      }
      element.getAttribute("alt") &&
        element.getAttribute("alt").length <= 80 &&
        allImageAlt.push(element.getAttribute("alt"));
    });
  }

  // if allImageAlt element contains the username then remove it
  if (allImageAlt.length > 0) {
    allImageAlt.forEach((element) => {
      if (
        element.includes(userNameText[0]) ||
        (userNameText.length == 1 && element.includes(userNameText[1]))
      ) {
        allImageAlt.splice(allImageAlt.indexOf(element), 1);
      }
    });
  }

  // console.log("allImageAlt", allImageAlt);
  // console.log("allImageCanonicalSrc", allImageCanonicalSrc);

  // Count All Link in Readme and the Alt text
  const allLink = profileReadme.querySelectorAll("a");
  // console.log("allLink", allLink, allLink.length);
  const allLinkHref = [];
  if (allLink.length > 0) {
    allLink.forEach((element) => {
      const urlText = element.getAttribute("href") || "";
      // contains linkedin or twitter or quora or leeetcode or github or stackoverflow then store it in object with same key
      if (
        urlText.includes("linkedin") ||
        urlText.includes("twitter") ||
        urlText.includes("quora") ||
        urlText.includes("leetcode") ||
        urlText.includes("stackoverflow")
      ) {
        // remove .com .in .org from url

        const urlhost = new URL(urlText).hostname
          .replace("www.", "")
          .replace(/\/$/, "")
          .replace(/\.com|\.in|\.org/g, "");
        getReadmeDetailObj[urlhost] = urlText;
      }
      allLinkHref.push(urlText);
    });
  }
  // console.log("allLinkHref", allLinkHref);

  // Count All Bold in Readme and the Alt text
  const allBold = profileReadme.querySelectorAll("b");

  const readmeObj = {
    ...getReadmeDetailObj,
    profileReadme: profileReadmeText,
    profileReadmeLength: profileReadmeText.length,
    h2: h2.length,
    h3: h3.length,
    allImage,
    allImageAlt,
    allLink: allLink.length,
    allLinkHref,
    allBold: allBold.length,
    allStats,
    allStatsLength: allStats.length,
  };
  // console.log("readmeObj", readmeObj);
  // console.log("readmeObj", Object.keys(readmeObj));

  return readmeObj;
}

// ===============================================getReadme==================================================//

function getReadme() {
  const profileReadme = getElementByXpath(
    '//*[@id="js-pjax-container"]/div[2]/div/div[2]/div[2]/div/div[1]/div/article'
  );
  const profileReadmeText = getTextFromHtml(ifNotNullReturn(profileReadme))
    .replace(/(\r\n|\n|\r)/gm, "")
    .trim();
  const getReadmeDetailObj =
    profileReadme !== null
      ? getReadmeDetail(profileReadme, profileReadmeText)
      : {};

  // console.log("getReadmeDetailObj====================", getReadmeDetailObj);
  return getReadmeDetailObj;
}
