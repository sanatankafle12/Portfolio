
element.addEventListener('gesturestart', handleGestureStart);
element.addEventListener('gesturechange', handleGestureChange);
element.addEventListener('gestureend', handleGestureEnd);

function handleGestureStart(event) {
  console.log('Gesture started');
  event.preventDefault();
}

// Event handler for the gesturechange event
function handleGestureChange(event) {
  console.log('Gesture changed');
  console.log('Scale:', event.scale);
  console.log('Rotation:', event.rotation);
  console.log('Velocity (X):', event.velocityX);
  console.log('Velocity (Y):', event.velocityY);
  event.preventDefault();
}

// Event handler for the gestureend event
function handleGestureEnd(event) {
  console.log('Gesture ended');
  event.preventDefault();
}