import React, { Component } from "react";
import "../App.css";

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      palette: {
        bg: "",
        textColor: "",
        quoteBgColor: "",
        quoteTextColor: "",
        buttonBgColor: "",
        buttonTextHoverColor: "",
        buttonBgHoverColor: ""
      }
    };
  }

  componentDidMount() {
    this.getQuote();
    this.updatePalette();
  }

  getQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          {
            quote: data.content,
            author: data.author
          },
          this.updatePalette
        );
      });
  }

  updatePalette() {
    const paletteGroups = [
      // Group 1
      {
        bg: "#000000",
        quoteBgColor: "#0f0f0f",
        quoteTextColor: "#ffffff",
        buttonBgColor: "#4E4FEB",
        buttonTextHoverColor: "#ffffff",
        buttonBgHoverColor: "#068FFF"
      },
      // Group 2
      {
        bg: "#071952",
        quoteBgColor: "#0B666A",
        quoteTextColor: "#35A29F",
        buttonBgColor: "#97FEED",
        buttonTextHoverColor: "#ffffff",
        buttonBgHoverColor: "#555555"
      },
      // Group 3
      {
        bg: "#AA77FF",
        quoteBgColor: "#C9EEFF",
        quoteTextColor: "#97DEFF",
        buttonBgColor: "#62CDFF",
        buttonTextHoverColor: "#ffffff",
        buttonBgHoverColor: "#555555"
      },
      // Group 4
      {
        bg: "#331D2C",
        quoteBgColor: "#3F2E3E",
        quoteTextColor: "#A78295",
        buttonBgColor: "#EFE1D1",
        buttonTextHoverColor: "#ffffff",
        buttonBgHoverColor: "#555555"
      }
    ];    

    const randomGroup = paletteGroups[Math.floor(Math.random() * paletteGroups.length)];
    const palette = {
      ...randomGroup,
      textColor: this.getContrastingColor(randomGroup.bg)
    };

    document.documentElement.style.setProperty("--bg-color", palette.bg);
    document.documentElement.style.setProperty("--text-color", palette.textColor);
    document.documentElement.style.setProperty("--quote-bg-color", palette.quoteBgColor);
    document.documentElement.style.setProperty("--quote-text-color", palette.quoteTextColor);
    document.documentElement.style.setProperty("--button-bg-color", palette.buttonBgColor);
    document.documentElement.style.setProperty("--button-text-color", palette.textColor);
    document.documentElement.style.setProperty("--button-text-hover-color", palette.buttonTextHoverColor);
    document.documentElement.style.setProperty("--button-bg-hover-color", palette.buttonBgHoverColor);

    this.setState({ palette });
  }

  getContrastingColor(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? "#000" : "#fff";
  }

  render() {
    const { quote, author } = this.state;
    return (
      <div>
        <div id="quote-box">
          <div id="text">
            <p>{quote}</p>
          </div>
          <div id="author">
            <p> - {author} - </p>
          </div>
          <div id="buttons">
            <button
              id="new-quote"
              onClick={() => {
                this.getQuote();
                this.updatePalette();
              }}
            >
              New Quote
            </button>
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet Quote
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
