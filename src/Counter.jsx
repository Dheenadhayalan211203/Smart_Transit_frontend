import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const routesData = {
    tk: { stops: ["Thiruvanmayur", "Adayaru", "Guindy", "Ashok Pillar", "Vadapalani", "Koyambedu"], routeno: 1, mapurl: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d62193.39638274079!2d80.18423637227335!3d13.030114096228163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3a525d5b9b3bfc6f%3A0x6959f97669f90baa!2sThiruvanmiyur%2C%20Chennai%2C%20Tamil%20Nadu!3m2!1d12.983026899999999!2d80.2594001!4m5!1s0x3a5266b2082873a1%3A0x7f2b6f60e42a31f8!2sKoyambedu%2C%20Chennai%2C%20Tamil%20Nadu!3m2!1d13.0693568!2d80.1948314!5e0!3m2!1sen!2sin!4v1725436652287!5m2!1sen!2sin" },
    tn: { stops: ["Thiruvanmayur", "Thoraipakam", "Karapakam", "Solinganallur", "Navalur"], routeno: 2, mapurl: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d124444.35807632837!2d80.16049223542794!3d12.915035691162403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3a525d5b9b3bfc6f%3A0x6959f97669f90baa!2sThiruvanmiyur%2C%20Chennai%2C%20Tamil%20Nadu!3m2!1d12.983026899999999!2d80.2594001!4m5!1s0x3a525a51439fd9f3%3A0x5fdacd19ed90126c!2sNavalur%2C%20Tamil%20Nadu%20600130!3m2!1d12.8459348!2d80.22652289999999!5e0!3m2!1sen!2sin!4v1725463661891!5m2!1sen!2sin" },
    tm: { stops: ["Thiruvanmayur", "Velachery", "Ram nagar", "Madipakam", "Medavakam"], routeno: 3, mapurl: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d62213.32222819287!2d80.17933187188422!3d12.95055391471845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3a525d5b9b3bfc6f%3A0x6959f97669f90baa!2sThiruvanmiyur%2C%20Chennai%2C%20Tamil%20Nadu!3m2!1d12.983026899999999!2d80.2594001!4m5!1s0x3a525c1c2ab10c01%3A0x8f33fe8bebe2b89c!2sMedavakkam%2C%20Chennai%2C%20Tamil%20Nadu!3m2!1d12.9200089!2d80.1919901!5e0!3m2!1sen!2sin!4v1725463755174!5m2!1sen!2sin" },
};

const Counters = () => {
    const navigate = useNavigate();
    const [route, setRoute] = useState(routesData.tk.stops);
    const [mapUrl, setMapUrl] = useState(routesData.tk.mapurl);
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeno, setRouteno] = useState(routesData.tk.routeno);
    const [email, setEmail] = useState('');

    const handleRouteChange = (key) => {
        setRoute(routesData[key].stops);
        setMapUrl(routesData[key].mapurl);
        setRouteno(routesData[key].routeno);
    };

    const handleBooking = async () => {
        try {
            const response = await axios.post("https://smarttransitapi24-1.onrender.com/counter", { source, destination, email, routeno });
            console.log(response.data);
            navigate("/ticketbooked");
        } catch (error) {
            console.error("Error booking ticket:", error);
        }
    };

    return (
        <div className="all">
            <div className="routes">
                {Object.keys(routesData).map((key) => (
                    <div key={key} className="routebox" onClick={() => handleRouteChange(key)}>
                        <p>{routesData[key].stops[0]} TO {routesData[key].stops[routesData[key].stops.length - 1]}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2>Select The Starting Place:</h2>
                <section className="srcbox">
                    {route.map((stop, index) => (
                        <div key={index} onClick={() => setSource(stop)} className="stopname">
                            <p>{stop}</p>
                        </div>
                    ))}
                </section>

                <h2>Select The Destination</h2>
                <section className="descbox">
                    {route.map((stop, index) => (
                        <div key={index} onClick={() => setDestination(stop)} className="stopname2">
                            <p>{stop}</p>
                        </div>
                    ))}
                </section>

                <section className="map">
                    <iframe src={mapUrl} width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                </section>

                <section className="mailid">
                    <label htmlFor="email">Mailid </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </section>

                <button onClick={handleBooking}>Book Ticket</button>
            </div>
        </div>
    );
};

export default Counters;
