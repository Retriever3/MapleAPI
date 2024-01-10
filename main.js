// main.js 파일

const API_KEY = "test_f84f04936432db0f50d3656d41bf2376619302663173075f7b4f33509f6ac137105a6a552d26310a58df204f28cbd254";

$(document).ready(() => {
    $("#search").keypress((e) => {
        if (e.which === 13) {
            $("#searchBt").click();
        }
    });

    $("#searchBt").click(async () => {
        const characterName = $("#search").val();
        if (!characterName) {
            alert("캐릭터 이름을 입력하세요.");
        } else {
            await fetchData(characterName);
        }
    });
});

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

                // 이미지와 이름을 화면에 표시
                const characterImageURL = userBasicInfo.character_image;
                const characterNameElement = document.getElementById("characterName");
                characterNameElement.textContent = "캐릭터 이름: " + userBasicInfo.character_name;

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


                //전투력 가져오기
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

// 이하 함수들은 각각의 역할에 따라 분리하여 구현