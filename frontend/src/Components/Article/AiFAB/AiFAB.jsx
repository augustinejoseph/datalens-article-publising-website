import './AiFAB.scss'
import { MdAdd } from "react-icons/md";
import{FcBusinessman, FcFullTrash} from  "react-icons/fc";
import cn from "classnames";

import {React, useState} from '../../index'

const AiFAB = ({articleUrl}) => {

  const [open, setOpen] = useState(false);
  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);

  const actions = [
    { label: "AI Summary", icon: <FcBusinessman />, onClick: console.log },
    { label: "AI Explain", icon: <FcFullTrash />, onClick: console.log },
  ];

  return (
    <ul
      className="fab-container"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <li className="fab-button">
        <MdAdd />
      </li>
      {actions.map((action, index) => (
        <li
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn("fab-action", { open })}
          key={action.label}
          onClick={action.onClick}
        >
          {action.icon}
          <span className="tooltip">{action.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default AiFAB