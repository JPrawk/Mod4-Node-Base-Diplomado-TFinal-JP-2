function validate(schema, target = "body") {
    return (req, res, next) => {
        const data = req[target]; // body, query, params,etc.

        // paso 1: verificar que existan datos
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ 
                msg: `El ${target} no puede estar vacio` 
            });        
        }
        // paso 2: validar contra el schema con opciones
        const { error, value } = schema.validate(data, { 
            abortEarly: false, // no detenerse en el primer error mostrar todos
            stripUnknown: true, // eliminar campos no definidos en el schema
         });

       // paso 3: si hay errores de validacion, devolver 400 con mensaje claros
       if (error) {
        return res.status(400).json({
            message: `Error de validacion en ${target}`,
            errors: error.details.map((err) => err.message),
        });
       }
     
       //Paso 4:  Reemplazar el objeto tribial con los datos validos y limpios
       req[target] = value;

       next();
    }
}

export default validate;