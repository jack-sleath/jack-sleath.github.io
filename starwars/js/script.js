var classes = {};

function generateJSON() {
    //This is the base user sheet that has nested objects
    var userSheet = {
        skills: {},
        health: {},
        weapons: {
            primary: {},
            secondary: {}
        },
        personality: {}
    };

    //This generates the JSON based off the values in the form.
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

    //This is a dirty hack to copy the JSON
    $('.jsonToSave').show();
    setValueFromName('jsonToSave', JSON.stringify(userSheet));
    $('[name="jsonToSave"]').select();
    document.execCommand('copy');
    setValueFromName('jsonToSave', '');
    $('.jsonToSave').hide();

    //This is used to generate a save link for the JSON
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userSheet));
    $('<a href="data:' + data + '" download="player.json">download JSON</a>').appendTo('#jsonSave');
}

function loadPageFromJSON(jsonText) {
    //This sets all the fields from the passed in JSON
    setValueFromName('charname', jsonText.characterName);
    setValueFromName('class', jsonText.class);
    setValueFromName('background', jsonText.background);
    setValueFromName('playername', jsonText.playername);
    setValueFromName('species', jsonText.species);
    setValueFromName('alignment', jsonText.alignment);
    setValueFromName('Strengthscore', jsonText.skills.str);
    setValueFromName('Dexterityscore', jsonText.skills.dex);
    setValueFromName('Constitutionscore', jsonText.skills.con);
    setValueFromName('Wisdomscore', jsonText.skills.wis);
    setValueFromName('Intelligencescore', jsonText.skills.int);
    setValueFromName('Charismascore', jsonText.skills.cha);
    setValueFromName('ac', jsonText.ac);
    setValueFromName('speed', jsonText.speed);
    setValueFromName('maxhp', jsonText.health.max);
    setValueFromName('currenthp', jsonText.health.current);
    setValueFromName('primaryname', jsonText.weapons.primary.name);
    setValueFromName('primarybonus', jsonText.weapons.primary.bonus);
    setValueFromName('primarytype', jsonText.weapons.primary.type);
    setValueFromName('secondaryname', jsonText.weapons.secondary.name);
    setValueFromName('secondarybonus', jsonText.weapons.secondary.bonus);
    setValueFromName('secondarytype', jsonText.weapons.secondary.type);
    setValueFromName('extraskills', jsonText.extraSkills);
    setValueFromName('credits', jsonText.credits);
    setValueFromName('equipment', jsonText.equipment);
    setValueFromName('traits', jsonText.personality.traits);
    setValueFromName('ideals', jsonText.personality.ideals);
    setValueFromName('bonds', jsonText.personality.bonds);
    setValueFromName('flaws', jsonText.personality.flaws);
    setValueFromName('backstory', jsonText.backstory);
}

function loadClassFromJSON(jsonText) {
    //This only sets the required fields based on the JSON that is passed in
    setValueFromName('class', jsonText.class);
    setValueFromName('species', jsonText.species);
    setValueFromName('alignment', jsonText.alignment);
    setValueFromName('ac', jsonText.ac);
    setValueFromName('speed', jsonText.speed);
    setValueFromName('maxhp', jsonText.health.max);
    setValueFromName('currenthp', jsonText.health.current);
    setValueFromName('primaryname', jsonText.weapons.primary.name);
    setValueFromName('primarybonus', jsonText.weapons.primary.bonus);
    setValueFromName('primarytype', jsonText.weapons.primary.type);
    setValueFromName('secondaryname', jsonText.weapons.secondary.name);
    setValueFromName('secondarybonus', jsonText.weapons.secondary.bonus);
    setValueFromName('secondarytype', jsonText.weapons.secondary.type);
    setValueFromName('extraskills', jsonText.extraSkills);
    setValueFromName('background', jsonText.background);
    setValueFromName('alignment', jsonText.alignment);
}

function getValueFromName(name) {
    //Takes a name and uses that to find the value in the form
    return $('[name = "' + name + '"]').val();
}

function setValueFromName(name, value) {
    //Takes a name and uses that to input the value in the form
    return $('[name = "' + name + '"]').val(value);
}

function populateClassesDropdown() {
    //Finds the item with the ID and sets it for use
    let dropdown = $('#preBuiltClasses');
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose Prebuilt Class</option>');
    dropdown.prop('selectedIndex', 0);

    //Populate dropdown with list of classes
    $.each(classes, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', JSON.stringify(entry.classStats)).text(entry.classname));
    });
}

function loadFromDropdown() {
    //This uses the the selected prebuilt class and the other function
    loadClassFromJSON($.parseJSON(getValueFromName('preBuiltClasses')));
}



$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'https://raw.githubusercontent.com/jacksleath/classes/main/classes.json',
        async: false,
        beforeSend: function () {/*loading*/ },
        dataType: 'json',
        success: function (result) {
            classes = result.sort();
        },
    }).then(function () {
        populateClassesDropdown();
    });


    $('.jsonToSave').hide();
});
