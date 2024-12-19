
/*eslint-disable*/
import React, { useState, useRef, useEffect, useContext } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MicIcon from '@mui/icons-material/Mic';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import {  Node_API_URL } from '../../client';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import Loader from '../Loader/Loader';
import Mic from '../ui/Mic/Mic';
import {isIos} from 'environment';
import NewModal from '../ui/NewModal/NewModal';

const Root = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:'50px',
  paddingBottom:'50px',
  height: '100%',
  backgroundColor: '#f0f0f0',
  position: 'relative',
  transition: 'filter 0.5s ease',
});

const en = [
  { id: 1, question: "What is your date of birth? (Manadatory)" },
  { id: 2, question: "What is your gender? (Manadatory)" },
  { id: 3, question: "What is your phone number? (Manadatory)" },
  { id: 4, question: "Please provide phone number of an emergency contact. (Manadatory)" },
  { id: 5, question: "What is your address?" },
  { id: 6, question: "Who is your insurance provider? " },
  { id: 7, question: "What is your insurance policy number? " },
  { id: 8, question: "What is your Policy Holder Name " },
  { id: 9, question: "What is your group number? " },
  { id: 10, question: "Who is your primary care physician? " },
  { id: 11, question: "Please list any medications you are currently taking. " },
  { id: 12, question: "Do you have any allergies to medications, food, or other substances? " },
  { id: 13, question: "Do you have any chronic medical conditions? " },
  { id: 14, question: "Have you had any surgeries in the past? " },
  { id: 15, question: "Is there any significant family medical history we should be aware of? " },
  { id: 16, question: "What brings you in today? " },
  { id: 17, question: "Can you describe your symptoms in detail? " },
  { id: 18, question: "How long have you been experiencing these symptoms? " },
  { id: 19, question: "On a scale of 1 to 10, how severe are your symptoms? " },
  { id: 20, question: "Have you experienced these symptoms before? " },
  { id: 21, question: "Is there anything that makes the symptoms better or worse? " },
  { id: 22, question: "What is your current occupation? " },
  { id: 23, question: "Do you smoke, drink alcohol, or use recreational drugs? " },
  { id: 24, question: "How often do you exercise, and what does your diet typically consist of? " },
  { id: 25, question: "Do you live alone, with family, or in another arrangement? " },
  { id: 26, question: "Have you experienced any weight loss, fever, or fatigue recently? " },
  { id: 27, question: "Any history of chest pain, palpitations, or swelling in the legs? " },
  { id: 28, question: "Any cough, shortness of breath, or wheezing? " },
  { id: 29, question: "Any nausea, vomiting, diarrhea, or constipation? " },
  { id: 30, question: "Any joint pain, muscle aches, or weakness? " },
  { id: 31, question: "Any headaches, dizziness, or numbness? " }
];

const sp = [
  { id: 1, question: "¿Cuál es su fecha de nacimiento? (Obligatorio)" },
  { id: 2, question: "¿Cuál es su género? (Obligatorio)" },
  { id: 3, question: "¿Cuál es su número de teléfono? (Obligatorio)" },
  { id: 4, question: "Por favor proporcione el número de teléfono de un contacto de emergencia. (Obligatorio)" },
  { id: 5, question: "¿Cuál es su dirección?" },
  { id: 6, question: "¿Quién es su proveedor de seguros?" },
  { id: 7, question: "¿Cuál es su número de póliza de seguro?" },
  { id: 8, question: "¿Cuál es el nombre del titular de la póliza?" },
  { id: 9, question: "¿Cuál es su número de grupo?" },
  { id: 10, question: "¿Quién es su médico de atención primaria?" },
  { id: 11, question: "Por favor, enumere los medicamentos que está tomando actualmente." },
  { id: 12, question: "¿Tiene alguna alergia a medicamentos, alimentos u otras sustancias?" },
  { id: 13, question: "¿Tiene alguna condición médica crónica?" },
  { id: 14, question: "¿Ha tenido alguna cirugía en el pasado?" },
  { id: 15, question: "¿Hay algún antecedente médico familiar significativo que debamos tener en cuenta?" },
  { id: 16, question: "¿Qué lo trae hoy aquí?" },
  { id: 17, question: "¿Puede describir sus síntomas en detalle?" },
  { id: 18, question: "¿Cuánto tiempo ha estado experimentando estos síntomas?" },
  { id: 19, question: "En una escala del 1 al 10, ¿qué tan graves son sus síntomas?" },
  { id: 20, question: "¿Ha experimentado estos síntomas antes?" },
  { id: 21, question: "¿Hay algo que mejore o empeore los síntomas?" },
  { id: 22, question: "¿Cuál es su ocupación actual?" },
  { id: 23, question: "¿Fuma, bebe alcohol o usa drogas recreativas?" },
  { id: 24, question: "¿Con qué frecuencia hace ejercicio y en qué consiste típicamente su dieta?" },
  { id: 25, question: "¿Vive solo, con familia o en otro tipo de arreglo?" },
  { id: 26, question: "¿Ha experimentado pérdida de peso, fiebre o fatiga recientemente?" },
  { id: 27, question: "¿Algún historial de dolor en el pecho, palpitaciones o hinchazón en las piernas?" },
  { id: 28, question: "¿Alguna tos, dificultad para respirar o sibilancias?" },
  { id: 29, question: "¿Alguna náusea, vómito, diarrea o estreñimiento?" },
  { id: 30, question: "¿Algún dolor en las articulaciones, dolores musculares o debilidad?" },
  { id: 31, question: "¿Algún dolor de cabeza, mareo o entumecimiento?" }
];

const fr = [
  { id: 1, question: "Quelle est votre date de naissance ? (Obligatoire)" },
  { id: 2, question: "Quel est votre genre ? (Obligatoire)" },
  { id: 3, question: "Quel est votre numéro de téléphone ? (Obligatoire)" },
  { id: 4, question: "Veuillez fournir le numéro de téléphone d'un contact d'urgence. (Obligatoire)" },
  { id: 5, question: "Quelle est votre adresse ?" },
  { id: 6, question: "Qui est votre fournisseur d'assurance ?" },
  { id: 7, question: "Quel est votre numéro de police d'assurance ?" },
  { id: 8, question: "Quel est le nom du titulaire de la police ?" },
  { id: 9, question: "Quel est votre numéro de groupe ?" },
  { id: 10, question: "Qui est votre médecin traitant ?" },
  { id: 11, question: "Veuillez indiquer les médicaments que vous prenez actuellement." },
  { id: 12, question: "Avez-vous des allergies aux médicaments, aliments ou autres substances ?" },
  { id: 13, question: "Avez-vous des maladies chroniques ?" },
  { id: 14, question: "Avez-vous subi des interventions chirurgicales dans le passé ?" },
  { id: 15, question: "Y a-t-il des antécédents médicaux familiaux significatifs dont nous devrions être conscients ?" },
  { id: 16, question: "Qu'est-ce qui vous amène aujourd'hui ?" },
  { id: 17, question: "Pouvez-vous décrire vos symptômes en détail ?" },
  { id: 18, question: "Depuis combien de temps ressentez-vous ces symptômes ?" },
  { id: 19, question: "Sur une échelle de 1 à 10, quelle est la gravité de vos symptômes ?" },
  { id: 20, question: "Avez-vous déjà ressenti ces symptômes auparavant ?" },
  { id: 21, question: "Y a-t-il quelque chose qui améliore ou aggrave vos symptômes ?" },
  { id: 22, question: "Quelle est votre profession actuelle ?" },
  { id: 23, question: "Fumez-vous, consommez-vous de l'alcool ou des drogues récréatives ?" },
  { id: 24, question: "À quelle fréquence faites-vous de l'exercice et en quoi consiste généralement votre alimentation ?" },
  { id: 25, question: "Vivez-vous seul, en famille ou dans un autre arrangement ?" },
  { id: 26, question: "Avez-vous récemment ressenti une perte de poids, de la fièvre ou de la fatigue ?" },
  { id: 27, question: "Des antécédents de douleur thoracique, de palpitations ou de gonflement des jambes ?" },
  { id: 28, question: "De la toux, des difficultés respiratoires ou une respiration sifflante ?" },
  { id: 29, question: "Des nausées, des vomissements, de la diarrhée ou de la constipation ?" },
  { id: 30, question: "Des douleurs articulaires, des douleurs musculaires ou une faiblesse ?" },
  { id: 31, question: "Des maux de tête, des étourdissements ou des engourdissements ?" }
];

const rs = [
  { id: 1, question: "Какова ваша дата рождения? (Обязательно)" },
  { id: 2, question: "Каков ваш пол? (Обязательно)" },
  { id: 3, question: "Каков ваш номер телефона? (Обязательно)" },
  { id: 4, question: "Пожалуйста, укажите номер телефона экстренного контакта. (Обязательно)" },
  { id: 5, question: "Каков ваш адрес?" },
  { id: 6, question: "Кто ваш страховой провайдер?" },
  { id: 7, question: "Каков номер вашей страховой полисы?" },
  { id: 8, question: "Каково имя держателя полиса?" },
  { id: 9, question: "Каков ваш номер группы?" },
  { id: 10, question: "Кто ваш лечащий врач?" },
  { id: 11, question: "Пожалуйста, перечислите все лекарства, которые вы сейчас принимаете." },
  { id: 12, question: "Есть ли у вас аллергия на лекарства, еду или другие вещества?" },
  { id: 13, question: "Есть ли у вас хронические заболевания?" },
  { id: 14, question: "Были ли у вас хирургические операции в прошлом?" },
  { id: 15, question: "Есть ли какая-либо важная семейная медицинская история, которую нам следует знать?" },
  { id: 16, question: "Что привело вас сюда сегодня?" },
  { id: 17, question: "Можете ли вы подробно описать свои симптомы?" },
  { id: 18, question: "Как долго вы испытываете эти симптомы?" },
  { id: 19, question: "По шкале от 1 до 10, насколько сильны ваши симптомы?" },
  { id: 20, question: "Испытывали ли вы эти симптомы раньше?" },
  { id: 21, question: "Есть ли что-то, что улучшает или ухудшает симптомы?" },
  { id: 22, question: "Какова ваша текущая профессия?" },
  { id: 23, question: "Вы курите, употребляете алкоголь или наркотики?" },
  { id: 24, question: "Как часто вы занимаетесь спортом и каков ваш типичный рацион питания?" },
  { id: 25, question: "Вы живете один, с семьей или в другом варианте?" },
  { id: 26, question: "Были ли у вас недавно потеря веса, лихорадка или усталость?" },
  { id: 27, question: "Есть ли у вас история болей в груди, учащенного сердцебиения или отека ног?" },
  { id: 28, question: "Есть ли кашель, одышка или хрипы?" },
  { id: 29, question: "Есть ли тошнота, рвота, диарея или запор?" },
  { id: 30, question: "Есть ли боли в суставах, мышечные боли или слабость?" },
  { id: 31, question: "Есть ли головные боли, головокружение или онемение?" }
];





const Container = styled(Box)({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
  position: 'relative',
});

const MicIconStyled = styled(MicIcon)(({ recording }) => ({
  fontSize: '2rem',
  marginTop: '30px',
  marginBottom: '20px', 
  cursor:'pointer',
  color: recording ? 'red' : 'white',
  animation: recording ? 'pulse 1.5s infinite' : 'none',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const AccordionStyled = styled(Accordion)({
  textAlign: 'left',
});

const SubmitButton = styled(Button)({
  marginTop: '20px',
  backgroundColor:'#EE4B2B',
  paddingLeft:'70px',
  paddingRight:'70px',
  textAlign:'center'
});

const LanguageSelect = styled(FormControl)({
  position: 'absolute',
  top: '20px', 
  color:'white',
  right: '20px',
});

const InstructionButton = styled(Button)({
  position: 'absolute',
  top: '20px',
  left: '20px', 
  backgroundColor: 'blue',
  color: 'white',
});



const InstructionModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height:'100%',
  padding: '0 16px', // Ensure some padding on the sides
});

const InstructionBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '8px',
  // boxShadow: theme.shadows[5],
  padding: '24px',
  maxWidth: '600px', // Set a max width for larger screens
  width: '100%', // Make it full width on smaller screens
  overflowY: 'auto', // Enable scrolling for overflowing content on smaller screens
  [theme.breakpoints.down('sm')]: {
    // marginTop:"100px",
    padding: '16px', // Reduce padding on smaller screens
    maxWidth: '90%', // Max width adjustment for smaller screens
  },
}));

import { GlobalStateContext } from "../../Context/GlobalStateContext";
function UpdatePatient() {
  const [expanded, setExpanded] = useState(null);
  const [language, setLanguage] = useState('english');
  const [open, setOpen] = useState(true);
  const [isModalOpen , setisOpen] = useState(false);   
  const [modalmsg , setModalmsg] = useState({});
  const [continueRec,setContinue] = useState(false)
  const [recording, setRecording] = useState(false); // State to manage recording state
  const [source, setSource] = useState(false);
  const { docID } = useParams();
  const [showButton, setShowButton] = useState(false);
  const { userTimezone } = useContext(GlobalStateContext)
  const [answers, setAnswers] = useState({
    1: '', 
    2: '', 
    3: '', 
    4: '', 
    5: '', 
    6: '', 
    7: '', 
    8: '', 
    9: '', 
    10: '', 
    11: '', 
    12: '', 
    13: '', 
    14: '', 
    15: '', 
    16: '', 
    17: '', 
    18: '', 
    19: '', 
    20: '', 
    21: '', 
    22: '', 
    23: '', 
    24: '', 
    25: '', 
    26: '', 
    27: '', 
    28: '', 
    29: '',
    30: '',
    31: '' 
}); // State to hold answers for each question 
const openFirst = () => { 
  setExpanded(`panel${questions[0].id}`); 
}
  const [loading, setLoading] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false); 
  const Scroll = useRef();  
  const scrolltoAnswers = () => {  
    Scroll.current.scrollIntoView({ behavior: "smooth" }); 
    openFirst();
  } 

  const agreementScroll = useRef(null); 
 const [agreementError , setAgreementError] = useState(false);
 const scrolltoAgreement = () => { 
   agreementScroll.current.scrollIntoView({ behavior: "smooth" });  
 }
  useEffect(()=>{
    toast.info("If you are filling out this form manually, just register the form. Don't use 'Submit'. If you use speech-to-text, first submit and then register.")
  },[])

  const mediaRecorderRef = useRef(null); // Reference for MediaRecorder object
  const chunksRef = useRef([]); // Array to store audio chunks

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    if(event.target.value=="english")
    {
      setQuestions(en)
    }else if(event.target.value=="russian")
    {
      setQuestions(rs)
    }else if(event.target.value=="french")
    {
      setQuestions(fr)
    }else if(event.target.value=="spanish")
    {
      setQuestions(sp)
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (questionId) => (event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

 

  const scrollRef = useRef();
  const toggleRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording(); 
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startRecording = () => {
    setSource(true);
    const beep = new Audio('/click.mp3'); // Adjust the path to your beep sound file if necessary
    beep.play();
    navigator.mediaDevices.getUserMedia({ audio: {
      noiseSuppression: true, // Enable noise suppression
      echoCancellation: true,  // Enable echo cancellation (optional)
      autoGainControl: true    // Enable automatic gain control (optional)
    } })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start(1000);
        setRecording(true);
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      const beep = new Audio('/click.mp3'); // Adjust the path to your beep sound file if necessary
      beep.play();
    }
  };

  const handleDataAvailable = (event) => {
    chunksRef.current.push(event.data);
    setShowButton(true)
  };

  const [isAudioPlaying,setIsAudioPlaying]=useState(false)
  const audioRef = useRef(null); // To store the audio instance

  const handleAudioPlayback = () => {
    if (isAudioPlaying) {
      // Stop the audio if it's playing
      if (audioRef.current) {
        audioRef.current.pause();  // Pause the audio
        audioRef.current.currentTime = 0;  // Reset audio to start
        setIsAudioPlaying(false);
      }
    } else {
      // Play the audio
      let blob;
      if(isIos)
        {
          blob = new Blob(chunksRef.current, { type: 'audio/mp4' });
        }else{
          blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        }
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio; // Store the audio instance in the ref
      audio.play();
      setIsAudioPlaying(true);

      // Optional: Handle the end of the audio playback
      audio.onended = () => {
        setIsAudioPlaying(false);
      };
    }
  };

  const [questions,setQuestions]=useState(en)




  function trimWhiteSpaces(inputString) {
    // Remove leading/trailing spaces and remove special characters
    let trimmedString = inputString.trim();
    // Remove all whitespace and special characters
    trimmedString = trimmedString.replace(/[\s\W_]+/g, '');
    return trimmedString;
}

  // const [summary,setSummary]=useState("")
  const sendAudioToFlask = async () => {
    setLoading(true);
    setAnswers({})
    let blob
    if(isIos)
        {
          blob = new Blob(chunksRef.current, { type: 'audio/mp4' });
        }else{
          blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        }
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('type', 'update');
    try {

      const response = await axios.post(`${Node_API_URL}/api/post/speechToText`,formData);

      if(response.data.success === true)
      {
        chunksRef.current=[]
        setShowButton(false)
        setSource(false)
        let responseData = response.data.data;
        const newAnswers = {};
        responseData.forEach((answer, index) => {

        if(answer['answer']=="null")
        {
          newAnswers[questions[index].id] = "The patient didn't answer this question."
        }
        else{
          if(questions[index].id == 2 || questions[index].id == 3){
            if(answer['answer']!=null)
            {
              newAnswers[questions[index].id] = trimWhiteSpaces(answer['answer'])
            }else{
              newAnswers[questions[index].id] = answer['answer']
            }
           }else{
              newAnswers[questions[index].id] = answer['answer']
          }
        }
      });
      setAnswers(newAnswers); 
      setTimeout(() => {
        scrolltoAnswers();
      }, 200);
      // toast.info("Check the inbox for each question. If there is any incorrect information, edit it manually.")
      }

    } catch (error) {
      toast.error('Error in processing information:', error);
    } finally {
      setLoading(false);
    }
    
    
  };

 
  const convertToDocx = async (patients) => {
    try {
      const response = await fetch("/patient.docx");
      const template = await response.arrayBuffer();
      const zip = new PizZip(template);
      const doc = new Docxtemplater(zip);
      
      doc.setData({
        gender: patients.gender === null || patients.gender === "" ? "The patient didn't answer this question." : patients.gender,
        phone: patients.phoneNumber === null || patients.phoneNumber === "" ? "The patient didn't answer this question." : patients.phoneNumber,
        dob: patients.dateOfBirth === null || patients.dateOfBirth === "" ? "The patient didn't answer this question." : patients.dateOfBirth,
        emergency: patients.emergencyContactPhoneNumber === null || patients.emergencyContactPhoneNumber === "" ? "The patient didn't answer this question." : patients.emergencyContactPhoneNumber,
        provider: patients.insuranceProvider === null || patients.insuranceProvider === "" ? "The patient didn't answer this question." : patients.insuranceProvider,
        policy: patients.insurancePolicyNumber === null || patients.insurancePolicyNumber === "" ? "The patient didn't answer this question." : patients.insurancePolicyNumber,
        holder: patients.policyHolderName === null || patients.policyHolderName === "" ? "The patient didn't answer this question." : patients.policyHolderName,
        group: patients.groupNumber === null || patients.groupNumber === "" ? "The patient didn't answer this question." : patients.groupNumber,
        physician: patients.primaryCarePhysician === null || patients.primaryCarePhysician === "" ? "The patient didn't answer this question." : patients.primaryCarePhysician,
        medication: patients.medications === null || patients.medications === "" ? "The patient didn't answer this question." : patients.medications,
        allergy: patients.allergies === null || patients.allergies === "" ? "The patient didn't answer this question." : patients.allergies,
        chronic: patients.chronicConditions === null || patients.chronicConditions === "" ? "The patient didn't answer this question." : patients.chronicConditions,
        surgery: patients.pastSurgeries === null || patients.pastSurgeries === "" ? "The patient didn't answer this question." : patients.pastSurgeries,
        pmh: patients.familyMedicalHistory === null || patients.familyMedicalHistory === "" ? "The patient didn't answer this question." : patients.familyMedicalHistory,
        visit: patients.visitReason === null || patients.visitReason === "" ? "The patient didn't answer this question." : patients.visitReason,
        description: patients.symptomDescription === null || patients.symptomDescription === "" ? "The patient didn't answer this question." : patients.symptomDescription,
        duration: patients.symptomDuration === null || patients.symptomDuration === "" ? "The patient didn't answer this question." : patients.symptomDuration,
        severity: patients.symptomSeverity === null || patients.symptomSeverity === "" ? "The patient didn't answer this question." : patients.symptomSeverity,
        history: patients.symptomHistory === null || patients.symptomHistory === "" ? "The patient didn't answer this question." : patients.symptomHistory,
        trigger: patients.symptomTriggers === null || patients.symptomTriggers === "" ? "The patient didn't answer this question." : patients.symptomTriggers,
        occupation: patients.occupation === null || patients.occupation === "" ? "The patient didn't answer this question." : patients.occupation,
        lifestyle: patients.lifestyle === null || patients.lifestyle === "" ? "The patient didn't answer this question." : patients.lifestyle,
        diet: patients.exerciseAndDiet === null || patients.exerciseAndDiet === "" ? "The patient didn't answer this question." : patients.exerciseAndDiet,
        living: patients.livingArrangement === null || patients.livingArrangement === "" ? "The patient didn't answer this question." : patients.livingArrangement,
        general: patients.recentHealthChanges === null || patients.recentHealthChanges === "" ? "The patient didn't answer this question." : patients.recentHealthChanges,
        cardio: patients.cardiovascularHistory === null || patients.cardiovascularHistory === "" ? "The patient didn't answer this question." : patients.cardiovascularHistory,
        res: patients.respiratoryHistory === null || patients.respiratoryHistory === "" ? "The patient didn't answer this question." : patients.respiratoryHistory,
        gas: patients.gastrointestinalHistory === null || patients.gastrointestinalHistory === "" ? "The patient didn't answer this question." : patients.gastrointestinalHistory,
        muscu: patients.musculoskeletalHistory === null || patients.musculoskeletalHistory === "" ? "The patient didn't answer this question." : patients.musculoskeletalHistory,
        neuro: patients.neurologicalHistory === null || patients.neurologicalHistory === "" ? "The patient didn't answer this question." : patients.neurologicalHistory
    });

      doc.render();

      const outputBuffer = doc.getZip().generate({ type: "blob" });
      const blob = new Blob([outputBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, `${patients.fullName}_report.docx`);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  const registerPatient = async() =>{
    
    if(agreementChecked == false) 

    { 
      scrolltoAgreement(); 
      setAgreementError(true);
      toast.info("check terms and conditions")
      return
    }
 
    for (const key in answers) {
      if (answers.hasOwnProperty(key)) {
          if((key==1 && answers[key] === "") || (key==2 && answers[key] === "") || (key==3 && answers[key] === "") || (key==4 && answers[key] === ""))
          {
            toast.error(`Please fill the manadatory fields`)
            return;
          }
      }
  }

  let form = {
    doc_id:docID,
    dateOfBirth:answers[1],
    gender:answers[2],
    phoneNumber:answers[3],
    emergencyContactPhoneNumber:answers[4],
    address:answers[5],
    insuranceProvider:answers[6],
    insurancePolicyNumber:answers[7],
    policyHolderName:answers[8],
    groupNumber:answers[9],
    primaryCarePhysician:answers[10],
    medications:answers[11],
    allergies:answers[12],
    chronicConditions:answers[13],
    pastSurgeries:answers[14],
    familyMedicalHistory:answers[15],
    visitReason:answers[16],
    symptomDescription:answers[17],
    symptomDuration:answers[18],
    symptomSeverity:answers[19],
    symptomHistory:answers[20],
    symptomTriggers:answers[21],
    occupation:answers[22],
    lifestyle:answers[23],
    exerciseAndDiet:answers[24],
    livingArrangement:answers[25],
    recentHealthChanges:answers[26],
    cardiovascularHistory:answers[27],
    respiratoryHistory:answers[28],
    gastrointestinalHistory:answers[29],
    musculoskeletalHistory:answers[30],
    neurologicalHistory:answers[31],
    userTimezone
    // summary
}
setLoading(true)

 const patientSum = await axios.post(`${Node_API_URL}/api/post/patientDataToSummary`,form)
 try{
  if(patientSum.data.success == true)
  {
    let form = {
      doc_id: docID,
      dateOfBirth: answers[1],
      gender: answers[2],
      phoneNumber: answers[3],
      emergencyContactPhoneNumber: answers[4] === null ? "The patient didn't answer this question." : answers[4],
      address: answers[5] === null ? "The patient didn't answer this question." : answers[5],
      insuranceProvider: answers[6] === null ? "The patient didn't answer this question." : answers[6],
      insurancePolicyNumber: answers[7] === null ? "The patient didn't answer this question." : answers[7],
      policyHolderName: answers[8] === null ? "The patient didn't answer this question." : answers[8],
      groupNumber: answers[9] === null ? "The patient didn't answer this question." : answers[9],
      primaryCarePhysician: answers[10] === null ? "The patient didn't answer this question." : answers[10],
      medications: answers[11] === null ? "The patient didn't answer this question." : answers[11],
      allergies: answers[12] === null ? "The patient didn't answer this question." : answers[12],
      chronicConditions: answers[13] === null ? "The patient didn't answer this question." : answers[13],
      pastSurgeries: answers[14] === null ? "The patient didn't answer this question." : answers[14],
      familyMedicalHistory: answers[15] === null ? "The patient didn't answer this question." : answers[15],
      visitReason: answers[16] === null ? "The patient didn't answer this question." : answers[16],
      symptomDescription: answers[17] === null ? "The patient didn't answer this question." : answers[17],
      symptomDuration: answers[17] === null ? "The patient didn't answer this question." : answers[18],
      symptomSeverity: answers[19] === null ? "The patient didn't answer this question." : answers[19],
      symptomHistory: answers[20] === null ? "The patient didn't answer this question." : answers[20],
      symptomTriggers: answers[21] === null ? "The patient didn't answer this question." : answers[21],
      occupation: answers[22] === null ? "The patient didn't answer this question." : answers[22],
      lifestyle: answers[23] === null ? "The patient didn't answer this question." : answers[23],
      exerciseAndDiet: answers[24] === null ? "The patient didn't answer this question." : answers[24],
      livingArrangement: answers[25] === null ? "The patient didn't answer this question." : answers[25],
      recentHealthChanges: answers[26] === null ? "The patient didn't answer this question." : answers[26],
      cardiovascularHistory: answers[27] === null ? "The patient didn't answer this question." : answers[27],
      respiratoryHistory: answers[28] === null ? "The patient didn't answer this question." : answers[28],
      gastrointestinalHistory: answers[29] === null ? "The patient didn't answer this question." : answers[29],
      musculoskeletalHistory: answers[30] === null ? "The patient didn't answer this question." : answers[30],
      neurologicalHistory: answers[31] === null ? "The patient didn't answer this question." : answers[31],
      summary: patientSum.data.summary
  };
  
  
    let res;
  try{
    res = await axios.post(`${Node_API_URL}/api/post/updateVoiceIntake`,form)
     if(res.data.response === true)
     {
      toast.success(res.data.msg);
      await convertToDocx(res.data.patients)
     }else{
      toast.error(res.data.msg)
     }
  }catch(e){
    toast.error("Error")
  }finally{
    setLoading(false)
  }
  }else{
    setLoading(false)
    toast.error("Error in processing information")
  }
 }
catch(e)
{
    toast.error("Error in procesing information")
}finally{
    setLoading(false)
  }

  

    
  }

  const handleAgreementOpen = () => {
    setAgreementOpen(true);
  };

  const handleAgreementClose = () => {
    setAgreementOpen(false);
  };

  const handleAgreementChange = (event) => {
    setAgreementChecked(event.target.checked);
  };

  const readMe = () =>{
    setAgreementOpen(true);
  }

  const checkConfirm = () => {  
    if(continueRec)
    {
      setModalmsg({head:"Continue Recording!" , desc:"Are you sure you want to continue the recording from where you left."})
      setisOpen(true);
    }else{
      setModalmsg({head:"Start Recording!" , desc:"Are you sure you want to start the recording?"})
      setisOpen(true);
      setContinue(true)
    }
  } 
  const startRec = () => {  
    setisOpen(false);
    toggleRecording();
  }

  return (
    <>

{isModalOpen && ( 
     <div
     className="fixed inset-0 flex items-center justify-center z-50"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
   >
     <NewModal head={modalmsg.head} desc={modalmsg.desc} close={()=>{setisOpen(false)}} confirm={startRec} />
   </div>
   )}
<ToastContainer/>
    {
      loading ? <Loader/> :
    <Root className='dark:bg-slate-800 w-[100%]' style={{ filter: open ? 'blur(3px)' : 'none' , 
      paddingTop: 30}}>
      <Container className='dark:bg-slate-900 '>
        <LanguageSelect variant="outlined">
          <InputLabel id="language-select-label" className='dark:text-gray-100'>Language</InputLabel> <br/>
          <Select 
          className='dark:text-white border-white border-[1px]'
            labelId="language-select-label"
            value={language}
            onChange={handleLanguageChange}
            label="Language"
          >
            <MenuItem className='dark:text-gray-100' value="english">English</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="russian">Russian</MenuItem>
            <MenuItem value="french">French</MenuItem>
          </Select>
        </LanguageSelect>
        <br/>
        <InstructionButton variant="contained" onClick={handleOpen}>
          Read Instructions
        </InstructionButton>
        <InstructionModal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          // BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          }}
        >
         <InstructionBox
  style={{
    maxHeight: '90vh', // Set max height to 90% of the viewport height
    overflowY: 'auto', 
    width:'85vw', // Enable vertical scrolling if content exceeds height
    padding: '1rem', // Optional: Add padding for better spacing
    boxSizing: 'border-box', // Ensure padding is included in height calculation
  }}
>
            <Typography className="alig-item text-center"  variant="h6">Voice-Intake Instructions</Typography>
            <Typography variant="body1" paragraph>
              1. Tap the microphone icon to start recording.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Tap again to pause recording.
            </Typography>
            <Typography variant="body1" paragraph>
              3. Speak clearly and at a moderate pace.
            </Typography>
            <Typography variant="body1" paragraph>
              4. State the title before answering any question, such as 'Full name is Peter Anderson' or 'Patient gender is male.'
            </Typography>
            <Typography variant="body1" paragraph>
              5. If at any moment you feel you've made a mistake, tap the microphone icon again to reset and start the recording over.
            </Typography>
            <Typography variant="body1" paragraph>
              6. After recording, upload the audio file and wait for the system to process your input.
            </Typography>
            <Typography variant="body1" paragraph>
              7. After submitting, check the responses for each question in the inbox. If there is any incorrect information, edit it manually.
            </Typography>
            <Typography variant="body1" paragraph>
              8. Review all information to ensure accuracy before final submission.
            </Typography>
            <Typography variant="body1" paragraph>
              9. Make sure to check the terms and conditions before registering the patient to comply with all policies.
            </Typography>
            <Typography variant="body1" paragraph>
              10. Click on the 'Register' button to complete the registration process.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </InstructionBox>
        </InstructionModal>
        <div className='flex flex-col justify-center items-center'> 
        <div ref={agreementScroll}> </div>

        {/* <MicIconStyled
          recording={recording}
          onClick={toggleRecording}
          /> */} 
             <div ref={Scroll} className='flex flex-row dark:bg-slate-800 w-full mt-20 rounded-md gap-2 justify-center items-center'>
            {recording ? null :<h1 className='dark:text-white'>Step 1</h1>}
            {
              !recording && 
              <MicIconStyled
                recording={recording}
                onClick={checkConfirm}
                // onClick={toggleRecording}
                />
            }
            {
              recording && (<div className='my-auto py-3 pl-6 justify-center items-center' onClick={toggleRecording} ><Mic/></div>)
            }
        
        <span className='indigo-blue-500 dark:text-gray-100'>{`Click on Mic for ${recording?'stop recording':'recording'}`}</span>
          </div>
           {/* agreement */}
        <div className='flex flex-col lg:flex-row dark:bg-slate-800 w-full text-nowrap rounded-md mt-2 justify-center items-center'>
        <h1 className=' lg:mr-10 mt-2 dark:text-white font-semibold text-lg  lg:text-2xl'>Step 2</h1>
        <FormControlLabel
    className={` ${agreementError ? 'text-red-500' : 'text-white' } `}
  control={
    <Checkbox
      className="dark:text-white"
      checked={agreementChecked}
      onChange={handleAgreementChange}
    />
  }
  label="Doctor-Patient Agreement and HIPAA Compliance"
  sx={{
    '& .MuiFormControlLabel-label': {
      fontSize: '12px', 
    },
  }}
/>

          <span onClick={readMe} className='text-blue-500 underline cursor-pointer'>ReadMe</span>
          </div>
          <br/>
          </div>
          {questions.map((data, index) => (
  <AccordionStyled
    key={data.id}
    expanded={expanded === `panel${data.id}`}
    onChange={handleChange(`panel${data.id}`)}
    className="dark:bg-slate-900  dark:text-gray-200" // Apply background and text color
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon className="text-gray-200" />} // Set the expand icon color
      aria-controls={`panel${data.id}-content`}
      id={`panel${data.id}-header`}
      className="dark:bg-slate-800 dark:text-gray-200" // Apply background and text color
    >
      <Typography className="text-gray-200">
        {index + 1}. {data.question}
      </Typography>
    </AccordionSummary>
    <AccordionDetails className="bg-slate-800 dark:bg-slate-800 dark:text-gray-200"> {/* Outer container bg */}
  <TextField
    fullWidth
    id={`answer-${data.id}`}
    variant="outlined"
    value={answers[data.id]}
    onChange={handleInputChange(data.id)}
    sx={{
      input: {
        backgroundColor: '#374151', // Same as bg-gray-800
        color: '#f0f0f0', // White text when typing
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // White border
        },
        '&:hover fieldset': {
          borderColor: 'white', // Keep white border on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white', // White border when focused
        },
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        outline: 'none', // Remove blue outline
      },
    }}
    InputLabelProps={{
      style: { color: '#f0f0f0' }, // White label text color
    }}
  />
</AccordionDetails>

  </AccordionStyled>
))}


       
        <InstructionModal open={agreementOpen} onClose={handleAgreementClose}>
          <InstructionBox className='h-auto max-h-[90vh]'>
            <Typography variant="h6">Agreement</Typography>
            <Typography className=' overflow-scroll'  variant="body1">
            By engaging in a medical consultation or using the services of the Advanced Integrated Medical System (AIMS), both the patient and the healthcare provider acknowledge and agree to adhere to the principles of confidentiality and lawful interaction under the Health Insurance Portability and Accountability Act (HIPAA) and relevant state laws. This agreement ensures that all personal health information (PHI) shared during medical consultations, including verbal, written, or digital exchanges, remains strictly confidential and is protected from unauthorized access, disclosure, or misuse. The healthcare provider will only use and disclose PHI for purposes of treatment, payment, or healthcare operations as permitted under HIPAA, unless explicitly authorized by the patient or required by law. Patients are also advised that any recording or sharing of medical consultations, including the use of AI tools like voice-to-text, must comply with these laws, ensuring that both parties respect privacy and uphold the highest standards of trust and professionalism. Any breach of these confidentiality requirements, whether accidental or intentional, must be reported immediately, and appropriate corrective actions will be taken to mitigate any harm and comply with legal obligations.
              {/* This agreement is made between the patient and the doctor. The patient agrees to provide accurate information and follow the doctor's instructions. The doctor agrees to provide the best possible care based on the information provided by the patient. */}
            </Typography>
            <Button onClick={handleAgreementClose}>Close</Button>
          </InstructionBox>
        </InstructionModal>
        {/* agreemnt */}
        <div className='flex flex-col '>
        
        <div className='flex justify-center items-center'>
          <SubmitButton variant="contained"  onClick={()=>window.location.reload()}>
            Reset Form
          </SubmitButton>
          </div>

        {/* {recording && (
          <>
          <br/>
          <div className='flex justify-center items-center'>
          <Button variant="contained" color="secondary" onClick={stopRecording}>
            Stop Audio Recording
          </Button>
          </div>
          </>
        )} */}
        {!recording && source  && (
          <>
          <br/>
          <br/>
          <div className='flex justify-center items-center'>
          <Button variant="contained" color="primary" onClick={handleAudioPlayback}>
            Playback Recorded Audio
          </Button>
          </div>
          </>
        )}
        {!loading && showButton &&
        <>
          <br/>
          <div classname="flex justify-center items-center">
          <h1 className='dark:text-white' >Step 3</h1>
         <Button onClick={sendAudioToFlask} variant="contained" color="primary">
          Upload Voice For Review
        </Button>
          </div>
        </>
        }
        {!loading &&
        <>
        <br/>
        <div className='flex flex-col justify-center items-center'>
        <h1 className='dark:text-white'>{`Step ${showButton>0?'4':'3'}`}</h1>
        <Button onClick={registerPatient}  variant="contained" color="primary">
          Click to Register Patient
        </Button>
        </div>
        </>
        }
        </div>
        {loading  && <br/>}
        {loading  && <CircularProgress  />}

      </Container>
    </Root>}
    <div className='mt-2' ref={scrollRef}></div>
    </>
  );
}

export default UpdatePatient;


