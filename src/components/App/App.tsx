import React from "react";
// import App1 from "../../contentScripts"

const App = () => {
  const [currentTab, setCurrentTab] = React.useState(null);
  const getCurrent = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log(tabs[0].url);
      setCurrentTab(tabs[0].url);
    });
  };
  return (
    <>
      <h1>Resume Reviewer</h1>
      <p>Review Your Github And Complete Remaining things</p>
      {/* Add SVG */}
      <button onClick={getCurrent}>Get Current</button>
      <p>{currentTab}</p>
    </>
  );
};

export default App;
