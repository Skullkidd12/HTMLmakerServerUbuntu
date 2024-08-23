import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { componentesNames } from '../Static/componentsNames';

const darkTheme = createTheme({
   palette: {
     mode: 'dark',
   },
 });

function DynaForm() {
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

    return (
        <>
            {inputFields.map((input, index) => {
                return (
                  
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
                           options={componentesNames.map((option) => option.component)}
                           renderInput={(params) => <TextField {...params} size="small" label="Componente" variant="filled" name="componente"/>  }
                        />
                        </Stack>
                        </ThemeProvider>
                     </div>
                     <div>
                        <button onClick={() => removeFields(index)} type="button" className=" px-6 py-2 mx-1 my-2 bg-red-500">
                            <img alt="svgImg" src="../../public/images/icons8-trash-30.png" width={18} height={18}/>
                        </button>
                        <button onClick={addFields} type="button" className="bg-sky-600 px-7 py-2 mx-1 my-2">
                           <img alt="svgImg" src="../../public/images/icons8-add-30.png" width={18} height={18}/>
                        </button>
                     </div>   
                    </div>
                    
                )
            })}
            
        </>
    );
}



export default DynaForm;
