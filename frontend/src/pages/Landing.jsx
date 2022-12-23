import React from "react";
import background from "../assets/guitar.jpg";
import smallGuitar from "../assets/small-guitar.png";
import MetronomeImg from "../assets/Metronome.png";
import GraphImg from "../assets/graph.jpg";
import PractiseImg from "../assets/practise.jpg";


function Landing() {
    return (
        <div>
            <div
                className="hero"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "white",
                    fontSize: "2rem",
                    textAlign: "center",
                }}
            >
                <h1 className=" md:text-4xl text-2xl xl:text-9xl text-gray-200 drop-shadow-lg">
                    Welcome to guitarly
                </h1>
                <h3 className="text-lg">
                    Practise your guitar skills with our app
                </h3>
            </div>
            <div class="md:px-40 px-10 py-20">
                <div className="flex flex-col mb-10 justify-center items-center">
                    <h2 className="text-4xl text-white">Features</h2>
                    <img src={smallGuitar} height="50px" width = "50px" alt="" />
                </div>
                <div class=" grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="metronome-content flex justify-center order-1 flex-col " data-aos="zoom-in">
                        <h3 className="text-4xl text-white">Metronome</h3>
                        <p className="text-md text-semibold text-white">
                            Metronome is a practise tool that produces a
                            regulated pulse to help you play rhythms accurately
                            and to create a clear sense of timing and tempo.
                        </p>
                    </div>
                    <div class="metronome-img order-2" data-aos="fade-left">
                        <div class="img-holder">
                            <img className="rounded-lg" src={MetronomeImg} alt="" />
                        </div>
                    </div>

                    <div class="tuner-img order-4 md:order-3" data-aos="fade-right">
                        <div class="img-holder ">
                            <img className="rounded-lg" src={GraphImg} alt="" />
                        </div>
                    </div>
                    <div class="tuner-content flex order-3 md:order-4 justify-center flex-col " data-aos="zoom-in">
                        <h3 className="text-4xl text-white">Progress Graph</h3>
                        <p className="text-md  text-semibold text-white">
                            A graph that motivates users by displaying their
                            daily progress . The visual representation of their
                            progress makes it easier for the user to track their
                            progress
                        </p>
                    </div>

                    <div class="flex justify-center order-5 flex-col " data-aos="zoom-in">
                        <h3 className="text-4xl text-white">Practise Area</h3>
                        <p className="text-md text-semibold text-white">
                            Practise area provides a package deal will some of
                            the essential tool for the guitarist . It consists
                            of a task list a timer and a metronome.
                        </p>
                    </div>
                    <div class="practisearea-img order-6" data-aos="fade-left">
                        <div class="img-holder">
                            <img className="rounded-lg" src={PractiseImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
