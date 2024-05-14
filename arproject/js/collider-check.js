AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],

  init: function () {
    this.el.addEventListener('raycaster-intersection', function () {
      //alert('Player hit something!');
        entity.getAttribute('class');
    });
  }
});