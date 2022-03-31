// ScrollTrigger
var trigger = new ScrollTrigger.default();
// Counters callback
function animateCallback(trigger) {
  let obj = trigger.element;
  let duration = 2500;
  let start = 0;
  let startTimestamp = null;
  let end = parseInt(obj.innerHTML);

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}


trigger.add('.animate-number', {
  toggle: {
    callback: {
      in: animateCallback
    }
  }
})


let topMenu = document.getElementById("top-menu");
let heroContainer = document.getElementById("hero-container");
let rosetaInfo = document.getElementById("roseta-info");

let mapLayers = {
  "titulos-ouro": ["titulos-ouro"],
  "uc-amazonia-legal": ["uc-amazonia-legal"],
  "ti-amazonia-legal": ["ti-amazonia-legal", "ti-amazonia-legal-linha"],
  "mapbiomas-2020-2": ["mapbiomas-2020-2"],
};


mapboxgl.accessToken = // eslint-disable-line
  "pk.eyJ1IjoiaW5zdGl0dXRvZXNjb2xoYXMiLCJhIjoiY2twOHQ1ZjhrMGJpcTJxbWtqb3gwZHBsNSJ9.OZWZPYM3qCOgwbpwB_SYEQ";


var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/institutoescolhas/cl0338ipt001315o5igwu0e6k', // stylesheet location
  center: [-57.9718977, -5.531561], // starting position [lng, lat]
  zoom: 4.3, // starting zoom
  minZoom: 4,
  maxZoom: 10,
  // maxBounds: [
  //   [-48.7, -25.5], // Southwest coordinates
  //   [-43.5, -22.0], // Northeast coordinates
  // ],
});
map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());
map.on('load', () => {
  map.setLayoutProperty('titulos-ouro','visibility','visible');
  map.setLayoutProperty('uc-amazonia-legal','visibility','none');
  map.setLayoutProperty('ti-amazonia-legal','visibility','none');
  map.setLayoutProperty('ti-amazonia-legal-linha','visibility','none');
  map.setLayoutProperty('mapbiomas-2020-2','visibility','visible');
})



window.addEventListener("scroll", function(){
  var scroll = window.pageYOffset || document.documentElement.scrollTop ||
              document.body.scrollTop || 0;

  heroContainer.style.opacity = Math.max(0, Math.min(1, -scroll / heroContainer.scrollHeight*2 + 1));

  if (window.pageYOffset >= heroContainer.scrollHeight) {
    topMenu.classList.add("visible");
  } else {
    topMenu.classList.remove("visible");
  }
});


document.addEventListener("DOMContentLoaded", function () {

  let infograficoCards = document.querySelectorAll("#infografico .card");
  Array.prototype.forEach.call(infograficoCards, function (el) {
    el.addEventListener('mouseover', function (e) {
      e.preventDefault();
      let element = e.currentTarget;
      element.classList.add('active');
    });
  });

  let circuloElements = document.querySelectorAll("#circulos .circulo-st6");
  Array.prototype.forEach.call(circuloElements, function (el) {
    el.addEventListener("mouseover", function (e) {
      e.preventDefault();
      let element = e.currentTarget;
      let value = element.getAttribute("data-value");
      document.getElementById("circulo-value-0").classList.remove('active');
      // document.getElementById("circulo-origem").classList.remove('active');
      let circuloValue = document.getElementById("circulo-value-" + value);
      // circuloValue.innerHTML = value;
      circuloValue.classList.add('active');
    });
    el.addEventListener("mouseout", function (e) {
      e.preventDefault();
      let element = e.currentTarget;
      let value = element.getAttribute("data-value");
      let circuloValue = document.getElementById("circulo-value-" + value);
      // circuloValue.innerHTML = value;
      circuloValue.classList.remove('active');
      document.getElementById("circulo-value-0").classList.add('active');
      // document.getElementById("circulo-origem").classList.add('active');
    });
  });

  let mapElements = document.querySelectorAll(".map-controls li");
  Array.prototype.forEach.call(mapElements, function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      let element = e.currentTarget;
      let layerId = element.id;

      Array.prototype.forEach.call(mapLayers[layerId], function (layer) {
        var visibility = map.getLayoutProperty(layer, 'visibility');
        if (visibility === 'visible') {
          element.classList.remove('active');
          map.setLayoutProperty(layer, 'visibility', 'none');
        } else {
          element.classList.add('active');
          map.setLayoutProperty(layer, 'visibility', 'visible');
        }
      });

    });
  });

  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {
    numVisible: 3,
    indicators: true
  });

  var rosetaElements = document.querySelectorAll(".tooltip");

  Array.prototype.forEach.call(rosetaElements, function (element) {
    let tooltipId = element.getAttribute("data-tooltip-id");
    let tooltip = document.getElementById(tooltipId);

    element.addEventListener("mousemove", function (e) {
      tooltip.style.top = (element.offsetTop - element.getBoundingClientRect().top + e.clientY + 10) + 'px';
      tooltip.style.left = (element.offsetLeft - element.getBoundingClientRect().left + e.clientX + 10) + 'px';
    });

    element.addEventListener("mouseover", function (e) {
      tooltip.style.opacity = 1;
    });
    element.addEventListener("mouseout", function (e) {
      tooltip.style.opacity = 0;
    });


  });


});

imageMapResize();
