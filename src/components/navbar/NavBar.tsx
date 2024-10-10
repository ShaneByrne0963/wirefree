type NavBarProps = {
  color: string;
};

function NavBar(props: NavBarProps) {
  return <nav id="nav-bar" className={props.color + " lighten-2"}>
    <div className="nav-wrapper">
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="#" className={props.color + "-text text-lighten-5"}>File</a></li>
      </ul>
    </div>
  </nav>;
}

export default NavBar;