import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/user/Login';
import Signup from './screens/user/Signup';
import UserInfo from './screens/user/UserInfo';
import FindUserId from './screens/user/FindUserId';
import FindUserPwd from './screens/user/FindUserPwd';
import Qna from './screens/board/Qna'
import Main from './screens/Header'
import Board from './screens/board/Board'
import WritePost from './screens/board/WritePost'

function App() {
  const [loginsuccess, setLoginSuccess] = useState(false);
  const [clientNum, setClientNum] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loginsuccess') === 'true';
    const storedClientNum = localStorage.getItem('clientNum');
    setLoginSuccess(isLoggedIn);
    setClientNum(storedClientNum);
  }, []);

  const handleLogin = () => {
    setLoginSuccess(true);
    localStorage.setItem('loginsuccess', 'true');
  };

  const handleLogout = (navigate) => {
    setLoginSuccess(false);
    localStorage.removeItem('loginsuccess');
    localStorage.removeItem('userId'); //userId제거
    localStorage.removeItem('clientNum'); // clientNum 제거
    alert('로그아웃 되었습니다.')
    navigate('/');
  };

  const handleLogInfo = (navigate) => {
    if (clientNum) {
      // clientNum을 가지고 사용자 정보 페이지로 이동
      navigate(`/userinfo/${clientNum}`);
    } else {
      alert('로그인 정보가 없습니다. 다시 로그인 해주세요.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Main
          loginsuccess={loginsuccess}
          handleLogout={handleLogout}
          handleLogInfo={handleLogInfo}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setLoginSuccess={setLoginSuccess}
                setClientNum={setClientNum}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userinfo/:clientNum" element={<UserInfo/>} />
          <Route path="/findUserId" element={<FindUserId />} />
          <Route path="/findUserPwd" element={<FindUserPwd />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/board" element={<Board />} />
          <Route path="/write" element={<WritePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
