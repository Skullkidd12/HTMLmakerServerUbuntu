
import './App.css';
import Button from './components/Button';
import DynaForm from './components/DynaForm';
import Button2 from './components/Button2';
function App() {
   
    return (
      <div className='pageWRAP'>  
         <div className='formsWRAP'>
            <form action="http://localhost:3000/MakeHTML" id="form" method="POST" autoComplete='off' target='frame'>
                  <div>
                     <input name="UTM" type="text" placeholder="?utm" className="focus:border-blue-100 px-4 py-1 bg-slate-700 rounded-md w-full my-1 text-center" />
                  </div>
                  <div>
                     <input name="MMKT" type="text" placeholder="https://imgs.effectivecampaign.com.br/xxxx/xxxx/" className="focus:border-blue-100 px-4 py-1 bg-slate-700 rounded-md w-full  my-1 text-center" />
                  </div>
                  <div>
                     <input name="background" type="text" maxLength="7" placeholder="Cor do Background" className="focus:border-blue-100 px-4 py-1 bg-slate-700 rounded-md w-full  my-1 text-center" />
                  </div>
                  <div className='bg-gray-300 my-1 w-full h-[1px]'>
                  </div>
                  <DynaForm/>
                  <Button2/>
                  <Button />
            </form>
         </div>
      <div className='mx-4 flex my-3'>
         <iframe name='frame' className="iframe">
         </iframe>
      </div> 
      </div>
    );
}

export default App;
