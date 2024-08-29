import React from "react";
import "./ProfileList.css";

const profiles = [
    {
        id : 1,
        name : "Arsh Chaudhary",
        description: "At 21 years of age, Arsh is an aspiring Computer Science student",
        photo: "https://randomuser.me/api/portraits/lego/0.jpg",
        location:"",
        contact:"",
        interests:[]
    },
    {
        id : 2,
        name : "Kshitij Singh",
        description: "At 21 years of age, Kshitij is an aspiring Computer Science student",
        photo: "https://randomuser.me/api/portraits/lego/5.jpg",
        location:"",
        contact:"",
        interests:[]
    },
    {
        id : 3,
        name : "Vedang Gupta",
        description: "At 21 years of age, Vedang is an aspiring Computer Science student",
        photo: "https://randomuser.me/api/portraits/lego/6.jpg",
        location:"",
        contact:"",
        interests:[]
    },
    {
        id : 4,
        name : "Troy Lovelace",
        description: "At 46 years of age, Troy is a veteran chef!",
        photo: "https://randomuser.me/api/portraits/lego/8.jpg",
        location:"",
        contact:"",
        interests:[]
    },
    {
        id : 5,
        name : "Max Dior",
        description: "At 32 years of age, Max is an esteemed businessman!",
        photo: "https://randomuser.me/api/portraits/lego/2.jpg",
        location:"",
        contact:"",
        interests:[]
    },
]

export default function ProfileList(){
    return(
        <div className="container">
            {profiles.map((profile) => (
                <div key={profile.id} className="profileSmall">
                    <img src={profile.photo} alt={profile.name} className="profilePhoto" height="40" width="40"/>
                    <h1 className="profileSmallName">{profile.name}</h1>
                    <p className="profileSmallDesc">{profile.description}</p>
                </div>
            ))}
        </div>
    );
}
