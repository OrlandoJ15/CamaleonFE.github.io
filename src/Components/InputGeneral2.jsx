import React, { useState, useEffect } from "react";
import { Input, Label, GrupoInput, LeyendaError, IconoValidacion } from './Formularios';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const InputGeneral2 = ({ xestado, xcambiarEstado, tipo, label, placeholder, name, leyendaError, expresionRegular, funcion, onBlur }) => {
	console.log("CONST  ");
	const [estado, cambiarEstado] = useState({ campo: xestado , valido: null });
	

	const regex = new RegExp(expresionRegular);
    
	const onChange = (e) => {
		console.log("OnChange  ");
		cambiarEstado({ ...estado, campo: e.target.value });
	};

	const validacion = () => {
		console.log("Validacion  ");
		if (expresionRegular) {
			if (regex.test(estado.campo)) {
				cambiarEstado({ ...estado, valido: 'true' });
			} else {
				cambiarEstado({ ...estado, valido: 'false' });
			}
		}

		if (funcion) {
			funcion();
		}
	};
	
	const validacionOnBlur = () => {
		if (onBlur) {
			onBlur();
		}
	};

	const EstiloLabell = {
		fontSize: '80%'
	};

	const EstiloInput = {
		height: '25px'
	};

	useEffect(() => {
		validacion();
	  }, [!xestado]);

	return (
		<div>
			<Label htmlFor={name} $valido={estado.valido} style={EstiloLabell}>{label}</Label>
			<GrupoInput>
				<Input
					type={tipo}
					placeholder={placeholder}
					id={name}
					value={estado.campo}
					onChange={onChange}
					onKeyUp={validacion}
					onBlur={validacionOnBlur}
					$valido={estado.valido}
					style={EstiloInput}
				/>
				<IconoValidacion
					icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle}
					$valido={estado.valido}
				/>
			</GrupoInput>
			<LeyendaError $valido={estado.valido}>{leyendaError}</LeyendaError>
		</div>
	);
};

export default InputGeneral2;