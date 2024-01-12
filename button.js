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