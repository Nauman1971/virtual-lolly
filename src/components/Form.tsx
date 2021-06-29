import axios from 'axios';
import React, { useState } from 'react';
import Lolly from './Lolly';
import { navigate } from '@reach/router';
import shortId from 'shortid';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';

export default function Form() {
    const schema = yup.object().shape({
        sender: yup
            .string()
            .required('Sender is a required field')
            .min(5)
            .max(20)
            .matches(/^([^0-9]*)$/, 'Sender name should not contain numbers'),
        receiver: yup
            .string()
            .required('Receiver is a required field')
            .min(5)
            .max(20)
            .matches(/^([^0-9]*)$/, 'Reciever name should not contain numbers'),
        message: yup
            .mixed()
            .required('message is a required field ')

    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const initialColor = {
        color1: '#d52358',
        color2: '#e95946',
        color3: '#deaa43'
    }

    const [colors, setColors] = useState(initialColor);
    const [data, setData] = useState('');

    const handleColor = (evt) => {
        const { name, value } = evt.target;
        setColors({ ...colors, [name]: value });
    }

    const { color1, color2, color3 } = colors;

    const onClick = async (data) => {
        const slug = shortId.generate();
        const { sender, receiver, message } = data
        await axios.post('/api/create-lolly',
            {
                sender, receiver, message, color1, color2, color3, slug
            })
            .then(res => {
                setData(res.data.newLolly)
            });
    }

    if (data) {
        navigate(`/create-lolly/${data.slug}`)
    }

    return (
        <div className="create-new">
            <div>
                <Lolly
                    fillLollyTop={color1}
                    fillLollyMiddle={color2}
                    fillLollyBottom={color3}
                />
            </div>
            <div className="color-box-container">
                <label
                    htmlFor="topFlavor"
                    className="color-box-label"
                >
                    <input
                        className="color-box"
                        type="color"
                        name="color1"
                        id="topFlavor"
                        value={color1}
                        onChange={handleColor}
                    />
                </label>
                <label
                    className="color-box-label"
                    htmlFor="mediumFlavor">
                    <input
                        className="color-box"
                        type="color"
                        name="color2"
                        id="mediumFlavor"
                        value={color2}
                        onChange={handleColor}
                    />
                </label>
                <label
                    className="color-box-label"
                    htmlFor="bottomFlavor">
                    <input
                        className="color-box"
                        type="color"
                        name="color3"
                        id="bottomFlavor"
                        value={color3}
                        onChange={handleColor}
                    />
                </label>
            </div>
            <div>
                <form className="lolly-form">
                    <TextField
                        {...register('sender')}
                        fullWidth
                        label="Sender"
                        variant="outlined"
                        type="text" name="sender"
                        error={!!errors.sender}
                        helperText={errors.sender?.message}
                        margin="dense"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        rows={18}
                        {...register('message')}
                        fullWidth
                        multiline
                        label="Message"
                        variant="outlined"
                        type="text" name="message"
                        error={!!errors.receiver}
                        helperText={errors.message?.message}
                        margin="dense"
                    />

                    <TextField
                        {...register('receiver')}
                        fullWidth
                        label="Receiver"
                        variant="outlined"
                        type="text" name="receiver"
                        error={!!errors.receiver}
                        helperText={errors.receiver?.message}
                        margin="dense"
                    />
                    <input
                        className="button is-warning is-focused mt-2"
                        type="button" value="Create"
                        onClick={handleSubmit(onClick)}
                    />
                </form>

            </div>
        </div>
    )
}