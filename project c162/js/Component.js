AFRAME.registerComponent('throw', {
    init: function () {
        this.createBall()
    },
    createBall: function () {
        window.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                var ball = document.createElement('a-entity')
                console.log('hello')
                ball.setAttribute('geometry', {
                    primitive: 'sphere',
                    radius: 0.1
                })
                ball.setAttribute('material', 'color', 'black')
                var camera = document.querySelector('#camera')
                var position = camera.getAttribute('position')
                ball.setAttribute('position', {
                    x: position.x,
                    y: position.y,
                    z: position.z
                })
                var cam = document.querySelector('#camera').object3D
                var direction = new THREE.Vector3()
                cam.getWorldDirection(direction)

                ball.setAttribute('velocity', direction.multiplyScalar(-5))

                var scene = document.querySelector('#scene')
                ball.setAttribute('dynamic-body', { shape: 'sphere', mass: '0' })
                ball.addEventListener("collide", this.removeBall)
                scene.appendChild(ball)

            }
        })
    },
    removeBall: function (e) {
        //Original entity (bullet)
        console.log(e.detail.target.el);
    
        //Other entity, which bullet touched.
        console.log(e.detail.body.el);
    
        //bullet element
        var element = e.detail.target.el
    
        //element which is hit
        var elementHit = e.detail.body.el
    
        if (elementHit.id.includes("box")) {
          //set material attribute
          elementHit.setAttribute('material', {
            opacity: 1,
            transparent: true
          })
    
          //impulse and point vector
    
          var impulse = new CANNON.Vec3(-2, 2, 1)
          var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'))
          elementHit.body.applyImpulse(impulse, worldPoint)
    
          //remove event listener
         element.removeEventListner('collide',this.shoot)
      
          //remove the bullets from the scene
          var scene=document.querySelector('#scene')
          scene.removeChild(element)
    
        }
      },
    
})