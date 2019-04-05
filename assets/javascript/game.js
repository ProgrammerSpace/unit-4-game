var characterSelected = false, defenderSelected = false, gameOver = false;
var chosenChar = {}, defendingChar = {};

var obi = {
    id: "obi",
    name: "Obi-Wan Kenobi",
    healthpoints: 120,
    attackPower: 8,
    baseAttackPower: 8
};

var luke = {
    id: "luke",
    name: "Luke Skywalker",
    healthpoints: 100,
    attackPower: 5,
    baseAttackPower: 5
};

var ds = {
    id: "ds",
    name: "Darth Sidious",
    healthpoints: 150,
    attackPower: 20,
    baseAttackPower: 20
};

var dm = {
    id: "dm",
    name: "Darth Maul",
    healthpoints: 180,
    attackPower: 25,
    baseAttackPower: 25
};

function reset() {
    $(".enemiesList").hide();
    $(".defenderSpace").hide();
    $("#attack").hide();
    characterSelected = false;
    defenderSelected = false;
    $(".card").each(function () {
        $(".card").removeClass("yourChar").removeClass("opponent").removeClass("defender").addClass("charactersPool");
        $(".charactersList").append(this);
    });
    $("#userReport, #defenderReport").empty;

}
function moveToStage(player, role) {
    if (role == "user") {
        chosenChar.id = this[player].id;
        chosenChar.name = this[player].name;
        chosenChar.healthpoints = this[player].healthpoints;
        chosenChar.attackPower = this[player].attackPower;
        chosenChar.baseAttackPower = this[player].baseAttackPower;

    } else if (role == "defender") {
        defendingChar.id = this[player].id;
        defendingChar.name = this[player].name;
        defendingChar.healthpoints = this[player].healthpoints;
        defendingChar.attackPower = this[player].attackPower;
    }
}
function moveAsEnemies() {
    $(".enemiesList").show();
    if ($(".card").hasClass("charactersPool")) {
        $("#opp").html("");
        $(".charactersPool").each(function () {
            $(".charactersPool").removeClass("charactersPool").addClass("opponent");
            $(".enemiesList").append(this);
        });
    }

}
$(document).ready(function () {
    reset();
    $(".card").click(function () {
        var chosenId = $(this).attr("id");
        console.log(chosenId);
        if (!characterSelected) {
            $("#" + chosenId).removeClass("charactersPool").addClass("yourChar");
            // $("#head").html("<h1 id=head>Your Character</h1>");
            characterSelected = true;
            moveAsEnemies();
            moveToStage(chosenId, "user");
        } else if (!defenderSelected) {
            if ($("#" + chosenId).hasClass("opponent")) {
                $("#" + chosenId).removeClass("opponent").addClass("defender");
                $("#def").html("");
                $(".defenderSpace").append(this);
                moveToStage(chosenId, "defender");
                $(".defenderSpace").show();
                $("#attack").show();
                defenderSelected = true;
            }
        }
    });
    $("#attack").click(function () {
        if (defenderSelected) {
            if (chosenChar.healthpoints > 0) {
                defendingChar.healthpoints -= chosenChar.attackPower;
                chosenChar.attackPower += chosenChar.baseAttackPower;
                $("." + defendingChar.id + "-health").html("<p>" + defendingChar.healthpoints + "</p>");
            } else {
                gameOver = true;
            }
            if (defendingChar.healthpoints > 0) {
                chosenChar.healthpoints -= defendingChar.attackPower;
                $("." + chosenChar.id + "-health").html("<p>" + chosenChar.healthpoints + "</p>");
            } else {
                $("#" + defendingChar.id).hide();
                defenderSelected = false;
            }

            // if (defendingChar.healthpoints <= 0) {
            //     $("#" + defendingChar.id).hide();
            //     defenderSelected = false;
            // }
            // if (chosenChar.healthpoints <= 0) {

            // }
        }

    });
    $("#rst").click(function () {
        reset();
    });
});