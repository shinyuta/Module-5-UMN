$(function () {

  let now = dayjs();

  let currentTime = now.format('H');

  // save button, on click, save text.
  // utilise local storage.
  function text() {
    // on click, run function
    $(".saveBtn").on("click", function () {
      let text = $(this).parent().attr("id");
      let input = $(this).siblings(".description").val();
      localStorage.setItem(text, input);
    });
  }

  // toggles classes
  function hours() {
    // goes over every time-block class div
    $(".time-block").each(function () {
      let hourly = parseInt(this.id);
      // based on current time, change class.
      $(this).toggleClass("future", hourly > currentTime);
      $(this).toggleClass("present", hourly == currentTime);
      $(this).toggleClass("past", hourly < currentTime);
    });
  }

  //adds and removes classes based on time (to avoid overlapping)
  function update() {
    // goes over every time-block class div
    $(".time-block").each(function () {
      let hourly = parseInt(this.id);
      if (hourly < currentTime) {
        $(this).removeClass("present future").addClass("past");
      } else if (hourly > currentTime) {
        $(this).removeClass("past present").addClass("future");
      } else {
        $(this).removeClass("past future").addClass("present");
      }
    });
  }

  $(".time-block").each(function () {
    let key = $(this).attr("id");
    let input = localStorage.getItem(key);
    $(this).children(".description").val(input);
  });

  // current day text at top of the screen, using dayJS.format
  $("#currentDay").text(now.format("ddd, MMM D, YYYY"));

  // displays hours time as well as changing messages based on time.
  function onTheClock() {
    // if after 5
    if (currentTime > 17) {
      $("#message").text(`It's currently ${now.format("h:mm A")}, great work today!`)
    // if before 9
    } else if (currentTime < 9) {
      $("#message").text(`It's currently ${now.format("h:mm A")}, have a great day at work!`)
    // else (on the clock)
    } else {
      $("#message").text(`It's currently ${now.format("h:mm A")}, lets get this done (and go home)!`)
    }
  }

  text();
  hours();
  update();
  onTheClock();
});