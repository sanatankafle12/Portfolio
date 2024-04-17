function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', function() {
    var button = document.querySelector('.go-up-button');
    if (window.pageYOffset > 100) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });

  
  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      if (tabcontent[i].style.display === "block" && tabcontent[i].id === tabName) {
        tabcontent[i].style.display = "none";
        evt.currentTarget.classList.remove("active");
        return;
      }
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
  
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }

  function openTab(event, tabId) {
    var contentTabs = document.getElementsByClassName('content-tab');
    for (var i = 0; i < contentTabs.length; i++) {
      contentTabs[i].style.display = 'none';
    }

    // Remove 'active' class from all tab links
    var tabLinks = document.getElementsByClassName('tablinks');
    for (var i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove('active');
    }

    // Show the selected content tab
    var selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'block';

    // Add 'active' class to the clicked tab link
    event.currentTarget.classList.add('active');

}

var tabLinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname){
  for(tablink of tabLinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var htabLinks = document.getElementsByClassName('hobbies-tab-links');
var htabcontents = document.getElementsByClassName('hobbies-tab-contents');

function opentab_hobbies(tabname){
  for(tablink of htabLinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of htabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

  var i = 0;
  var txt =
    'Hi!! <br>' +
    'I\'m Sanatan Kafle.<br>' +
    'A Computer Engineer.<br>';
  var speed = 50;

  function typeWriter() {
    if (i < txt.length) {
      if (txt.charAt(i) === '<') {
        // If the current character is "<", skip it to prevent HTML interpretation
        var endIndex = txt.indexOf('>', i);
        document.getElementById('demo').innerHTML += txt.substring(i, endIndex + 1);
        i = endIndex + 1;
      } else {
        document.getElementById('demo').innerHTML += txt.charAt(i);
        i++;
      }
      setTimeout(typeWriter, speed);
    }
  }

  // Call the typeWriter function when the page loads
  window.addEventListener('DOMContentLoaded', function () {
    typeWriter();
  });
