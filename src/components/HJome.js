import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import Loader from '../components/loader/Loader'
import contr from '../contract/artifacts/contracts/Greeter.sol/Greeter.json'
export const HJome = () => {
    const [yescount,setyescount] = useState(0);
    const [nocount,setnocount] = useState(0);
    const [loggedinstatus,setloggedinstatus] = useState(false)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const [yesloading,setyesloading] = useState(false)
    const [noloading,setnoloading] = useState(false)
    const contractAddress = process.env.REACT_APP_CONTRACT;
    const ABI = contr.abi
      const contract = new ethers.Contract(contractAddress, ABI, signer);  
    

      const getyescount = async() =>{
        const countyes =await contract.fetchyesvoters();
        setyescount(countyes); 
        console.log(countyes)
      }
      const handleyesplus = async (e) => {
        e.preventDefault()
        setyesloading(true)
      
        console.log("yes")
        try {
          await contract.voteyes()
        } catch (error) {
          setyesloading(false);
          return ""
        }
        console.log("yes")
        // setyescount(yescount+1);
     
        await getyescount()
        setyesloading(false)
      }
      const getnocount = async() =>{
        const countno =await contract.fetchnovoters();
        setnocount(countno) 
      }
      const handlenoplus = async (e) => {
        e.preventDefault()
        setnoloading(true)
     
        try {
          await contract.voteno()
        } catch (error) {
          setnoloading(false);
          return ""
        }
       
        // setnocount(nocount+1);
  
        await getnocount()
        setnoloading(false)
       
      }

      const handleClear = async(e) =>{
        e.preventDefault();
        await contract.clearall();
      }



useEffect(()=>{
    const requestAccounts = async () => {
        await provider.send("eth_requestAccounts", []);
        setloggedinstatus(true)
      }
      const getyescount = async() =>{
        const countyes =await contract.fetchyesvoters();
        setyescount(countyes); 
        console.log(countyes)
      }
      const getnocount = async() =>{
        const countno =await contract.fetchnovoters();
        setnocount(countno) 
      }
      requestAccounts()
      .catch(console.error)
      getyescount()
      .catch(console.error)
      getnocount()
      .catch(console.error)
    
},[])

const connectwallet = () =>{

  if (!loggedinstatus){
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
      setloggedinstatus(true)
    }
    const getyescount = async() =>{
      const countyes =await contract.fetchyesvoters();
      setyescount(countyes); 
      console.log(countyes)
    }
    const getnocount = async() =>{
      const countno =await contract.fetchnovoters();
      setnocount(countno) 
    }
    requestAccounts()
    .catch(console.error)
    getyescount()
    .catch(console.error)
    getnocount()
    .catch(console.error)
  }
  else{
    return ""
  }
  
}

  return (



      <>

<div className='flex flex-row justify-between bg-orange-300'>
  <div className='flex flex-row justify-start m-5 text-red-900 text-4xl font-bold '>De.VOTE</div>
 {!loggedinstatus && <button className='m-5 bg-black text-white font-bold text-xl  p-1 rounded-full ' onClick={connectwallet} >CONNECT WALLET</button>}
 {loggedinstatus && <div className='m-5 font-mono text-black text-2xl animate-pulse'>Connected</div> }
</div>



    <div className='text-center text-white  font-bold text-4xl'>
Sabari Ganesh is  the most smartest coder in the world !

    </div>

<div className='flex justify-evenly flex-row mt-3'>
{!yesloading&&  <div className='flex flex-col'>
    <button  className='bg-orange-400 p-2 rounded-full text-xl font-semibold rounded-bold  text-red-900' onClick={handleyesplus} >YES  </button>
    <div className='text-red-800 text-3xl bg-black mt-3 animate-pulse text-center'>{yescount.length}</div>
    </div>}
    {yesloading && <Loader/> }
    
   {!noloading&& <div className='flex flex-col'>
    <button  className='bg-orange-400 p-2 rounded-full text-xl font-semibold rounded-bold  text-red-900' onClick={handlenoplus} >NO </button>
    <div className='text-red-800  text-3xl bg-black mt-3 animate-pulse text-center'>{nocount.length}</div>
</div>}

{noloading && <Loader/> }

</div>

<div className='text-center '>Transaction for contract interaction may take some time to complete. Hence wait patiently !</div>


{yescount &&  
 (
  <>
<div className='text-3xl text-black font-semibold'> Addresses voting YES </div>
  <div className='flex flex-row mt-3  flex-wrap'>
    {console.log()}
    { yescount&& yescount.map((item,i)=>(
      <div key = {i} className = 'ml-5 mt-1' >
      <div className='text-black font-semibold bg-white p-1 rounded-full'>{item.toString().slice(0,6)}...{item.toString().slice(39)}</div>
      </div>
    ))}
  </div>
  </>
 )}

 
{yescount &&  
 (
  <>
<div className='text-3xl text-black font-semibold'> Addresses voting NO </div>
  <div className='flex flex-row flex-wrap mt-3'>
    {console.log()}
    {!nocount.length &&  
      (<div >No votes</div>)
    }
    { nocount && nocount.map((item,i)=>(
      <div key = {i} className = 'ml-5 mt-1' >
      <div className='text-black font-semibold bg-white p-1 rounded-full'>{item.toString().slice(0,6)}...{item.toString().slice(39)}</div>
      </div>
    ))}
  </div>
  </>
 )}


{/* <div><button onClick={handleClear}>NUKEEEE EM</button></div> */}
    </>
  )
}
