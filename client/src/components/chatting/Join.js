import React from "react";
import { Link } from "react-router-dom";

import "./ChatTest.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LmySessionIdState, LmyTypeState } from "../../recoil/flolive";

function Join() {
  // const [name, setName] = useState('')
  const [LmyType, setLmyType] = useRecoilState(LmyTypeState);
  const [LmySessionId, setLmySessionId] = useRecoilState(LmySessionIdState);

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <div>
          <input
            placeholder='이름'
            className='joinInput'
            type='text'
            onChange={(event) => setLmyType(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='채팅방'
            className='joinInput mt-20'
            type='text'
            onChange={(event) => setLmySessionId(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!LmyType || !LmySessionId ? e.preventDefault() : null)}
          to={`/chat?name=${LmyType}&room=${LmySessionId}`}
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