//검색
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    searchButton.addEventListener('click', function () {
        handleSearch();
    });

    function handleSearch() {
        const characterName = searchInput.value;
        if (!characterName) {
            alert("캐릭터 이름을 입력하세요.");
        } else {
            fetchData(characterName);
        }
    }
});

const API_KEY = "test_f84f04936432db0f50d3656d41bf2376619302663173075f7b4f33509f6ac137105a6a552d26310a58df204f28cbd254";

async function fetchData(characterName) {
    try {
        // Create a new Date object for the current date in 한국 시간대 (Asia/Seoul)
        const currentDate = new Date()

        const oneDayAgo = new Date(currentDate);
            oneDayAgo.setDate(currentDate.getDate() - 1);
                console.log("1일 전 날짜:", oneDayAgo);

        // Format the date as YYYY-MM-DD
        const formattedDate = oneDayAgo.toISOString().split('T')[0];
            console.log(formattedDate);

        // userCode 데이터 가져오기
        const userCodeResponse = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${characterName}`, {
            headers: {
                        "x-nxopen-api-key": API_KEY
                    }
                });

                
        const userCodeData = await userCodeResponse.json();
            console.log("유저 식별 코드:", userCodeData);

        // userBasic 정보 가져오기
        const userBasicInfoResponse = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${userCodeData.ocid}&date=${formattedDate}`, {
                headers: {
                        "x-nxopen-api-key": API_KEY
                    }
                });
            if (!userBasicInfoResponse.ok) {
                const errorData = await userBasicInfoResponse.json();
                console.error("API 오류:", errorData);
                return; // 오류가 발생하면 함수를 종료합니다.
                }


        const userBasicInfo = await userBasicInfoResponse.json();
            console.log("유저 기본 정보:", userBasicInfo);

        // userBasic 정보를 화면에 표시
        const characterImageURL = userBasicInfo.character_image;
        const characterNameElement = document.getElementById("characterName");
            characterNameElement.textContent = userBasicInfo.character_name;
                
        const characterServerElement = document.getElementById("characterServer");
            characterServerElement.textContent = "서 버: " + userBasicInfo.world_name;
                
        const characterGuildElement = document.getElementById("characterGuild");
            characterGuildElement.textContent = "길 드: " + userBasicInfo.character_guild_name;
        
        const characterLvElement = document.getElementById("characterLv");
            characterLvElement.textContent = "레 벨: " + userBasicInfo.character_level;
        
        const imageContainer = document.getElementById("imageContainer");
            imageContainer.innerHTML = `<img src="${characterImageURL}" alt="Character Image">`;

        // 인기도 가져오기
        const userPopResponse = await fetch(`https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${userCodeData.ocid}&date=${formattedDate}`, {
            headers: {
                    "x-nxopen-api-key": API_KEY
                    }
                });
        const userPop = await userPopResponse.json();
            console.log("인기도:", userPop);

        // 인기도 표시
        const popElement = document.getElementById("popularityContainer");
            popElement.textContent = "인기도 : " + userPop.popularity;


        //종합 능력치 가져오기
        const userStateResponse = await fetch(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${userCodeData.ocid}&date=${formattedDate}`, {
                headers: {
                        "x-nxopen-api-key": API_KEY
                    }
                })
        const userState = await userStateResponse.json();
            console.log("종합 능력치: ",userState);

        //캐시 장비 정보 조회
        const userCasheResponse = await fetch(`https://open.api.nexon.com/maplestory/v1/character/cashitem-equipment?ocid=${userCodeData.ocid}&date=${formattedDate}`, {
            headers: {
                    "x-nxopen-api-key": API_KEY
                    }
                })
        const userCashe = await userCasheResponse.json();
        console.log("캐시 아이템 :", userCashe);
        
        //캐시 장비 이름 표시 casheNameContainer 
        const casheNameElement = document.getElementById("casheNameContainer");
        casheNameElement.textContent = 
            userCashe.cash_item_equipment_preset_1[0].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[0].cash_item_name + "\n";

        casheNameElement.textContent += 
            userCashe.cash_item_equipment_preset_1[1].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[1].cash_item_name + "\n";

        casheNameElement.textContent += 
            userCashe.cash_item_equipment_preset_1[2].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[2].cash_item_name + "\n";

        casheNameElement.textContent += 
            userCashe.cash_item_equipment_preset_1[3].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[3].cash_item_name + "\n";

        casheNameElement.textContent += 
            userCashe.cash_item_equipment_preset_1[4].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[4].cash_item_name;
        
        
        //캐시 장비 표시 casheContainer
        const casheElement = document.getElementById("casheContainer");
        casheElement.textContent = 
            userCashe.cash_item_equipment_preset_1[0].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[0].cash_item_name + "\n";

        casheElement.textContent += 
            userCashe.cash_item_equipment_preset_1[1].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[1].cash_item_name + "\n";

        casheElement.textContent += 
            userCashe.cash_item_equipment_preset_1[2].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[2].cash_item_name + "\n";

        casheElement.textContent += 
            userCashe.cash_item_equipment_preset_1[3].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[3].cash_item_name + "\n";

        casheElement.textContent += 
            userCashe.cash_item_equipment_preset_1[4].cash_item_equipment_part + " " +
            userCashe.cash_item_equipment_preset_1[4].cash_item_name;
 


            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
                if(error.status === 404){
                    alert("해당 캐릭터를 찾을 수 없습니다.")
                }
            }
}