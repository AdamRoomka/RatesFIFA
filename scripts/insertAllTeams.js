require("../DBconnection");

const teamModel = require("../models/teamModel");

var teams = [
  new teamModel({ name: "Katar", group: "A" }),
  new teamModel({ name: "Ekwador", group: "A" }),
  new teamModel({ name: "Senegal", group: "A" }),
  new teamModel({ name: "Holandia", group: "A" }),

  new teamModel({ name: "Anglia", group: "B" }),
  new teamModel({ name: "Iran", group: "B" }),
  new teamModel({ name: "USA", group: "B" }),
  new teamModel({ name: "Walia", group: "B" }),

  new teamModel({ name: "Argentyna", group: "C" }),
  new teamModel({ name: "Arabia Saud.", group: "C" }),
  new teamModel({ name: "Meksyk", group: "C" }),
  new teamModel({ name: "Polska", group: "C" }),

  new teamModel({ name: "Francja", group: "D" }),
  new teamModel({ name: "Dania", group: "D" }),
  new teamModel({ name: "Tunezja", group: "D" }),
  new teamModel({ name: "Australia", group: "D" }),

  new teamModel({ name: "Hiszpania", group: "E" }),
  new teamModel({ name: "Niemcy", group: "E" }),
  new teamModel({ name: "Japonia", group: "E" }),
  new teamModel({ name: "Kostaryka", group: "E" }),

  new teamModel({ name: "Belgia", group: "F" }),
  new teamModel({ name: "Kanada", group: "F" }),
  new teamModel({ name: "Maroko", group: "F" }),
  new teamModel({ name: "Chorwacja", group: "F" }),

  new teamModel({ name: "Brazylia", group: "G" }),
  new teamModel({ name: "Serbia", group: "G" }),
  new teamModel({ name: "Szwajcaria", group: "G" }),
  new teamModel({ name: "Kamerun", group: "G" }),

  new teamModel({ name: "Portugalia", group: "H" }),
  new teamModel({ name: "Ghana", group: "H" }),
  new teamModel({ name: "Urugwaj", group: "H" }),
  new teamModel({ name: "Korea Poł.", group: "H" }),
];

teams.forEach((entity) => {
  entity.save(function (err, team) {
    if (err) return console.error(err);
    console.log(team.name + " inserted successfully!");
  });
});
