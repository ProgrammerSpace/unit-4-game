//Global variables
var characterSelected = false, defenderSelected = false;
var chosenChar = {}, defendingChar = {};
var obi, luke, ds, dm, gameTracker = 0;

//Initialise character objects
function InitCharacter(id, name, health, attack, counter, picture) {
    this.id = id;
    this.name = name;
    this.healthpoints = health;
    this.baseAttackPower = attack;
    this.attackPower = attack;
    this.counterAttackPower = counter;
    this.picture = picture;
}

//Initialize character cards in web page
function initCharacterSpace(char) {
    var newDiv = $("<div>");
    newDiv.addClass("card charactersPool m-2 float-left");
    newDiv.attr("id", char.id);
    var bodyDiv = $("<div>")
    bodyDiv.addClass("card-body");
    var title = $("<h5>");
    title.text(char.name);
    bodyDiv.append(title);

    var charImg = $("<img>");
    charImg.attr("src", char.picture);
    bodyDiv.append(charImg);

    var hp = $("<p>");
    hp.text(char.healthpoints);
    hp.addClass(char.id + "-health")
    bodyDiv.append(hp);
    newDiv.append(bodyDiv);

    $(".charactersList").append(newDiv);
}

//Reset game
function reset() {
    gameTracker = 0;
    $(".charactersList").empty();
    initCharacterSpace(obi = new InitCharacter("obi", "Obi-Wan Kenobi", 120, 8, 15, "assets/images/obiwankenobi.jpg"));
    initCharacterSpace(luke = new InitCharacter("luke", "Luke Skywalker", 100, 5, 5, "assets/images/lukeskywalker.jpg"));
    initCharacterSpace(ds = new InitCharacter("ds", "Darth Sidious", 150, 20, 20, "assets/images/darthsidious.jpg"));
    initCharacterSpace(dm = new InitCharacter("dm", "Darth Maul", 180, 25, 25, "assets/images/darthmaul.jpg"));

    $(".message").empty();
    $(".userReport").empty();
    $(".defenderReport").empty();
    $(".enemiesList").empty();
    $(".defenderSpace").empty();
    $("#attack").hide();
    characterSelected = false;
    defenderSelected = false;

}

//set user character and defender character
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

//Move cards to opponent space
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

//Main routine
$(document).ready(function () {
    reset();
    $(".row").on('click', '.card', function () {
        var chosenId = $(this).attr("id");
        console.log(chosenId);
        //Choosing user character
        if (!characterSelected) {
            $("#" + chosenId).removeClass("charactersPool").addClass("yourChar");
            $("#head").html("<h1 id=head>Your Character</h1>");
            moveAsEnemies();

            characterSelected = true;
            gameTracker = 1;
            moveToStage(chosenId, "user");

            //Choosing defender character
        } else if (!defenderSelected) {
            if ($("#" + chosenId).hasClass("opponent")) {
                $("#" + chosenId).removeClass("opponent").addClass("defender");
                moveToStage(chosenId, "defender");

                $("#def").html("");
                $(".defenderSpace").append(this);
                $("#attack").show();
                defenderSelected = true;
                gameTracker = 2;
            }
        }
    });

    $("#attack").click(function () {
        if (defenderSelected) {

            //User character to attack defender
            if (chosenChar.healthpoints > 0 && gameTracker == 2) {
                defendingChar.healthpoints -= chosenChar.attackPower;
                $(".userReport").text("You attacked " + defendingChar.name + " for " + chosenChar.attackPower + " damage");
                chosenChar.attackPower += chosenChar.baseAttackPower;
                console.log("new ap: " + chosenChar.attackPower);
                $("." + defendingChar.id + "-health").html("<p>" + defendingChar.healthpoints + "</p>");
            } else {

                //User lost game
                $(".message").text("Game Over!! Restart to play again");
                $(".userReport").text("");
                $(".defenderReport").text("");
                gameTracker = 0;
            }

            //defender to attack user
            if (defendingChar.healthpoints > 0 && gameTracker == 2) {
                chosenChar.healthpoints -= defendingChar.counterAttackPower;
                $("." + chosenChar.id + "-health").html("<p>" + chosenChar.healthpoints + "</p>");
                $(".defenderReport").text(defendingChar.name + " attacked you for " + defendingChar.counterAttackPower + " damage");
            } else if (defendingChar.healthpoints <= 0) {

                //choose new defender
                $("#" + defendingChar.id).removeClass("defender");
                $("#" + defendingChar.id).hide();
                gameTracker = 1;
                defenderSelected = false;
                if (!$(".card").hasClass("opponent")) {

                    //User wins
                    $(".message").text("You won!! Restart to play again");
                    $(".userReport").text("");
                    $(".defenderReport").text("");
                }
            }
        }

    });
    $("#rst").click(function () {
        reset();
    });
});