import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [loading])

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const link = form.link.value;

        const item = { name, link }

        fetch('http://localhost:5000/items', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                form.reset();
                setLoading(!loading);
            })

    }

    const handleDelete = (id) => {
        // console.log(id)
        fetch(`http://localhost:5000/item/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    setLoading(!loading);
                }
            })
    }

    if (!items.length > 0){
        return <Loading></Loading>
    }

        return (
            <div>
                <div className='flex justify-center '>
                    <form onSubmit={handleSubmit} className='text-center w-full mb-5'>
                        <label> Name : </label>
                        <br />
                        <input type="text" name='name' placeholder="name" className="input input-bordered input-error w-full max-w-xs" />
                        <br />
                        <label> Image Link : </label>
                        <br />
                        <input type="text" name='link' placeholder="image link" className="input input-bordered input-error w-full max-w-xs" />
                        <br />
                        <button className='btn btn-error mt-3'>Submit</button>
                    </form>
                </div>
                <div className='w-fit mx-auto'>
                    <div className='grid grid-rows-1 lg:grid-cols-3 gap-5'>
                        {
                            items.map(item => <div className="w-52 shadow-lg rounded-lg" key={item._id}>
                                <img className='w-full h-[206.67px]' src={item.link} alt="" />
                                <h1 className='text-center text-2xl my-5'>{item.name}</h1>

                                <div className='flex justify-center gap-5 mb-5'>
                                    <Link to={`/item/${item._id}`} className='btn btn-warning'>Update</Link>
                                    <button onClick={() => handleDelete(item._id)} className='btn btn-error'>Delete</button>
                                </div>

                            </div>)
                        }
                    </div>
                </div>

            </div>
        );
};

export default Home;