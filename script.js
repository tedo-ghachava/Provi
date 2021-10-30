function getElementY(query) {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
  }
  
  function doScrolling(element, duration) {
      var startingY = window.pageYOffset
    var elementY = getElementY(element)
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
    var diff = targetY - startingY
    var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
    var start
  
    if (!diff) return
      window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp
      var time = timestamp - start
      var percent = Math.min(time / duration, 1)
      percent = easing(percent)
  
      window.scrollTo(0, startingY + diff * percent)
  
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  }

  var nav = document.querySelectorAll('.navigation .nav-ul li')
  
  for (var i = 0; i < nav.length; i++) {
      const el = nav[i]
      const target = el.getAttribute('target')

      if (target) {
          el.addEventListener('click', doScrolling.bind(null, '#' + target, 1000))
      }
  }