import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { componentesCOOP } from '../Static/componentesCOOP';
import { componentesZS } from '../Static/componentesZS';
import { useEffect } from 'react';
const darkTheme = createTheme({
   palette: {
     mode: 'dark',
   },
 });

function DynaForm() {

   //Seletor cliente
   const [cliente, setCliente] = useState('COOP');
   const [componentsNames, setComponentsNames] = useState([]);
   useEffect(() => {
      if (cliente === 'COOP') {
      setComponentsNames(componentesCOOP);
      } else if (cliente === 'ZonaSul') {
      setComponentsNames(componentesZS);
      }
   }, [cliente]);
  
   //botao tab
   useEffect(() =>{
      document.addEventListener('keydown',detectKeyDown,true)
   })
   const detectKeyDown = (e) => {
   console.log(e.key)
   if(e.key ==='1'){
      
      addFields()
   }
   }

   //botao adiciona campo remove campo
   const [inputFields, setInputFields] = useState([{ component: '' }]);
   const addFields = () => {
      let newfield = { component: '' };
      setInputFields([...inputFields, newfield]);

   };
   const removeFields = (index) => {
      if (inputFields.length <= 1) {
         return;
      } else {
         let data = [...inputFields];
         data.splice(index, 1);
         setInputFields(data);
      }
   };



   //HTML
   return (
      <>
      <select
      value={cliente}
      onChange={(e) => setCliente(e.target.value)}
      className="h-10 w-full rounded-md border-r-8 border-transparent px-4 text-lg outline text-center font-bold focus:border-blue-100 my-1"
      >
      <option value="COOP">COOP</option>
      <option value="ZonaSul">ZonaSul</option>
      </select>

      {inputFields.map((input, index) => {
            return (
               <>
               <div key={index} className='flex my-2'>
                  <div>
                     <ThemeProvider theme={darkTheme}>
                        <Stack
                           spacing={2} className="teste" sx={{width:350, borderRadius:"6px"}}>
                        <Autocomplete
                           className="teste"
                           sx={{".css-14t01uy-MuiInputBase-root-MuiOutlinedInput-root":{color:"#becbce"},
                           ".MuiOutlinedInput-root":{p:"4px"},bgcolor:"#515e70", borderRadius:"6px",}}
                           id="free-solo-demo"
                           disablePortal
                           options={componentsNames.map((option) => option.component)}
                           renderInput={(params) => <TextField {...params} autoFocus size="small" label="Componente" variant="filled" name="componente"/>  }
                        />
                        </Stack>
                     </ThemeProvider>
                  </div>
               <div>
                  <button onClick={() => removeFields(index)} type="button" tabIndex="-1" className=" px-6 py-2 mx-1 my-2 bg-red-500">
                     <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoOC41MzMzMyw4LjUzMzMzKSI+PHBhdGggZD0iTTEzLDNjLTAuMjY3NTcsLTAuMDAzNjMgLTAuNTI1NDMsMC4xMDAxMiAtMC43MTU5MywwLjI4ODA1Yy0wLjE5MDUsMC4xODc5MyAtMC4yOTc3NCwwLjQ0NDM2IC0wLjI5Nzc0LDAuNzExOTVoLTUuOTg2MzNjLTAuMzYwNjQsLTAuMDA1MSAtMC42OTYwOCwwLjE4NDM4IC0wLjg3Nzg5LDAuNDk1ODdjLTAuMTgxODEsMC4zMTE1IC0wLjE4MTgxLDAuNjk2NzYgMCwxLjAwODI1YzAuMTgxODEsMC4zMTE1IDAuNTE3MjUsMC41MDA5NyAwLjg3Nzg5LDAuNDk1ODdoMThjMC4zNjA2NCwwLjAwNTEgMC42OTYwOCwtMC4xODQzOCAwLjg3Nzg5LC0wLjQ5NTg3YzAuMTgxODEsLTAuMzExNSAwLjE4MTgxLC0wLjY5Njc2IDAsLTEuMDA4MjVjLTAuMTgxODEsLTAuMzExNSAtMC41MTcyNSwtMC41MDA5NyAtMC44Nzc4OSwtMC40OTU4N2gtNS45ODYzM2MwLC0wLjI2NzU5IC0wLjEwNzI0LC0wLjUyNDAzIC0wLjI5Nzc0LC0wLjcxMTk1Yy0wLjE5MDUsLTAuMTg3OTMgLTAuNDQ4MzYsLTAuMjkxNjggLTAuNzE1OTMsLTAuMjg4MDV6TTYsOHYxNmMwLDEuMTA1IDAuODk1LDIgMiwyaDE0YzEuMTA1LDAgMiwtMC44OTUgMiwtMnYtMTZ6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+" width={18} height={18}/>
                  </button>
                  <button onClick={addFields} type="button" className="bg-sky-600 px-7 py-2 mx-1 my-2">
                     <img alt="svgImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtElEQVR4nL2UWwrCMBBFC/qTug8fq7DUvbge8bWVWqHuS3+ODEywhEkaI3hgIIFw4E4mqap/ANTAWsuVCHbAHXjxQdY90OYI5sCVac5yNiW6kM8xFcdi0LJoLJH0xGKvZXELJYugsbmip9zsWLQy4njBRsvvw5jLUtEjJap/iObCPvUFos66tTZyeDDieLaxWZKJzeUw9UROORJgFhWNhI0MmzbTI+suGmdC6HQ0pL7/Rkp4A70a0CFAeE+tAAAAAElFTkSuQmCC" width={18} height={18}/>
                  </button>
               </div>   
               </div>
               </>
            )
      })}     
      </>
   );
}



export default DynaForm;
