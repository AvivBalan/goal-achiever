import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import sdk from '../../services/api-sdk';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const GoalCreation = props => {
    const [creating, setCreating] = useState(false);
    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState('');

    const addStep = () => {
        const newArr = [...steps];
        newArr.push({
            name: '',
            dueDate: null,
            description: ''
        });
        setSteps(newArr);
    }

    const removeStep = index => {
        const newArr = [...steps];
        newArr.splice(index, 1);
        setSteps(newArr);
    };

    const modifyStep = (index, propName, value) => {
        const newArr = [...steps];
        newArr[index][propName] = value;
        setSteps(newArr);
    };

    const handleSubmit = () => {
        setCreating(true);
        sdk.goals.create({name, dueDate, description})
        .then(goal => Promise.all(steps.map(step => sdk.goals.createStep(goal.id, step))))
        .then(() => {
            props.history.push('/goals');
        })
        .catch(() => {
            setError('Something went wrong...')
            setCreating(false);
        });
    }
    return (
        <>
            <h1>Create a Goal!</h1>
            <h2>{error}</h2>
            <Card className='goal-card'>
                <CardContent>
                    <Stack spacing={2}>
                        <div>Name: <TextField placeholder='name' disabled={creating} onChange={e => setName(e.target.value)}/></div>
                        <div>Due date: <input type='date' disabled={creating} onChange={e => setDueDate(e.target.value)}/></div>
                        <div>Description: <TextField placeholder='description' disabled={creating} onChange={e => setDescription(e.target.value)}/></div>
                    </Stack>
                </CardContent>
            </Card>
            <h2>Steps</h2>
            <Stack spacing={2}>
                {steps.map((step, index) => (
                    <Card key={`new-step-${index}`}>
                        <CardContent>
                            <Stack spacing={2}>
                                <div>Name: <TextField placeholder='name' disabled={creating} onChange={e => modifyStep(index, 'name', e.target.value)}/></div>
                                <div>Due date: <input type='date' disabled={creating} onChange={e => modifyStep(index, 'dueDate', e.target.value)}/></div>
                                <div>Description: <TextField placeholder='description' disabled={creating} onChange={e => modifyStep(index, 'description', e.target.value)}/></div>
                            </Stack>
                            <br/>
                            <Button variant="contained" color="warning" onClick={() => removeStep(index)} disabled={creating}>Remove</Button>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <br/>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Button variant="contained" color="secondary" onClick={addStep} disabled={creating}>Add Step</Button>
                <Button variant="contained" disabled={creating} onClick={handleSubmit}>
                    {!creating? 'Submit' : <CircularProgress/>}
                </Button>
            </Stack>
            <br/>
        </>
    );
};

export default GoalCreation;