console.log("welcome to musify")

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')

let  songitem = Array.from(document.getElementsByClassName("songitem"))

let songs=[
    {songName:"still rollin", filepath:"songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName:"saza-e-maut", filepath:"songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName:"tere te", filepath:"songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName:"takeover", filepath:"songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName:"i guess", filepath:"songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName:"janji", filepath:"songs/6.mp3", coverpath: "covers/6.jpg"},
    {songName:"let me love you", filepath:"songs/7.mp3", coverpath: "covers/7.jpg"}
]
songitem.forEach((element,i)=> {
    console.log(element,i)
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].src=songs[i].filepath;
});

//audioElement.play();


//handle play/pause event
masterPlay.addEventListener('click',()=>{
if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;


}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');   
    gif.style.opacity=0;
}
})



//listen to events
audioElement.addEventListener('timeupdate', function () {
      //  console.log('timeupdate');
        //update seekbar
        progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
       // console.log(progress);
        myProgressBar.value=progress;
 
    })
    myProgressBar.addEventListener('change',()=>{
        audioElement.currentTime = myProgressBar.value*audioElement.duration/100; 
    })

    const makeallplays = ()=>{
        Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }
    
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.addEventListener('click', (e)=>{ 
            makeallplays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        })
    })    
    document.getElementById('next').addEventListener('click', ()=>{
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
    })
    
    document.getElementById('previous').addEventListener('click', ()=>{
        if(songIndex<=0){
            songIndex = 0
        }
        else{
            songIndex -= 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })