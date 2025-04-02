fetch('closed.svg')
  .then(response => response.text())
  .then(svg => {
    document.getElementById('svg-logo').innerHTML = svg;
  });
