import React from "react";
import { logo, discord, docs, medium, twitter } from "../../assets";
import "./Home.css";

const Home = () => {
  const toggleClick = () => {
    const hamburger = document.querySelector(".nav-mobile");

    if (hamburger.style.display == "none") return;

    console.log("hamburger clickedd");
    const list = document.querySelector(".nav-list");
    console.log(list.style.right);
    if (list.style.marginRight == "" || list.style.marginRight == "-200px") {
      list.style.marginRight = "0px";
    } else {
      list.style.marginRight = "-200px";
    }
  };

  return (
    <>
      <div className="landing">
        <section className="navigation">
          <div className="nav-container">
            <div className="brand">
              <a href="#!">
                <img src={logo} alt="" />
              </a>
            </div>
            <nav>
              <div className="nav-mobile" onClick={toggleClick}>
                <a id="nav-toggle" href="#!">
                  <span></span>
                </a>
              </div>
              <ul className="nav-list">
                <li>
                  <a href={process.env.REACT_APP_TWITTER} target="_blank">
                    <img src={twitter} />
                  </a>
                </li>
                <li>
                  <a href={process.env.REACT_APP_MEDIUM} target="_blank">
                    <img src={medium} />
                  </a>
                </li>
                <li>
                  <a href={process.env.REACT_APP_DISCORD_LINK} target="_blank">
                    <img src={discord} />
                  </a>
                </li>
                <li>
                  <a href={process.env.REACT_APP_DOCS_LINK} target="_blank">
                    <img src={docs} />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        <section className="hero-container">
          <div className="hero-heading">
            Seed currency for the Solarpunk paradigm backed by climate solutions
          </div>

          <a href="/app" className="coming-soon">
            Enter App
          </a>
        </section>
      </div>
    </>
  );
};

export default Home;
