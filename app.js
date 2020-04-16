let DataController = (function () {
  let data = {
    goals: [],
  };

  function deleteGoal() {
    console.log('deleted');
  }

  function getData() {
    return JSON.parse(localStorage.getItem('goals')) || [];
  }

  function storeData(input) {
    data.goals.push(input);
    localStorage.setItem('goals', JSON.stringify(data));
  }
  return {
    data: data,
    storeData: storeData,
    getData: getData,
    deleteGoal: deleteGoal,
  };
})();

let UIcontroller = (function () {
  let DOMstrings = {
    form: '.form',
    goal: '#goal',
    date: '#date',
    output: '.output',
    card: '.card',
    deleteBtn: 'delete-btn',
  };

  let formatDate = function (date) {
    let day, month, year, months;

    months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    date = date.split('-');
    year = date[0];
    month = parseInt(date[1]) - 1;
    month = months[month];
    day = date[2];

    return `${month} ${day} ${year}`;
  };
  return {
    DOM: DOMstrings,

    displayStoredGoals: function (store) {
      let html;

      // store

      let storeArr = store.goals;

      storeArr.forEach((goals) => {
        html = `<div class="card"><button class="delete-btn">x</button><ul><li>Goal: %goal%</li><li>Deadline: %date%</li></ul></div>`;
        html = html.replace('%goal%', goals.goal);
        html = html.replace('%date%', formatDate(goals.date));
        document.querySelector(DOMstrings.output).innerHTML += html;
      });
    },
    displayInput: function (input) {
      let html;
      console.log(formatDate(input.date));

      if (input.goal === '' || input.date === '') {
        return;
      } else {
        html = `<div class="card"><button class="delete-btn">x</button>
        <ul><li>Goal: %goal%</li><li>Deadline: %date%</li></ul></div>`;

        html = html.replace('%goal%', input.goal);
        html = html.replace('%date%', formatDate(input.date));
        document.querySelector(DOMstrings.output).innerHTML += html;
      }
    },

    clearInput: function () {
      let fields = document.querySelectorAll(
        `${DOMstrings.goal}, ${DOMstrings.date}`
      );
      console.log(fields);
      let fieldsArr = Array.prototype.slice.call(fields);

      console.log(fieldsArr);

      fieldsArr.forEach((cur) => {
        cur.value = '';
      });
    },

    deleteGoal: function () {},
  };
})();

let Globalcontroller = (function (UIctrl, Datactrl) {
  let DOM = UIctrl.DOM;

  let store = Datactrl.getData();
  if (store.length !== 0) {
    UIctrl.displayStoredGoals(store);
  }

  function setUpEventListeners() {
    // 1. Event listener on the form
    document.querySelector(DOM.form).addEventListener('submit', (e) => {
      e.preventDefault();

      // 2. Grab input
      let input = {
        goal: document.querySelector(DOM.goal).value,
        date: document.querySelector(DOM.date).value,
      };
      // 3. store it in DataController
      Datactrl.storeData(input);

      // 4. Display input in the UI

      UIctrl.displayInput(input);

      //   5. Clear the fields
      UIctrl.clearInput();
    });
  }

  // Delete goal event listener
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains(DOM.deleteBtn)) {
      let card = e.target.parentNode;
      card.parentNode.removeChild(card);
    }
  });

  return {
    init: setUpEventListeners,
  };
})(UIcontroller, DataController);

Globalcontroller.init();

// When the app intializes display the stored goals
