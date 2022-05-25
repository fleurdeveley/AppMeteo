const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let today = new Date();
let options = { weekday: 'long' };
let actualDay = today.toLocaleDateString('fr-FR', options);

actualDay = actualDay.charAt(0).toUpperCase() + actualDay.slice(1);

let tableDaysInOrder = weekDays.slice(weekDays.indexOf(actualDay)).concat(weekDays.slice(0, weekDays.indexOf(actualDay)));
