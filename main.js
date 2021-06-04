prediction = "";

Webcam.set({
    width: 400,
    height: 350,
    image_format: 'png',
    png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GbKpDU_bT/.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('caaptured_image');
    classifier.classify(img, gotResult);
}

function gotResult(){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = result[0].label;
    prediction = results[0].label;
    }
    speak();
    if(results[0].label == "Amazing"){
        document.getElementById("update_gesture").innerHTML = "Amazing + ";
    }
    if(results[0].label == "Best"){
        document.getElementById("update_gesture").innerHTML = "Best +";
    }
    if(results[0].label == "Victory"){
        document.getElementById("update_gesture").innerHTML = "Victory +";
    }
    if(results[0].label == "Dislike"){
        document.getElementById("update_gesture").innerHTML = "Dislike +";
    }
    if(results[0].label == "Raised hand"){
        document.getElementById("update_gesture").innerHTML = "Raised hand +";
    }
    if(results[0].label == "Left-facing fist"){
        document.getElementById("update_gesture").innerHTML = "Left-facing fist +";
    }
    if(results[0].label == "Right-facing fist"){
        document.getElementById("update_gusture").innerHTML = "Right-facing fist +";
    }
}