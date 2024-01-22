const createMainMenu = () => {
    const mainMenu = document.createElement('mainMenu');
    mainMenu.innerHTML = `
        <div class="mainMenu">
            <div>
                <div>
 
                </div>
                <div class="imageBack">
                    <p id="imageContainer"></p>
                </div>

                <div id="characterName"></div>
                <div id="characterServer"></div>
                <div id="characterGuild"></div>
                <div id="characterLv"></div>
                <div id="popularityContainer"></div>
            </div>
        </div>
    `;
    return mainMenu;
};


// 공통 헤더를 #app에 추가합니다.
// document.getElementById('app').appendChild(createMainMenu());


export default createMainMenu;