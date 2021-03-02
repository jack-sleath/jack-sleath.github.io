var classes = {};

function generateJSON() {
    var userSheet = {
        skills: {},
        health: {},
        weapons: {
            primary: {},
            secondary: {}
        },
        personality: {}
    };

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
    userSheet.speed = getValueFromName('speed');
    userSheet.health.max = getValueFromName('maxhp');
    userSheet.health.current = getValueFromName('currenthp');
    userSheet.weapons.primary.name = getValueFromName('primaryname');
    userSheet.weapons.primary.bonus = getValueFromName('primarybonus');
    userSheet.weapons.primary.type = getValueFromName('primarytype');
    userSheet.weapons.secondary.name = getValueFromName('secondaryname');
    userSheet.weapons.secondary.bonus = getValueFromName('secondarybonus');
    userSheet.weapons.secondary.type = getValueFromName('secondarytype');
    userSheet.extraSkills = getValueFromName('extraskills');
    userSheet.credits = getValueFromName('credits');
    userSheet.equipment = getValueFromName('equipment');
    userSheet.personality.traits = getValueFromName('traits');
    userSheet.personality.ideals = getValueFromName('ideals');
    userSheet.personality.bonds = getValueFromName('bonds');
    userSheet.personality.flaws = getValueFromName('flaws');
    userSheet.backstory = getValueFromName('backstory');

    console.log(userSheet);
}

function loadPageFromJSON(jsonText) {
    setValueFromName('charname', jsonText.characterName);
    setValueFromName('class', jsonText.class);
    setValueFromName('background', jsonText.background);
    setValueFromName('playername', jsonText.playername);
    setValueFromName('species', jsonText.species);
    setValueFromName('alignment', jsonText.alignment);
    setValueFromName('Strengthscore', jsonText.skills.str);
    setValueFromName('Dexterityscore', jsonText.skills.dex);
    setValueFromName('Constitutionscore', jsonText.skills.con);
    setValueFromName('Wisdomscore', jsonText.skills.wis );
    setValueFromName('Intelligencescore', jsonText.skills.int);
    setValueFromName('Charismascore', jsonText.skills.cha);
    setValueFromName('ac', jsonText.ac );
    setValueFromName('speed', jsonText.speed );
    setValueFromName('maxhp', jsonText.health.max);
    setValueFromName('currenthp', jsonText.health.current);
    setValueFromName('primaryname', jsonText.weapons.primary.name);
    setValueFromName('primarybonus', jsonText.weapons.primary.bonus);
    setValueFromName('primarytype', jsonText.weapons.primary.type);
    setValueFromName('secondaryname', jsonText.weapons.secondary.name);
    setValueFromName('secondarybonus', jsonText.weapons.secondary.bonus);
    setValueFromName('secondarytype', jsonText.weapons.secondary.type);
    setValueFromName('extraskills', jsonText.extraSkills );
    setValueFromName('credits', jsonText.credits);
    setValueFromName('equipment', jsonText.equipment);
    setValueFromName('traits', jsonText.personality.traits);
    setValueFromName('ideals', jsonText.personality.ideals);
    setValueFromName('bonds', jsonText.personality.bonds);
    setValueFromName('flaws', jsonText.personality.flaws);
    setValueFromName('backstory', jsonText.backstory);
}



function getValueFromName(name) {
    return $('[name = "' + name + '"]').val();
}

function setValueFromName(name, value) {
    return $('[name = "' + name + '"]').val(value);
}

function populateClassesDropdown() {
    console.log('3');
    let dropdown = $('#preBuiltClasses');

    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Choose PrebuiltClass</option>');
    dropdown.prop('selectedIndex', 0);

    // Populate dropdown with list of provinces
    $.each(classes, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', JSON.stringify(entry.classStats)).text(entry.classname));
    });
}

function loadFromDropdown() {
    loadPageFromJSON($.parseJSON(getValueFromName('preBuiltClasses')));
}

$(document).ready(function () {
    console.log('1');
    $.ajax({
        type: 'GET',
        url: 'json/classes.json',
        async: false,
        beforeSend: function () {/*loading*/ },
        dataType: 'json',
        success: function (result) {
            classes = result;
        },
    }).then(function () {
        console.log('2');
        populateClassesDropdown();
    });
});