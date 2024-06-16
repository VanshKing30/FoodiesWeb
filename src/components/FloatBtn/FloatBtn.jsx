import "./FloatBtn.css";

const FloatBtn = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
      return(
        <button class="scrollButton" onClick={scrollToTop}>
        &#9650;
      </button>
      );
};

export default FloatBtn;