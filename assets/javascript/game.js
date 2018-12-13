/*
Developer: Justas Lauzinskas
Title: Unit-4-Game
Description: Homework 4: JavaScript + jQuery Game
Date: 2018-12-10
*/
// Game Properties
var imageDir = "assets/images/";
var div = "<div>";
var playerSelected = false;
var enemySelected = false;
var selectedPlayer;
var selectedEnemy;
var timesAttacked = 0;
var indexOfEnemy;
var indexOfPlayer;
var totalWins = 0;
var playerDead = false;

function Game() {
    this.charList = Array();

    this.Characters = function(charName, healthPoints, attackPower, counterPower) {
        this.charName = charName;
        this.attackPower = attackPower;
        this.healthPoints = healthPoints;
        this.counterPower = counterPower;
        this.isDefeated = false;

        this.generateCharId = function() {
            var idName = this.charName.toLowerCase();
            idName = idName.replace(/ /g, '');
            return idName;
        }
        this.chardId = this.generateCharId();
    }
}
// Create object and push characters to array
var ourGame = new Game();
ourGame.charList.push(new ourGame.Characters("Scorpion", 120, 6, 8));
ourGame.charList.push(new ourGame.Characters("Quan Chi", 140, 5, 6));
ourGame.charList.push(new ourGame.Characters("Kabal", 150, 4, 12));
ourGame.charList.push(new ourGame.Characters("Baraka", 180, 2, 14));

// Funtion to display all characters created
function displayCharacter() {
    for (var i = 0; i < characters.length; i++) {
        var idName = characters[i].chardId;
        var charName = characters[i].charName
        var hPoints = characters[i].healthPoints;
        $(div).attr("id", idName).appendTo("#select-char");
        // Create charName, charName and charHealth div for every char
        $(div).addClass("name").appendTo("#" + idName);
        $(div).addClass("image").appendTo("#" + idName);
        $(div).addClass("health").appendTo("#" + idName);
        // Add name, picture and health points to divs created before
        $("#" + idName).addClass("character");
        $("#" + idName + " .name").text(charName);
        $("#" + idName + " .health").text(hPoints);
        $("#" + idName + " .image").append("<img/>");
        $("#" + idName + " .image img").attr("alt", "Character " + charName);
        $("#" + idName + " .image img").attr("src", imageDir + idName + ".png");
    }
}
// Function to select player and move the rest to enemy section
function selectCharacter() {
    selectedPlayer = this.id;

    for (var i = 0; i < ourGame.charList.length; i++) {
        if (ourGame.charList[i].chardId === selectedPlayer) {
            indexOfPlayer = i;
        }
    }
    if (!playerSelected) {
        playerSelected = true;
        $("#" + selectedPlayer).clone().appendTo(".player").hide().fadeIn(1000);
        $("#select-char #" + selectedPlayer).remove();
        $(".enemy-section").fadeIn(1500);
        $(".select-section .character").clone().appendTo("#select-enemy").hide().fadeIn(1500);
        $(".select-section").remove();
        $(".messages span").text("Select your enemy!");
        callback();
    }
}

// Callback waiting until player is selected
function callback() {
    $(".enemy-section .character").click(selectEnemy);
}
// Function to select enemy and move it to fight section
function selectEnemy() {
    if (!enemySelected) {
        console.log(enemySelected);
        selectedEnemy = this.id;
        for (var i = 0; i < ourGame.charList.length; i++) {
            if (ourGame.charList[i].chardId === selectedEnemy) {
                indexOfEnemy = i;
            }
        }
        if (!ourGame.charList[indexOfEnemy].isDefeated) {
            enemySelected = true;
            console.log(enemySelected);
            $(".enemy").empty();
            $("#" + selectedEnemy).clone().appendTo(".enemy").hide().fadeIn(1000);
            $(".messages span").text("You are ready to attack you enemy! good luck!");
            $(".attack").fadeIn(500);
        } else {
            $(".messages span").text("All enemies defeated, good job.");
        }


    } else {
        $(".messages span").text("your are dead or select enemy");
    }
}
// Attack function, display messages, calculate health and etc.
function attackPlayer() {
    playerHp = characters[indexOfPlayer].healthPoints;
    enemyHp = characters[indexOfEnemy].healthPoints;
    playerAtt = characters[indexOfPlayer].attackPower;
    enemyAtt = characters[indexOfEnemy].counterPower;

    if (enemySelected) {
        if (playerHp > 0) {
            if ((enemyHp > 0)) {
                timesAttacked++;
                characters[indexOfEnemy].healthPoints = enemyHp - (playerAtt * timesAttacked);
                $("#" + characters[indexOfEnemy].chardId + " .health").text(characters[indexOfEnemy].healthPoints);
                characters[indexOfPlayer].healthPoints = playerHp - enemyAtt;
                $("#" + characters[indexOfPlayer].chardId + " .health").text(characters[indexOfPlayer].healthPoints);
                $(".messages span").text("You did " + (playerAtt * timesAttacked) + " damage to your enemy. He did " + enemyAtt);
            } else {
                $(".messages span").text("GOOD JOB ! Your enemy is dead! Select new enemy!");
                enemySelected = false;
                characters[indexOfEnemy].isDefeated = true;
                totalWins++;
                if (totalWins === (ourGame.charList.length - 1)) {
                    $(".messages span").text("YOU WON THIS GAME");
                }
            }
        } else {
            $(".messages span").text("YOU ARE DEAD");
        }

    } else {
        $(".messages span").text("YOUR ENEMY IS DEAD");
    }
}

var characters = ourGame.charList;
displayCharacter();
$(".attack").hide();
$(".enemy-section").hide();
$("#select-char .character").click(selectCharacter);
$(".attack").click(attackPlayer);