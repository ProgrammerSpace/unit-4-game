var characterSelected = false, defenderSelected = false;
var chosenChar, defendingChar;

var obiWanKenobi = {
    id: "obi",
    name: "Obi-Wan Kenobi",
    healthpoints: 120,
    attackPower: 8,
    baseAttackPower: 8
};

var lukeSkywalker = {
    id: "luke",
    name: "Luke Skywalker",
    healthpoints: 100,
    attackPower: 5,
    baseAttackPower: 5
};

var darthSidious = {
    id: "ds",
    name: "Darth Sidious",
    healthpoints: 150,
    attackPower: 20,
    baseAttackPower: 20
};

var darthMaul = {
    id: "dm",
    name: "Darth Maul",
    healthpoints: 180,
    attackPower: 25,
    baseAttackPower: 25
};

function moveAsEnemies() {
    if ($(".card").hasClass("charactersPool")) {
        $("#opp").html("");
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
        if (!characterSelected) {
            chosenChar = a;
            $("#" + chosenChar).removeClass("charactersPool");
            $("#" + chosenChar).addClass("yourChar");
            characterSelected = true;
            moveAsEnemies();
        } else if (!defenderSelected) {
            if ($("#" + a).hasClass("opponent")) {
                defendingChar = a;
                $("#" + defendingChar).removeClass("opponent");
                $("#" + defendingChar).addClass("defender");
                $("#def").html("");
                $(".defenderSpace").append(this);
                defenderSelected = true;
            }
        }
    });
});