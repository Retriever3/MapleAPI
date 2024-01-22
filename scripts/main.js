// main.js 파일

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
                characterNameElement.textContent = "캐릭터 이름: " + userBasicInfo.character_name;
                
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

                //능력치 표시
                const stateElement = document.getElementById("fightingPower");
                stateElement.textContent = "전투력 : " + userState.final_stat[42].stat_value;

            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
                if(error.status === 404){
                    alert("해당 캐릭터를 찾을 수 없습니다.")
                }
            }
}

