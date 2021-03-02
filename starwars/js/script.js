function generateJSON() {
    var userSheet = { skills: [] };
    userSheet.characterName = getValueFromName('charname');
    userSheet.class = getValueFromName('class');
    userSheet.background = getValueFromName('background');
    userSheet.playername = getValueFromName('playername');
    userSheet.species = getValueFromName('species');
    userSheet.alignment = getValueFromName('alignment');
    userSheet.skills.str = getValueFromName('Strengthscore');
    userSheet.skills.dex = getValueFromName('Dexterityscore');
    userSheet.skills.con = getValueFromName('Constitutionscore');
    userSheet.skills.wis = getValueFromName('Wisdomscore');
    userSheet.skills.int = getValueFromName('Intelligencescore');
    userSheet.skills.cha = getValueFromName('Charismascore');
    userSheet.ac = getValueFromName('ac');
    usedNames.speed = getValueFromName('speed');
    console.log(userSheet);
}

function getValueFromName(name) {
    return $('[name = "' + name + '"]').val();
}

function setValueFromName(name, value) {
    return $('[name = "' + name + '"]').val(value);
}

$(document).ready(function () {

});
