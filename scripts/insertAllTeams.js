require('../DBconnection');

const teamModel = require('../models/teamModel');

var teams = [
    new teamModel({ code: "qa", name: 'Katar', group:'A'}),
    new teamModel({ code: "ec", name: 'Ekwador', group:'A'}),
    new teamModel({ code: "sn", name: 'Senegal', group:'A'}),
    new teamModel({ code: "nl", name: 'Dania', group:'A'}),

    new teamModel({ code: "uk-eng", name: 'Anglia', group:'B'}),
    new teamModel({ code: "ir", name: 'Iran', group:'B'}),
    new teamModel({ code: "us", name: 'USA', group:'B'}),
    new teamModel({ code: "uk-wls", name: 'Walia', group:'B'}),
    
    new teamModel({ code: "ar", name: 'Argentyna', group:'C'}),
    new teamModel({ code: "sa", name: 'Arabia Saudyjska', group:'C'}),
    new teamModel({ code: "mx", name: 'Meksyk', group:'C'}),
    new teamModel({ code: "pl", name: 'Polska', group:'C'}),
    
    new teamModel({ code: "fr", name: 'Francja', group:'D'}),
    new teamModel({ code: "dn", name: 'Dania', group:'D'}),
    new teamModel({ code: "tn", name: 'Tunezja', group:'D'}),
    new teamModel({ code: "", name: 'unknown', group:'D'}),

    new teamModel({ code: "es", name: 'Hiszpania', group:'E'}),
    new teamModel({ code: "de", name: 'Niemcy', group:'E'}),
    new teamModel({ code: "jp", name: 'Japonia', group:'E'}),
    new teamModel({ code: "", name: 'unknown', group:'E'}),

    new teamModel({ code: "bl", name: 'Belgia', group:'F'}),
    new teamModel({ code: "cn", name: 'Kanada', group:'F'}),
    new teamModel({ code: "mk", name: 'Moroko', group:'F'}),
    new teamModel({ code: "cr", name: 'Chorwacja', group:'F'}),

    new teamModel({ code: "br", name: 'Brazylia', group:'G'}),
    new teamModel({ code: "sr", name: 'Serbia', group:'G'}),
    new teamModel({ code: "sw", name: 'Szwajcaria', group:'G'}),
    new teamModel({ code: "km", name: 'Kemerun', group:'G'}),

    new teamModel({ code: "pr", name: 'Portugalia', group:'H'}),
    new teamModel({ code: "gn", name: 'Gana', group:'H'}),
    new teamModel({ code: "ur", name: 'Urugwaj', group:'H'}),
    new teamModel({ code: "kr", name: 'Poludniowa Korea', group:'H'}),
]

teams.forEach(entity => {
    entity.save(function(err, team) {
        if (err) return console.error(err);
        console.log(team.name +" inserted successfully!");
      });
});
