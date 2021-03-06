import "./style.sass";
import Data from '../data.json';

/**
 * @description IIFE Anonymous function
 */
(function() {
  let activityTimeframeElem = document.querySelector('.ttdash__timeframe-btn-weekly');
  let activityTimeframe = 'weekly';
  let activityCards = {}

  // set listener for each timeframe button
  function setListeners() {
    const timeframeBtns = document.querySelectorAll('.ttdash__timeframe-btns');
    timeframeBtns.forEach(btn => btn.addEventListener('click', toggleBtn))
  }

  // Toggle the buttons on and off
  function toggleBtn(e) {
    e.preventDefault();
    activityTimeframeElem.removeAttribute('disabled');
    activityTimeframeElem.classList.toggle('ttdash__btn-active');
    activityTimeframeElem = e.srcElement;
    activityTimeframe = e.srcElement.dataset.timeframe;
    activityTimeframeElem.classList.toggle('ttdash__btn-active');
    e.srcElement.setAttribute('disabled', true);

    // Update the cards info
    updateActivityCards(e.srcElement.dataset.timeframe);
  }

  // Grab all the card elements to update
  function prepCardElements() {
    const activityElements = document.querySelectorAll('.ttdash__times-list-item');

    /**
     * Loop through elements to create an object
     * the object keys are the name of each acitivty which stores an object
     * the acivity object has two properties, 'current' and 'previous'
     * each property stores the corresponding HTML element to update.
     */
    activityElements.forEach(activity => {
      activityCards[activity.parentElement.dataset.cardActivity] = {
        ...activityCards[activity.parentElement.dataset.cardActivity],
        [activity.dataset.time]: activity,
      }
    });
  }

  // Loop through each activity card to update its information
  function updateActivityCards(timeframe) {
    Data.forEach(activity => {
      let currentTime = (activity.timeframes[activityTimeframe].current > 1)
                          ? activity.timeframes[activityTimeframe].current + 'hrs'
                          : activity.timeframes[activityTimeframe].current + 'hr';
      let timeframe = (activityTimeframe === 'daily')
                      ? 'Day - '
                      : (activityTimeframe === 'weekly')
                        ? 'Week - '
                        : 'Month - ';
      let hours = (activity.timeframes[activityTimeframe].previous > 1) ? 'hrs' : 'hr';
      let previousTime = 'Last ' + timeframe + activity.timeframes[activityTimeframe].previous + hours;
      activityCards[activity.title.toLowerCase()].current.textContent = currentTime;
      activityCards[activity.title.toLowerCase()].previous.textContent = previousTime;
    });
  }

  setListeners();
  prepCardElements();
}());
