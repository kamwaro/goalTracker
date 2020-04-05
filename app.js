let DataController = (function () {
  let data = {
    goals: [],
  };

  return {
    data: data,
    getData: function (input) {
      data.goals.push(input);
    },
  };
})();

let UIcontroller = (function () {
  let DOMstrings = {
    form: '.form',
    goal: '#goal',
    date: '#date',
    output: '.output',
  };

  return {
    DOM: DOMstrings,

    displayInput: function (input) {
      let html;
      if (input.goal === '' || input.date === '') {
        return;
      } else {
        html = `<div class="card"><ul><li>Goal: %goal%</li><li>Deadline: %date%</li></ul></div>`;

        html = html.replace('%goal%', input.goal);
        html = html.replace('%date%', input.date);
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
  };
})();

let Globalcontroller = (function (UIctrl, Datactrl) {
  let DOM = UIctrl.DOM;

  function setUpEventListeners() {
    // 1. Set up event listener on form
    document.querySelector(DOM.form).addEventListener('submit', (e) => {
      e.preventDefault();

      // 2. Grab input
      let input = {
        goal: document.querySelector(DOM.goal).value,
        date: document.querySelector(DOM.date).value,
      };
      // 3. store it in DataController
      Datactrl.getData(input);

      // 4. Display input in the UI

      UIctrl.displayInput(input);

      //   5. Clear the fields
      UIctrl.clearInput();
    });
  }

  return {
    init: setUpEventListeners,
  };
})(UIcontroller, DataController);

Globalcontroller.init();
