const createLogin = () => {
    const login = document.createElement('login');
    login.innerHTML = `
        <form>
            <label for="username">사용자 이름:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">비밀번호:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">로그인</button>
        </form>
    `;
    return login;
};
console.log("로그인 된거임?");

// 공통 헤더를 #app에 추가합니다.
// document.getElementById('app').appendChild(createLogin());

export default createLogin;
