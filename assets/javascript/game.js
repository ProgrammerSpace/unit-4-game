var characterSelected = false, defenderSelected = false;
var chosenChar = {}, defendingChar = {};
var obi, luke, ds, dm, gameTracker = 0;

function InitCharacter(id, name, health, attack, counter, picture) {
    this.id = id;
    this.name = name;
    this.healthpoints = health;
    this.baseAttackPower = attack;
    this.attackPower = attack;
    this.counterAttackPower = counter;
    this.picture = picture;
}

function initCharacterSpace(char) {
    var newDiv = $("<div>");
    newDiv.addClass("card charactersPool m-2 float-left");
    // charDiv.addClass(charClass);
    newDiv.attr("id", char.id);
    // charDiv.attr("health", char.health);
    // charDiv.css("text-align", "center");
    var bodyDiv = $("<div>")
    bodyDiv.addClass("card-body");
    var title = $("<h5>");
    title.text(char.name);
    // bodyDiv.text(char.name);
    bodyDiv.append(title);

    var charImg = $("<img>");
    charImg.attr("src", char.picture);
    // charImg.addClass("char-pic");
    bodyDiv.append(charImg);

    var hp = $("<p>");
    hp.text(char.healthpoints);
    hp.addClass(char.id + "-health")
    bodyDiv.append(hp);
    newDiv.append(bodyDiv);

    $(".charactersList").append(newDiv);
}
function reset() {
    gameTracker = 0;
    $(".charactersList").empty();
    initCharacterSpace(obi = new InitCharacter("obi", "Obi-Wan Kenobi", 120, 8, 15, "assets/images/obiwankenobi.jpg"));
    initCharacterSpace(luke = new InitCharacter("luke", "Luke Skywalker", 100, 5, 5, "assets/images/lukeskywalker.jpg"));
    initCharacterSpace(ds = new InitCharacter("ds", "Darth Sidious", 150, 20, 20, "assets/images/darthsidious.jpg"));
    initCharacterSpace(dm = new InitCharacter("dm", "Darth Maul", 180, 25, 25, "assets/images/darthmaul.jpg"));


    $(".enemiesList").empty();
    $(".defenderSpace").empty();
    $("#attack").hide();
    characterSelected = false;
    defenderSelected = false;
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
        defendingChar.counterAttackPower = this[player].counterAttackPower;
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
    // $(".card").click(function () {
    $(".row").on('click', '.card', function () {
        var chosenId = $(this).attr("id");
        console.log(chosenId);
        if (!characterSelected) {
            $("#" + chosenId).removeClass("charactersPool").addClass("yourChar");
            $("#head").html("<h1 id=head>Your Character</h1>");
            characterSelected = true;
            gameTracker = 1;
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
                gameTracker = 2;
            }
        }
    });
    $("#attack").click(function () {
        if (defenderSelected) {
            if (chosenChar.healthpoints > 0 && gameTracker == 2) {
                defendingChar.healthpoints -= chosenChar.attackPower;
                $(".userReport").text("You attacked " + defendingChar.name + " for " + chosenChar.attackPower + " damage");
                chosenChar.attackPower += chosenChar.baseAttackPower;
                console.log("new ap: " + chosenChar.attackPower);
                $("." + defendingChar.id + "-health").html("<p>" + defendingChar.healthpoints + "</p>");
            } else {
                $(".message").text("Game Over!!");
                $(".userReport").text("");
                $(".defenderReport").text("");
                gameTracker = 0;
            }
            if (defendingChar.healthpoints > 0 && gameTracker == 2) {
                chosenChar.healthpoints -= defendingChar.counterAttackPower;
                $("." + chosenChar.id + "-health").html("<p>" + chosenChar.healthpoints + "</p>");
                $(".defenderReport").text(defendingChar.name + " attacked you for " + defendingChar.counterAttackPower + " damage");
            } else if (defendingChar.healthpoints <= 0) {
                $("#" + defendingChar.id).hide();
                gameTracker = 1;
                defenderSelected = false;
            }
        }

    });
    $("#rst").click(function () {
        reset();
        console.log(characterSelected);
        console.log(defenderSelected);
    });
});