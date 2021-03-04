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
    userSheet.weapons.primary.dice = getValueFromName('primarydice');
    userSheet.weapons.primary.range = getValueFromName('primaryrange');
    userSheet.weapons.primary.ammo = getValueFromName('primaryammo');
    userSheet.weapons.primary.maxammo = getValueFromName('primarymaxammo');
    userSheet.weapons.primary.extra = getValueFromName('primaryextra');
    userSheet.weapons.secondary.name = getValueFromName('secondaryname');
    userSheet.weapons.secondary.dice = getValueFromName('secondarydice');
    userSheet.weapons.secondary.range = getValueFromName('secondaryrange');
    userSheet.weapons.secondary.ammo = getValueFromName('secondaryammo');
    userSheet.weapons.secondary.maxammo = getValueFromName('secondarymaxammo');
    userSheet.weapons.secondary.extra = getValueFromName('secondaryextra');
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

    $('#downloadLink').remove();
    //This is used to generate a save link for the JSON
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userSheet));
    $('<a id="downloadLink" href="data:' + data + '" download="player.json">download JSON</a>').appendTo('#jsonSave');
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
    setValueFromName('primarydice', jsonText.weapons.primary.dice);
    setValueFromName('primaryrange', jsonText.weapons.primary.range);
    setValueFromName('primaryammo', jsonText.weapons.primary.ammo);
    setValueFromName('primarymaxammo', jsonText.weapons.primary.maxammo);
    setValueFromName('primaryextra', jsonText.weapons.primary.extra);
    setValueFromName('secondaryname', jsonText.weapons.secondary.name);
    setValueFromName('secondarydice', jsonText.weapons.secondary.dice);
    setValueFromName('secondaryrange', jsonText.weapons.secondary.range);
    setValueFromName('secondaryammo', jsonText.weapons.secondary.ammo);
    setValueFromName('secondarymaxammo', jsonText.weapons.secondary.maxammo);
    setValueFromName('secondaryextra', jsonText.weapons.secondary.extra);
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
    setValueFromName('primarydice', jsonText.weapons.primary.dice);
    setValueFromName('primaryrange', jsonText.weapons.primary.range);
    setValueFromName('primaryammo', jsonText.weapons.primary.ammo);
    setValueFromName('primarymaxammo', jsonText.weapons.primary.maxammo);
    setValueFromName('primaryextra', jsonText.weapons.primary.extra);
    setValueFromName('secondaryname', jsonText.weapons.secondary.name);
    setValueFromName('secondarydice', jsonText.weapons.secondary.dice);
    setValueFromName('secondaryrange', jsonText.weapons.secondary.range);
    setValueFromName('secondaryammo', jsonText.weapons.secondary.ammo);
    setValueFromName('secondarymaxammo', jsonText.weapons.secondary.maxammo);
    setValueFromName('secondaryextra', jsonText.weapons.secondary.extra);
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


$(document).on('change', '.file-upload-button', function (event) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var jsonObj = JSON.parse(event.target.result);
        alert(jsonObj.name);
    }

    reader.readAsText(event.target.files[0]);
});

//Comparer Function    
function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}  

//When the document loads this runs
$(document).ready(function () {
    //This request gets the Classes JSON
    $.ajax({
        type: 'GET',
        url: 'https://raw.githubusercontent.com/jacksleath/classes/main/classes.json',
        async: false,
        beforeSend: function () {/*loading*/ },
        dataType: 'json',
        success: function (result) {
            //This sets the classes file to the JSON got earlier but sorted
            classes = result.sort(GetSortOrder("classname")); 
        },
    }).then(function () {
        //Once the last function finishes this runs
        populateClassesDropdown();
    });

    //This is needed to be hidden on page load
    $('.jsonToSave').hide();
});
