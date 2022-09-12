import React from "react";
import { createRoot } from "react-dom/client";
import "./Options.scss";
const container = document.getElementById("root-popup");
if (container) {
  const root = createRoot(container);
  const OptionPage = () => (
    <>
      <h1>Thanks for Using Me</h1>;
      <img
        src="https://www.shutterstock.com/image-vector/illustration-thank-you-card-birds-600w-128594957.jpg"
        alt="Thank You For using Resume Reviewer"
      />
    </>
  );
  root.render(<OptionPage />);
}
