var amon = require('amon').Amon;

amon.log('node.js unset message')
amon.log('node.js debug message', ['Martin' ,'debug', 'development'])
amon.log('node.js warning message', 'warning')
amon.log('node.js info message', 'info')

json={"widget": {"debug": "on", "text": {"vOffset": 100, "style": "bold", "name": "text1", "hOffset": 250, "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;", "data": "Click Here", "alignment": "center", "size": 36}, "window": {"width": 500, "height": 500, "name": "main_window", "title": "Sample Konfabulator Widget"}, "image": {"vOffset": 250, "src": "Images/Sun.png", "alignment": "center", "name": "sun1", "hOffset": 250}}}

amon.log(json)
amon.log(json,'warning')


image_json={
  "Image": {
    "Width":800,
    "Height":600,
    "Title":"View from 15th Floor",
    "Thumbnail":
    {
      "Url":"http:\/\/scd.mm-b1.yimg.com\/image\/481989943",
      "Height": 125,
      "Width": "100"
    }
  }
}

amon.log(image_json, ['Martin','images', 'debug'])

process.addListener('uncaughtException', function(err) {
	amon.handle(err);
});

//try {
  //throw new Error("Test Error 1");
//} catch(error) {
  //console.log("Error occurred ", error.message);
  //Amon.handle(error);
//}


throw new Error("Test Error 2");
