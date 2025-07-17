import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { loadProvider,loadNetwork, loadMedical, subscribeToEvent, loadAllData, loadAccount } from './store/interactions';
import { Form, Navbar, Option ,Data, Alert } from './components';
import config  from './config.json';
import { Route,Routes } from 'react-router-dom';


function App() {
  const dispatch = useDispatch();
 
  const loadBlockchainData=async()=> {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider,dispatch);
    window.ethereum.on("accountsChanged",()=>{
      loadAccount(provider,dispatch);
    });
    window.ethereum.on("chainChanged",()=>{
      window.location.reload();
    });
    const medical_config = config[chainId].MedicalRecord;
    const medical=loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider,medical,dispatch);
    subscribeToEvent(medical,dispatch);
  };
  useEffect(()=>{
    loadBlockchainData();
  });
  return (
    <div className="App">
    <Navbar />
    <Option />
    <Routes>
      <Route path="/" exact element = {<Form />}/>
      <Route path="/Data" exact element = {<Data />}/>
    </Routes>
    <Alert/>
    </div>
  );
};

export default App;
