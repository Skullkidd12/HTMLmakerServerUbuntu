import { useState, } from 'react';


const FormCliente = ({ onClienteChange }) => {
  const [cliente, setCliente] = useState('cliente1');

  const handleChange = (e) => {
    const selected = e.target.value;
    setCliente(selected);
    if (onClienteChange) {
      onClienteChange(selected);
    }
  };
 


  return (
    <>
      <select
        value={cliente}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="cliente1">cliente1</option>
        <option value="cliente2">cliente2</option>
      </select>
    
    </>
  );
};

export default FormCliente;
