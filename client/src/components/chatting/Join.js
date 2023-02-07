import React from "react";
import { Link } from "react-router-dom";

import "./ChatTest.css";
import { useRecoilState } from "recoil";
import { nameState, roomState } from "../../recoil/chatting";

function Join() {
  // const [name, setName] = useState('')
  const [name, setName] = useRecoilState(nameState)
  const [room, setRoom] = useRecoilState(roomState)

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <div>
          <input
            placeholder='이름'
            className='joinInput'
            type='text'
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='채팅방'
            className='joinInput mt-20'
            type='text'
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={'button mt-20'} type='submit'>
            가입
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;