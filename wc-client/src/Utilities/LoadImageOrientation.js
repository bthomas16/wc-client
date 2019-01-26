const LoadImageOrientation = function (file) {
  loadImage(
    file,
    function (img) {
      // base64 data result
      console.log('here is the img', img)
      document.body.appendChild(img)
    },
    {
      canvas: true,
      orientation: true
    }
  )
}

export default { LoadImageOrientation }
