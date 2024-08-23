
import './App.css';
import Button from './components/Button';
import DynaForm from './components/DynaForm';
import Button2 from './components/Button2';
function App() {
   
    return (
        <div className='pageWRAP'>  
         <div className='formsWRAP'>
            <form action="https://emailmaker-server-ohio.onrender.com/MakeHTML" id="form" method="POST" autoComplete='off' target='frame'>
                <div>
                    <input name="background" type="text" maxLength="7" placeholder="Cor do Background" className="focus:border-blue-100 px-4 py-2 bg-slate-700 rounded-md w-full  my-2 text-center" />
                </div>
                <DynaForm/>
                <Button2/>
                <Button />
            </form>
         </div>
         <div className='mx-4 flex'>
            <iframe name='frame' className="iframe">
            </iframe>
         </div> 
        </div>
    );
}

export default App;
