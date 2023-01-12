import React, {useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [playlist, setPlaylist] = useState([]);
	let [positionList, setPositionList] = useState(0);
	const [iconAudio, setIconAudio] = useState("fa fa-play");
	let [songName, setSongName] = useState("");
	let songUrl = useRef();

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
		.then((response) => {return response.json()
		})
		.then((data) => {
			return setPlaylist(data) 
		})
	}, []);



	function selectSong(url, index){

		if(songUrl.current.paused){
			songUrl.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
			songUrl.current.play();
			setIconAudio("fa fa-pause");
		}else{
			songUrl.current.pause();
			setIconAudio("fa fa-play");
		}		
		setPositionList(index);
						
	}

	function controlAudio(){
		if (songUrl.current.paused) {
			songUrl.current.play();
			setIconAudio("fa fa-pause");
		} else {
			songUrl.current.pause();
			setIconAudio("fa fa-play");
		}
		
	}

	

	function atras(){
		setPositionList(positionList--);
		if (positionList > 0) {
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();
		console.log(positionList);
	} else {
		console.log("no hay mas canciones");
	}
	}

	function adelante(){
		if (positionList < (playlist.length - 1)) {
		setPositionList(positionList++);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();

	} else {
		console.log("no hay mas canciones");
	}
	
	}

	function cambiarVolumen(volumen){
		songUrl.current.volume = volumen / 100;
	}

	return (
		<>
		<div className="container w-50">
		
		<div className="list-group bg-dark rounded-0">
			{playlist.map((song,index) => <button className="btn btn-dark text-start rounded-0" onClick={() => selectSong(song.url,index)} type="button" key={index}>{index} {song.name} -</button>)}
		</div>
	
		<div className="d-flex justify-content-center bg-dark border-top">
			<div className="mt-3">
				<div className="text-white text-center ">
					<h5 className="fw-ligh">{songName}</h5>
				</div>
				<div>
		<audio ref={songUrl} id="reproductor"/>	
		<button type="button" onClick={atras}  className="btn btn-light btn-lg mx-3 mb-3"><i className="fa fa-backward"></i></button> 
		<button type="button" onClick={controlAudio} className="btn btn-light btn-lg mx-3 mb-3"><i className={iconAudio}></i></button>
		<button type="button"  onClick={adelante} className="btn btn-light btn-lg mx-3 mb-3"><i className="fa fa-forward"></i></button>
		</div>

		<div className="mb-3">
		
		
			<div className="range ">
  		<input type="range" className="form-range" min="0" max="100" onChange={(e) => cambiarVolumen(e.target.value)} id="customRange1" />
			</div>

	</div>
		
		</div>		
	</div>

	
		
		</div>
		
		</>
	);
};

export default Home;
