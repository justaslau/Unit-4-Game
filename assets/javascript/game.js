/*
Developer: Justas Lauzinskas
Title: Unit-4-Game
Description: Homework 4: JavaScript + jQuery Game
Date: 2018-12-10
*/

// Game Properties
var imageDir = "assets/images/";

function Character(charName, healthPoints, attackPower, counterPower) {
    var self = this;
    this.charName = charName;
    this.attackPower = attackPower;
    this.healthPoints = healthPoints;
    this.counterPower = counterPower;
    this.charSelected = false;

    // Method to display each object on browser
    this.displayCharacter = function(idName) {
        $(document).ready(function(){
            // Create div with unique ID for every character
            $("<div></div>").attr("id", idName).appendTo("#selectChar");
            // Create charName, charName and charHealth div for every char
            $("<div></div>").addClass("charName").appendTo("#" + idName);
            $("<div></div>").addClass("charImage").appendTo("#" + idName);
            $("<div></div>").addClass("charHealth").appendTo("#" + idName);
            // Add name, picture and health points to divs created before
            $("#" + idName + " .charName").text(self.charName);
            $("#" + idName + " .charImage").append("<img />");
            $("#" + idName + " .charImage img").attr("alt", "Character " + self.charName);
            $("#" + idName + " .charImage img").attr("src", imageDir + self.charName + ".png");
        });
    }
    // Method to generate unique ID by name for each character
    this.generateCharId = function () {
        var idName = this.charName.charAt(0).toLowerCase() + this.charName.substr(1);
        idName = idName.replace(/ /g,'');
        this.displayCharacter(idName);
        return idName;
    }
    // Add unique ID to object property
    this.chardId = this.generateCharId();
}

// Create object Name, HP, AttPwr, Counter Att Pwr
var scorpion = new Character("Scorpion", 100, 8, 10);
var quan = new Character("Quan Chi", 120, 6, 15);
var kabal = new Character("Kabal", 150, 4, 20);
var baraka = new Character("Baraka", 180, 2, 25);