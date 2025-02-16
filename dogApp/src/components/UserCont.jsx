import { useContext } from "react";
import { DogsContext } from "./Context";

const UserCont = (props) => {
  const { activeUser, setActiveUser } = useContext(DogsContext);
  const { name, profilePic, id } = props;
  
  return (
    <div>
      <button className="userHeading" onClick={() => setActiveUser(id)}>
        <div className="profilePic" />
        <h3 className={activeUser == id ? "activeUser" : ""}>
          {activeUser == id ? `${name}✅` : name}
        </h3>
      </button>
    </div>
  );
};

export default UserCont;
