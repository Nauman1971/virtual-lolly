import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Lolly from '../components/Lolly';
import Loader from '../components/Loader';
import { Link } from 'gatsby';

export default function NewLolly({ location }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    var str = `${location.pathname}`;
    var n = str.lastIndexOf('/');
    var url = str.substring(n + 1);

    useEffect(() => {
        axios.post('/api/getby-slug', { slug: url })
            .then(setLoading(true))
            .then(res => {
                setData(res.data.newLolly)
                setLoading(false);
            }
            )

    }, [])
    const { color1, color2, color3, message, receiver, sender, slug } = data
    if (!loading) {
        return (
            <div className="container is-flex is-justify-content-center">
                <div className="mt-4">
                    <h1 className="title is-4 has-text-link-dark">Your lolly is freezing. Share it with this link:</h1>
                    <div className="notification is-primary mt-5">
                        <p className="title is-3 has-text-info-dark">{`https://virtual-lolly-fauna.netlify.app/create-lolly/${slug}`}</p>
                    </div>
                    <div className="card p-6">

                        <h1 className="title is-2 has-text-primary-dark">{receiver}</h1>
                        <h1 className="title is-4 has-text-warning-dark">{message}</h1>
                        <h1 className="title is-3 has-text-primary-dark">{sender}</h1>
                    </div>
                    <div>
                        <h1 className="title is-4 has-text-warning-dark mt-4">
                            {sender} made this virtual lolly for you. You can <Link to="/create-lolly">make your own</Link> to
                    send to a friend who deserve some sugary treat which won't rot their teeth
                    </h1>
                    </div>
                </div>
                <div className="mt-10 ml-5">
                    <Lolly
                        fillLollyTop={color1}
                        fillLollyMiddle={color2}
                        fillLollyBottom={color3}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <Loader loading={loading} />
        </div>
    )
}