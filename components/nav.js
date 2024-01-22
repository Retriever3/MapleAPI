// 헤더 부분

const createHeader = () => {
    const header = document.createElement('header');
    header.innerHTML = `
        <main>
        <header class="site__header">
            <h1 class="brand">lo<span class="brand--point">go</span></h1>
            <nav>
            <ul class="menu">
                <li><a href="#" class="active">메인</a></li>
                <li><a href="#">게시판</a></li>
                <li><a href="#">순위표</a></li>
                <li><a href="#">새소식</a></li>
                <li><a href="components/login.js">로그인</a></li>
                <li>
                    <input type="text" id="searchInput" placeholder="캐릭터 이름을 입력하세요">
                    <button id="searchButton">검색</button>
                </li>
            </ul>
            </nav>
            <div class="toggle">
            <span class="toggle--switch"></span>
            </div>
        </header>
        </main>

    `;
    return header;
};

// document.getElementById('app').appendChild(createHeader());

export default createHeader;
