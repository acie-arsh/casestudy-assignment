import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "./ProfileList.css";

const profiles = [
    {
        id : 1,
        name : "Arsh Chaudhary",
        description: "At 21 years of age, Arsh is an aspiring Computer Science student",
        photo: "https://randomuser.me/api/portraits/lego/0.jpg",
        location:"",
        contact:"",
        interests:[],
        maplat:23.075329205732416,
        maplng:76.85990678949777
    },
    {
        id : 2,
        name : "Kshitij Singh",
        description: "At 21 years of age, Kshitij is an aspiring Computer Science student",
        photo: "https://randomuser.me/api/portraits/lego/5.jpg",
        location:"",
        contact:"",
        interests:[],
        maplat:23.186851512477176, 
        maplng:77.36365066664735
    },
    {
        id : 3,
        name : "Vedang Gupta",
        description: "At 346 years of age, Vedang is an aspiring Computer Science student",
        photo: "https://randomuser.me/api/portraits/lego/6.jpg",
        location:"",
        contact:"",
        interests:[],
        maplat:23.075329205732416,
        maplng:76.85990678949777
    },
    {
        id : 4,
        name : "Nikhil Dulani",
        description: "At 46 years of age, Troy is a veteran chef!",
        photo: "https://randomuser.me/api/portraits/lego/8.jpg",
        location:"",
        contact:"",
        interests:[],
        maplat:52.535143437275224,
        maplng:13.390232712227979
    },
    {
        id : 5,
        name : "Max Dior",
        description: "At 32 years of age, Max is an esteemed businessman!",
        photo: "https://randomuser.me/api/portraits/lego/2.jpg",
        location:"",
        contact:"",
        interests:[],
        maplat:40.76258277036229,
        maplng:-73.97377254612815
    },
]

export default function ProfileList(){
    
    const [showModal, setShowModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleSummaryClick = (profile) => {
        setSelectedProfile(profile);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProfile(null);
    }
    
    return(
        <div className="container">
            {profiles.map((profile) => (
                <div key={profile.id} className="profileSmall">
                    <img src={profile.photo} alt={profile.name} className="profilePhoto" height="40" width="40"/>
                    <h1 className="profileSmallName">{profile.name}</h1>
                    <p className="profileSmallDesc">{profile.description}</p>
                    <button onClick={() => handleSummaryClick(profile)}>Summary</button>
                </div>
            ))}

            {showModal && (
                <Modal profile={selectedProfile} onClose={handleCloseModal} />
            )}
        </div>
    );
}

function Modal({profile,onClose}){
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWNpZS1hcnNoIiwiYSI6ImNtMGdiZmdsMjBzMDMyanM3d2d0YW44aHAifQ.D0v1OnVBLTKFoAIKRFHwAA';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(profile.maplng);
    const [lat, setLat] = useState(profile.maplat);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container : mapContainer.current,
            style : 'mapbox://styles/mapbox/streets-v12',
            center : [lng, lat],
            zoom : zoom
        });
    })
    
    return(
        <div className="modalOverlay">
            <div className="modalContent">
                <h1>{profile.name}'s Location</h1>
                <div ref={mapContainer} className='mapContainer'></div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
