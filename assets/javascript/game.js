var flag = true;
var chosenChar, defendingChar;
function moveAsEnemies() {
    if ($(".card").hasClass("charactersPool")) {
        $(".charactersPool").each(function () {
            $(".charactersPool").removeClass("charactersPool").addClass("opponent");
            $(".enemiesList").append(this);
        });
    }

}
$(document).ready(function () {
    $(".card").click(function () {
        var a = $(this).attr("id");
        console.log(a);
        if (flag) {
            chosenChar = a;
            $("#" + chosenChar).removeClass("charactersPool");
            $("#" + chosenChar).addClass("yourChar");
            flag = false;
            moveAsEnemies();
        } else {
            defendingChar = a;
            $("#" + defendingChar).removeClass("charactersPool");
            $("#" + defendingChar).addClass("opponent");
            $(".enemiesList").append(this);
        }
    });
});