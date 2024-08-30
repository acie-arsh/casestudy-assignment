import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "./ProfileList.css";
import 'mapbox-gl/dist/mapbox-gl.css';


const initialProfiles = [
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
        description: "At 46 years of age, Nikhil is a veteran chef!",
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
    const[profiles, setProfiles] = useState(initialProfiles); //used to update the dataset array

    const [showSummaryModal, setshowSummaryModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null); //for summary modal display
    
    const [isAdmin, setIsAdmin] = useState(false);  
    const [adminPassword, setAdminPassword] = useState(''); //for admin login

    const [showAddModal, setShowAddModal] = useState(false);
    const [count, setCount] = useState(5);

    const handleSummaryClick = (profile) => {
        setSelectedProfile(profile);
        setshowSummaryModal(true);
    }

    const handleCloseSummaryModal = () => {
        setshowSummaryModal(false);
        setSelectedProfile(null);
    }


    const handlePasswordChange = (e) => {
        setAdminPassword(e.target.value);
    }

    const handleAdminLogin = () => {
        if (adminPassword === 'water') {
            setIsAdmin(true);
        } else {
            alert('Incorrect Password');
        }
    }

    const handleAddProfile = () => {
        setShowAddModal(true);
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    }

    const handleSaveProfile = (newProfile) => {
        setProfiles([...profiles, newProfile]);
        setCount(count + 1);
        setShowAddModal(false);
    }

    const handleDeleteProfile = (id) => {
        if(!window.confirm("Are you sure about that?")){
            return;
        }
        setProfiles(prevProfiles => {
            const updatedProfiles = prevProfiles.filter(profile => profile.id !== id);
            return updatedProfiles;
        });
        setCount(prevCount => prevCount - 1);
    }
    
    return(
        <div className="container">
            
            {!isAdmin && (
                <div className="adminLogin">
                    <input
                        type="password"
                        placeholder="Type 'water'"
                        value={adminPassword}
                        onChange={handlePasswordChange}
                    />
                    <button onClick={handleAdminLogin}>Login</button>
                </div>
            )}

            {isAdmin && (
                <button className="decorBtn" onClick={handleAddProfile}>Add Profile</button>
            )}
            
            {profiles.map((profile) => (
                <div key={profile.id} className="profileSmall">
                    <img src={profile.photo} alt={profile.name} className="profilePhoto" height="60" width="60"/>
                    <h3 className="profileSmallName">{profile.name}</h3>
                    <p className="profileSmallDesc">{profile.description}</p>
                    {isAdmin && (
                        <>
                            <button>Edit</button>
                            <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
                        </>
                    )}
                    <button onClick={() => handleSummaryClick(profile)}>SUMMARY</button>
                </div>
            ))}

            {showSummaryModal && (
                <SummaryModal profile={selectedProfile} onClose={handleCloseSummaryModal} />
            )}

            {showAddModal && (
                <AddModal count={count} onSave={handleSaveProfile} onClose={handleCloseAddModal} />
            )}
        </div>
    );
}


function AddModal({count, onSave, onClose}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('https://placehold.co/60x60');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [interests, setInterests] = useState('');
    const [maplat, setMaplat] = useState('');
    const [maplng, setMaplng] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProfile = {
            id: count + 1,
            name,
            description,
            photo,
            location,
            contact,
            interests: interests.split(','),
            maplat: parseFloat(maplat),
            maplng: parseFloat(maplng),
        };

        onSave(newProfile);
    }

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button onClick={onClose} className='modalCloseButton'>X</button>
                <h1>Add New Profile</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="text" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                    <input type="text" placeholder="Interests (comma separated)" value={interests} onChange={(e) => setInterests(e.target.value)} />
                    <input type="text" placeholder="Latitude" value={maplat} onChange={(e) => setMaplat(e.target.value)} required />
                    <input type="text" placeholder="Longitude" value={maplng} onChange={(e) => setMaplng(e.target.value)} required />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

function SummaryModal({profile,onClose}){
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWNpZS1hcnNoIiwiYSI6ImNtMGdiZmdsMjBzMDMyanM3d2d0YW44aHAifQ.D0v1OnVBLTKFoAIKRFHwAA';

    const mapContainer = useRef(null);

    const [lng] = useState(profile.maplng);
    const [lat] = useState(profile.maplat);
    const [zoom] = useState(18);

    useEffect(() => {
        
        const geoJson = {
            type: "FeatureCollection",
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [lng,lat]
                    },
                    properties: {
                        title: profile.name,
                        description: profile.location
                    }
                }
            ]
        }
        
        const map = new mapboxgl.Map({
            container : mapContainer.current,
            style : 'mapbox://styles/mapbox/streets-v12',
            center : [lng, lat],
            zoom : zoom
        });

        geoJson.features.map((feature) => (
            new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
        ));

        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        return () => map.remove();
    })
    
    return(
        <div className="modalOverlay">
            <div className="modalContent">
                <button onClick={onClose} className='modalCloseButton'>X</button>
                <h1>{profile.name}'s Location</h1>
                <div className="mapSidebar">
                    Latitude: {lat} | Longitude: {lng}
                </div>
                <div ref={mapContainer} className='mapContainer' />
                
            </div>
        </div>
    );
}
