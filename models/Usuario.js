import mongoose from "mongoose";
import bcrypt from "bcrypt";

//creando el modelo de nuestra Base de datos
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },

},
    {
        timestamps: true,//crea dos columnas mas, una de creado y otra de actualizado
    }
);

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function 
(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};

//definiendo el modelo

                                //le damos el mismo nombre de usuario
const Usuario = mongoose.model("Usuario", usuarioSchema);
                                            //le dices cual va a ser su schema

export default Usuario;