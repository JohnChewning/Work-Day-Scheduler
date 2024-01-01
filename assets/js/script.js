// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  
  // Get the current hour of the day using the dayjs library.
  const currentHour = dayjs().format('H');

  //listener for click events on the save button. 
  function userInput() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  //Compares timeblock time with current time to determine whether
  //it is in the past, present, or future 
  $(".time-block").each(function() {
    const timeBlock = $(this).attr("id").split("-")[1];

    if (currentHour == timeBlock) {
      $(this).addClass("present");
      $(this).children(".description").addClass("present");

    } else if (currentHour < timeBlock) {
      $(this).removeClass("present");
      $(this).addClass("future");

    } else if (currentHour > timeBlock) {
      $(this).removeClass("future");
      $(this).addClass("past");
    }
  });
  
  //get any user input that was saved in localStorage and set
  //the values of the corresponding textarea elements. 
  
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

    

  //Displays the current date and time in the header
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  setInterval(updateTime, 1000);

  userInput();

});



