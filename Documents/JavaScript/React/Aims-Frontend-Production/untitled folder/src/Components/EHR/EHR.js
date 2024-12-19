import React, { useContext, useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Node_API_URL } from '../../client';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { useSelector } from 'react-redux';

const ehrOptions = [
  { id: 'ehr1', title: 'DrChrono', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/03/drchrono2-removebg-preview.png' },
  { id: 'ehr2', title: 'Practice Fusion', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/06/practice_fusion-removebg-preview.png' },
  { id: 'ehr3', title: 'Kareo Clinical', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/03/Kareo-Billing.png' },
  { id: 'ehr4', title: 'Netsmart myUnity', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/06/th-removebg-preview.png' },
  { id: 'ehr5', title: 'AdvancedMD', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/03/AdvancedMD-1.png' },
  { id: 'ehr6', title: 'NextGen', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/05/NextGen.png' },
  { id: 'ehr7', title: 'athenahealth', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/06/athenaOne.png' },
  { id: 'ehr8', title: 'eClinicalWorks', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/05/eClinicalWorks.png' },
  { id: 'ehr9', title: 'Valant', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2022/05/valant_logo_color_on_white_lg-removebg-preview.png' },
  { id: 'ehr10', title: 'Cerner', image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2023/02/cerner.png' },
];

const EHRAddPatient = () => {
  const [selectedEHR, setSelectedEHR] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState('');

  const { token , showToast} = useContext(GlobalStateContext);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const res = await axios.get(`${Node_API_URL}/api/get/getPatients?id=${userInfo._id}`, config);
        if (res.data.response === true) {
          setPatients(res.data.patients);
        }
      } catch (error) {
        showToast("Error fetching patient reports");
      }
    };

    fetchData();
  }, [token, userInfo._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Sending patient data to ${selectedEHR} with API key ${apiKey}`);
    console.log(`Selected patient: ${selectedPatient}`);
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  return ( 
    <div className='flex justify-center items-center'>
    <Card className="p-4 ml-5 sm:w-[350px] md:w-[480px]  md:ml-10 lg:w-[530px]" >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Add Patient to EHR
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{selectedEHR ? '' : 'Select EHR'}</InputLabel>
                <Select
                  value={selectedEHR}
                  onChange={(e) => setSelectedEHR(e.target.value)}
                >
                  {ehrOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>{option.title}</Grid>
                        <Grid item>
                          <img className='h-16 w-52' src={option.image} alt={option.title} />
                        </Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="API Key"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleApiKeyVisibility}>
                        {showApiKey ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{selectedPatient ? '' : 'Select Patient'}</InputLabel>
                <Select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      Email: {patient.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {selectedPatientDetails && (
                <Typography variant="body2" color="textSecondary">
                  {selectedPatientDetails}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Add Patient
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card> 
    </div>
  );
};

export default EHRAddPatient;
