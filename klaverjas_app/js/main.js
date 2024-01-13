function newGame() {
  confirmTitle = 'Een nieuw potje starten?';
  confirmText = 'De huidige scores worden gewist.';

  Swal.fire({
    title: confirmTitle,
    text: confirmText,
    showCancelButton: true,
    confirmButtonText: 'Ja',
    cancelButtonText: 'Nee',
  }).then((result) => {

    if (result.isConfirmed
    ) {
      //localStorage.clear();
      localStorage.removeItem('round');
      localStorage.removeItem('scoreWij');
      localStorage.removeItem('scoreZij');
      localStorage.removeItem('roemWij');
      localStorage.removeItem('roemZij');
      location.reload();
      scroll(0, 0);
    }
  })
}

function validate() {
  var currRound = 1;
  if (localStorage.getItem("round")) {
    currRound = localStorage.getItem("round");
  }

  if (currRound>16) {
    Swal.fire('Spel afgelopen', 'Start eerst een nieuw spel.', 'error');
    return false;
  }

  return true;

}

function next_round() {
  if (validate()) {
    var currRound = 1;
    if (localStorage.getItem("round")) {
      currRound = localStorage.getItem("round");
    }

    if (document.getElementById("scoreWij").value.length == 0 && document.getElementById("scoreZij").value.length == 0) {
      Swal.fire('Geen punten ingevuld', 'Vul eerst de behaalde punten in en probeer het opnieuw.', 'error');
      return;
    }

    // Swal.fire({
    //   title: 'Score van ronde ' + currRound + ' toevoegen?',
    //   text: 'Hierna nog ' + (16 - currRound) + ' ronden te gaan.',
    //   showCancelButton: true,
    //   confirmButtonText: 'Ja',
    //   cancelButtonText: 'Nee',
    // }).then((result) => {
    //   if (result.isConfirmed
    //   ) {
    //     addRound();
    //   }
    // })

    addRound();


  }
}


function addRound() {
  if (localStorage.getItem("round") === null) {
    var currRound = 1;
  } else {
    var currRound = localStorage.getItem("round");
  }

  if (currRound<=16) {
    var options = {
      duration: 3,
      useGrouping: false,
      startVal: parseInt(currRound),
    };
    var roundDisplay = new countUp.CountUp('roundDisplay', parseInt(currRound) + 1, options);
    if (!roundDisplay.error) {
      roundDisplay.start();
    } else {
      console.error(roundDisplay.error);
    }

    localStorage.setItem("round", parseInt(currRound) + 1);
  }

  var scoreWijArr = [];
  var scoreWij = document.getElementById("scoreWij").value;
  if (localStorage.getItem("scoreWij") !== null) {
    scoreWijArr = JSON.parse(localStorage.getItem("scoreWij"));
  }
  scoreWijArr.push(scoreWij);
  localStorage.setItem("scoreWij", JSON.stringify(scoreWijArr));

  var scoreZijArr = [];
  var scoreZij = document.getElementById("scoreZij").value;
  if (localStorage.getItem("scoreZij") !== null) {
    scoreZijArr = JSON.parse(localStorage.getItem("scoreZij"));
  }
  scoreZijArr.push(scoreZij);
  localStorage.setItem("scoreZij", JSON.stringify(scoreZijArr));

  var roemWijArr = [];
  var roemWij = document.getElementById("roemWij").value;
  if (localStorage.getItem("roemWij") !== null) {
    roemWijArr = JSON.parse(localStorage.getItem("roemWij"));
  }
  roemWijArr.push(roemWij);
  localStorage.setItem("roemWij", JSON.stringify(roemWijArr));

  var roemZijArr = [];
  var roemZij = document.getElementById("roemZij").value;
  if (localStorage.getItem("roemZij") !== null) {
    roemZijArr = JSON.parse(localStorage.getItem("roemZij"));
  }
  roemZijArr.push(roemZij);
  localStorage.setItem("roemZij", JSON.stringify(roemZijArr));

  // velden leegmaken
  document.getElementById("scoreWij").value = '';
  document.getElementById("scoreZij").value = '';
  document.getElementById("roemWij").value = '';
  document.getElementById("roemZij").value = '';
  setScores();
  set_active_player();
  if (currRound == 16) {
    finished();
  }

}

function calcScore(partij) {
  if (partij == 'wij') {
    var wij = document.getElementById("scoreWij").value;
    document.getElementById("scoreZij").value = (162 - wij);
  } else if (partij == 'zij') {
    var zij = document.getElementById("scoreZij").value;
    document.getElementById("scoreWij").value = (162 - zij);
  }
}

function setScores() {
  var scoreWij = JSON.parse(localStorage.getItem("scoreWij"));
  var scoreZij = JSON.parse(localStorage.getItem("scoreZij"));
  var roemWij = JSON.parse(localStorage.getItem("roemWij"));
  var roemZij = JSON.parse(localStorage.getItem("roemZij"));
  var totaalScoreWij = 0;
  var totaalScoreZij = 0;
  var totaalRoemWij = 0;
  var totaalRoemZij = 0;
  var totaalScoreWijBefore = 0;
  var totaalScoreZijBefore = 0;

  scoreWij.forEach(function (item, index) {
    round = index + 1;
    if (!item) {
      item = 0;
    }
    totaalScoreWij = totaalScoreWij + parseInt(item);
    if ((round % 4) == 0) {
      document.getElementById('tussenstandScoreWij' + round).innerText = totaalScoreWij;
    }
    document.getElementById('scoreWijR' + round).innerText = item;
  });

  scoreZij.forEach(function (item, index) {
    round = index + 1;
    if (!item) {
      item = 0;
    }
    totaalScoreZij = totaalScoreZij + parseInt(item);

    if ((round % 4) == 0) {
      document.getElementById('tussenstandScoreZij' + round).innerText = totaalScoreZij;
    }
    document.getElementById('scoreZijR' + round).innerText = item;
  });

  roemWij.forEach(function (item, index) {
    round = index + 1;
    if (!item) {
      item = 0;
    }
    totaalRoemWij = totaalRoemWij + parseInt(item);
    totaalScoreWij = totaalScoreWij + parseInt(item);

    if ((round % 4) == 0) {
      document.getElementById('tussenstandRoemWij' + round).innerText = totaalRoemWij;
    }
    document.getElementById('roemWijR' + round).innerText = item;
  });

  roemZij.forEach(function (item, index) {
    round = index + 1;
    if (!item) {
      item = 0;
    }
    totaalRoemZij = totaalRoemZij + parseInt(item);
    totaalScoreZij = totaalScoreZij + parseInt(item);

    if ((round % 4) == 0) {
      document.getElementById('tussenstandRoemZij' + round).innerText = totaalRoemZij;
    }
    document.getElementById('roemZijR' + round).innerText = item;
  });

  if (document.getElementById("totalScoreWij").value) {
    totaalScoreWijBefore = document.getElementById("totalScoreWij").value;
  }
  if (document.getElementById("totalScoreZij").value) {
    totaalScoreZijBefore = document.getElementById("totalScoreZij").value;
  }

  document.getElementById("totalScoreWij").value = totaalScoreWij;
  document.getElementById("totalScoreZij").value = totaalScoreZij;

  var options = {
    duration: 0.5,
    useGrouping: false,
    startVal: totaalScoreWijBefore,
  };
  var totalWij = new countUp.CountUp('totalWij', totaalScoreWij, options);
  if (!totalWij.error) {
    totalWij.start();
  } else {
    console.error(totalWij.error);
  }

  var options = {
    duration: 0.5,
    useGrouping: false,
    startVal: totaalScoreZijBefore,
  };
  var totalZij = new countUp.CountUp('totalZij', totaalScoreZij, options);
  if (!totalZij.error) {
    totalZij.start();
  } else {
    console.error(totalZij.error);
  }

}

function nat(partij) {
  if (validate()) {
    // Swal.fire({
    //   title: initCap(partij) + ' zijn nat. De score verwerken?',
    //   text: 'De tegenpartij krijgt alle punten en roem.',
    //   showCancelButton: true,
    //   confirmButtonText: 'Ja',
    //   cancelButtonText: 'Nee',
    // }).then((result) => {
    //   if (result.isConfirmed
    //   ) {
        var roemWij = 0;
        var roemZij = 0;
        if (document.getElementById("roemWij").value) {
          var roemWij = document.getElementById("roemWij").value;
        }
        if (document.getElementById("roemZij").value) {
          var roemZij = document.getElementById("roemZij").value;
        }
        if (partij == 'wij') {
          document.getElementById("scoreWij").value = 0;
          document.getElementById("scoreZij").value = 162;
          document.getElementById("roemWij").value = 0;
          document.getElementById("roemZij").value = parseInt(roemWij) + parseInt(roemZij);

        } else if (partij == 'zij') {
          document.getElementById("scoreZij").value = 0;
          document.getElementById("scoreWij").value = 162;
          document.getElementById("roemZij").value = 0;
          document.getElementById("roemWij").value = parseInt(roemWij) + parseInt(roemZij);
        }
        addRound();
    //   }
    // })
  }

}

function verzaakt(partij) {
  if (validate()) {
    // Swal.fire({
    //   title: initCap(partij) + ' hebben verzaakt. De score verwerken?',
    //   text: 'De tegenpartij krijgt alle punten +100 strafpunten en alle roem.',
    //   showCancelButton: true,
    //   confirmButtonText: 'Ja',
    //   cancelButtonText: 'Nee',
    // }).then((result) => {
    //   if (result.isConfirmed
    //   ) {
        var roemWij = 0;
        var roemZij = 0;
        if (document.getElementById("roemWij").value) {
          var roemWij = document.getElementById("roemWij").value;
        }
        if (document.getElementById("roemZij").value) {
          var roemZij = document.getElementById("roemZij").value;
        }
        if (partij == 'wij') {
          document.getElementById("scoreWij").value = 0;
          document.getElementById("scoreZij").value = 262;
          document.getElementById("roemWij").value = 0;
          document.getElementById("roemZij").value = parseInt(roemWij) + parseInt(roemZij);

        } else if (partij == 'zij') {
          document.getElementById("scoreZij").value = 0;
          document.getElementById("scoreWij").value = 262;
          document.getElementById("roemZij").value = 0;
          document.getElementById("roemWij").value = parseInt(roemWij) + parseInt(roemZij);
        }
        addRound();
    //   }
    // })
  }
}


function pit(partij) {
  if (validate()) {
    // Swal.fire({
    //   title: initCap(partij) + ' hebben een pit gehaald. De score verwerken?',
    //   text: initCap(partij) + ' hebben alle punten +100 roem bonus.',
    //   showCancelButton: true,
    //   confirmButtonText: 'Ja',
    //   cancelButtonText: 'Nee',
    // }).then((result) => {
      var roemWij = 0;
      var roemZij = 0;
      if (document.getElementById("roemWij").value) {
        var roemWij = document.getElementById("roemWij").value;
      }
      if (document.getElementById("roemZij").value) {
        var roemZij = document.getElementById("roemZij").value;
      }
      if (partij == 'wij') {
        document.getElementById("scoreWij").value = 162;
        document.getElementById("scoreZij").value = 0;
        document.getElementById("roemWij").value = parseInt(roemWij) + parseInt(roemZij) + 100;
        document.getElementById("roemZij").value = 0;

      } else if (partij == 'zij') {
        document.getElementById("scoreZij").value = 162;
        document.getElementById("scoreWij").value = 0;
        document.getElementById("roemZij").value = parseInt(roemWij) + parseInt(roemZij) + 100;
        document.getElementById("roemWij").value = 0;
      }
      addRound();
    // })
  }
}

function addRoem(partij, punten) {
  if (partij == 'wij') {
    var roemWij = 0;
    if (document.getElementById("roemWij").value) {
      roemWij = parseInt(document.getElementById("roemWij").value);
    }

    var options = {
      duration: 0.5,
      startVal: roemWij,
    };
    var roem = new countUp.CountUp('roemWij', roemWij + punten, options);
    if (!roem.error) {
      roem.start();
    } else {
      console.error(roem.error);
    }
  }

  if (partij == 'zij') {
    var roemZij = 0;
    if (document.getElementById("roemZij").value) {
      roemZij = parseInt(document.getElementById("roemZij").value);
    }

    var options = {
      duration: 0.5,
      startVal: roemZij,
    };
    var roem = new countUp.CountUp('roemZij', roemZij + punten, options);
    if (!roem.error) {
      roem.start();
    } else {
      console.error(roem.error);
    }
  }
}

function init() {
  if (localStorage.getItem("round") !== null) {
    var round = localStorage.getItem("round");
    document.getElementById("roundDisplay").innerText = parseInt(round);
  } else {
    var round = 1;
  }

  renderScoreTable();

  if (localStorage.getItem("scoreWij") !== null) {
    setScores();
  }

  set_active_player();

}

function renderScoreTable() {
  var str = '';
  for (i = 1; i<=16; i++) {
    str = str + '<tr><td>' + i + '</td><td id="scoreWijR' + i + '">-</td><td id="roemWijR' + i + '">-</td><td id="scoreZijR' + i + '">-</td><td id="roemZijR' + i + '">-</td></tr>';
    if ((i % 4) == 0) {
      str = str + '<tr><td class="tussenstand"></td><td class="tussenstand" id="tussenstandScoreWij' + i + '">-</td><td class="tussenstand" id="tussenstandRoemWij' + i + '">-</td><td class="tussenstand" id="tussenstandScoreZij' + i + '">-</td><td class="tussenstand" id="tussenstandRoemZij' + i + '">-</td></tr>';
    }
  }
  document.getElementById("scoreTable").outerHTML = str;
}

function initCap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetRound() {
  if (localStorage.getItem("round") === null) {
    var currRound = 1;
  } else {
    var currRound = localStorage.getItem("round");
  }

  if (currRound>1) {
    // confirmTitle = 'Score van ronde ' + (currRound - 1) + ' verwijderen?';
    // confirmText = 'Alle punten van ronde ' + (currRound - 1) + ' worden gewist';

    // Swal.fire({
    //   title: confirmTitle,
    //   text: confirmText,
    //   showCancelButton: true,
    //   confirmButtonText: 'Ja',
    //   cancelButtonText: 'Nee',
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed
    //   ) {
        //Swal.fire('De score van ronde ' + currRound + ' is toegevoegd.', '', 'success');
        var scoreWij = JSON.parse(localStorage.getItem("scoreWij"));
        var scoreZij = JSON.parse(localStorage.getItem("scoreZij"));
        var roemWij = JSON.parse(localStorage.getItem("roemWij"));
        var roemZij = JSON.parse(localStorage.getItem("roemZij"));
        scoreWij.pop();
        scoreZij.pop();
        roemWij.pop();
        roemZij.pop();
        localStorage.setItem("scoreWij", JSON.stringify(scoreWij));
        localStorage.setItem("scoreZij", JSON.stringify(scoreZij));
        localStorage.setItem("roemWij", JSON.stringify(roemWij));
        localStorage.setItem("roemZij", JSON.stringify(roemZij));
        localStorage.setItem("round", currRound - 1);
        location.reload();
    //   }
    // })
  } else {
    Swal.fire('Nog geen scores aanwezig', 'Er zijn nog geen scores aanwezig om te wissen.', 'error');
  }

}

function getTotal(keyName) {
  var total = 0;
  var scoreArray = JSON.parse(localStorage.getItem(keyName));
  scoreArray.forEach(function (item, index) {
    if (!isNaN(parseInt(item))) {
      total = total + parseInt(item);
    }
  });

  return total
}

function finished() {

  totalWij = getTotal("roemWij") + getTotal("scoreWij");
  totalZij = getTotal("roemZij") + getTotal("scoreZij");

  if (totalWij>totalZij) {
    partij = 'Wij';
  } else if (totalWij<totalZij) {
    partij = 'Zij';
  } else {
    partij = 'Gelijk';
  }

  if (partij != 'Gelijk') {
    confirmTitle = partij + ' hebben gewonnen.';
    confirmText = 'Wat wil je doen?';
  } else {
    confirmTitle = 'Gelijk spel!';
    confirmText = 'Wat wil je doen?';
  }

  Swal.fire({
    title: confirmTitle,
    text: confirmText,
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Nieuw spel starten',
    cancelButtonText: 'Score bekijken',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed
    ) {
      newGame();
    }
  })
}

async function show_players() {
  // console.log("test1");
  // if (localStorage.getItem("speler1") !== null) {
  //   var speler1 = localStorage.getItem("speler1");
  //   document.getElementById("player-input1").value = speler1;
  // }

  var speler1 = '';
  if (localStorage.getItem("speler1") !== null) {
    speler1 = localStorage.getItem("speler1");
  }
  var speler2 = '';
  if (localStorage.getItem("speler2") !== null) {
    speler2 = localStorage.getItem("speler2");
  }
  var speler3 = '';
  if (localStorage.getItem("speler3") !== null) {
    speler3 = localStorage.getItem("speler3");
  }
  var speler4 = '';
  if (localStorage.getItem("speler4") !== null) {
    speler4 = localStorage.getItem("speler4");
  }

  const {value: playerValues} = await Swal.fire({
    title: 'Spelers',
    html:
      'Houd bij wie troef kiest' +
      '<input id="player-input1" class="swal2-input" placeholder="naam speler 1" value="' + speler1 + '">' +
      '<input id="player-input2" class="swal2-input" placeholder="naam speler 2" value="' + speler2 + '">' +
      '<input id="player-input3" class="swal2-input" placeholder="naam speler 3" value="' + speler3 + '">' +
      '<input id="player-input4" class="swal2-input" placeholder="naam speler 4" value="' + speler4 + '">',
    focusConfirm: false,
    confirmButtonText: 'Opslaan',
    preConfirm: () => {
      return [
        document.getElementById('player-input1').value,
        document.getElementById('player-input2').value,
        document.getElementById('player-input3').value,
        document.getElementById('player-input4').value
      ]
    }
  })


  if (playerValues) {
    if (playerValues[0] !== '') {
      localStorage.setItem("speler1", playerValues[0]);
    }
    if (playerValues[1] !== '') {
      localStorage.setItem("speler2", playerValues[1]);
    }
    if (playerValues[2] !== '') {
      localStorage.setItem("speler3", playerValues[2]);
    }
    if (playerValues[3] !== '') {
      localStorage.setItem("speler4", playerValues[3]);
    }
    set_active_player();
  }
}

function set_active_player() {
  if (localStorage.getItem("speler1") !== null) {
    if (localStorage.getItem("round") !== null) {
      var round = parseInt(localStorage.getItem("round"));
    } else {
      var round = 1;
    }

    var playerNumber = round % 4;
    if (playerNumber == 0) {
      playerNumber = 4;
    }
    //playerNumber = playerNumber + 1;
    var key = "speler" + playerNumber;
    var speler = localStorage.getItem(key);

    var html = '<div class="player">' +
      '<span class="player__name" id="active-player">' + speler + '</span>&nbsp; kiest troef' +
      '</div>';
    document.getElementById("player-wrapper").innerHTML = html;
  }
}