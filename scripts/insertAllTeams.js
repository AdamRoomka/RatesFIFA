require('../DBconnection');

const teamModel = require('../models/teamModel');

var teams = [
    new teamModel({ code: "qa", name: 'Katar', group:'A'}),
    new teamModel({ code: "ec", name: 'Ekwador', group:'A'}),
    new teamModel({ code: "sn", name: 'Senegal', group:'A'}),
    new teamModel({ code: "nld", name: 'Holandia', group:'A'}),

    new teamModel({ code: "gb-eng", name: 'Anglia', group:'B'}),
    new teamModel({ code: "ir", name: 'Iran', group:'B'}),
    new teamModel({ code: "us", name: 'USA', group:'B'}),
    new teamModel({ code: "gb-wls", name: 'Walia', group:'B'}),
    
    new teamModel({ code: "ar", name: 'Argentyna', group:'C'}),
    new teamModel({ code: "sa", name: 'Arabia Saud.', group:'C'}),
    new teamModel({ code: "mx", name: 'Meksyk', group:'C'}),
    new teamModel({ code: "pl", name: 'Polska', group:'C'}),
    
    new teamModel({ code: "fr", name: 'Francja', group:'D'}),
    new teamModel({ code: "dk", name: 'Dania', group:'D'}),
    new teamModel({ code: "tn", name: 'Tunezja', group:'D'}),
    new teamModel({ code: "au", name: 'Australia', group:'D'}),

    new teamModel({ code: "es", name: 'Hiszpania', group:'E'}),
    new teamModel({ code: "de", name: 'Niemcy', group:'E'}),
    new teamModel({ code: "jp", name: 'Japonia', group:'E'}),
    new teamModel({ code: "cr", name: 'Kostaryka', group:'E'}),

    new teamModel({ code: "be", name: 'Belgia', group:'F'}),
    new teamModel({ code: "ca", name: 'Kanada', group:'F'}),
    new teamModel({ code: "ma", name: 'Maroko', group:'F'}),
    new teamModel({ code: "hr", name: 'Chorwacja', group:'F'}),

    new teamModel({ code: "br", name: 'Brazylia', group:'G'}),
    new teamModel({ code: "rs", name: 'Serbia', group:'G'}),
    new teamModel({ code: "ch", name: 'Szwajcaria', group:'G'}),
    new teamModel({ code: "cm", name: 'Kamerun', group:'G'}),

    new teamModel({ code: "pt", name: 'Portugalia', group:'H'}),
    new teamModel({ code: "gh", name: 'Ghana', group:'H'}),
    new teamModel({ code: "uy", name: 'Urugwaj', group:'H'}),
    new teamModel({ code: "kr", name: 'Korea Poł.', group:'H'}),
]

teams.forEach(entity => {
    entity.save(function(err, team) {
        if (err) return console.error(err);
        console.log(team.name +" inserted successfully!");
      });
});
