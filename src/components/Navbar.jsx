import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div id="nav">
      <div className="innerNav">
        <a href="/">
          <img id="logo" src={logo} alt="logo" />
          <div id="siteName">HackerNews</div>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
